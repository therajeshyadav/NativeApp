const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');

const userSockets = new Map(); // userId -> socketId mapping

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return next(new Error('User not found'));
      }

      socket.userId = user._id.toString();
      socket.username = user.username;
      next();
    } catch (error) {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {
    console.log(`User connected: ${socket.username} (${socket.userId})`);

    // Store socket mapping
    userSockets.set(socket.userId, socket.id);

    // Update user online status
    await User.findByIdAndUpdate(socket.userId, { isOnline: true });
    
    // Broadcast online status to all clients
    io.emit('user:status', { userId: socket.userId, isOnline: true });

    // Handle sending messages
    socket.on('message:send', async (data) => {
      try {
        const { recipientId, content } = data;
        const conversationId = [socket.userId, recipientId].sort().join('_');

        // Save message to database
        const message = new Message({
          sender: socket.userId,
          recipient: recipientId,
          content,
          conversationId,
          status: 'sent'
        });
        await message.save();
        await message.populate('sender', 'username');
        await message.populate('recipient', 'username');

        // Send to recipient if online
        const recipientSocketId = userSockets.get(recipientId);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('message:new', message);
        }

        // Confirm to sender
        socket.emit('message:sent', message);
      } catch (error) {
        socket.emit('message:error', { error: error.message });
      }
    });

    // Handle message delivered
    socket.on('message:delivered', async (data) => {
      try {
        const { messageId } = data;
        await Message.findByIdAndUpdate(messageId, { status: 'delivered' });

        const message = await Message.findById(messageId);
        const senderSocketId = userSockets.get(message.sender.toString());
        if (senderSocketId) {
          io.to(senderSocketId).emit('message:status', {
            messageId,
            status: 'delivered'
          });
        }
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    });

    // Handle message read
    socket.on('message:read', async (data) => {
      try {
        const { messageId } = data;
        await Message.findByIdAndUpdate(messageId, { status: 'read' });

        const message = await Message.findById(messageId);
        const senderSocketId = userSockets.get(message.sender.toString());
        if (senderSocketId) {
          io.to(senderSocketId).emit('message:status', {
            messageId,
            status: 'read'
          });
        }
      } catch (error) {
        console.error('Error updating message status:', error);
      }
    });

    // Handle typing indicators
    socket.on('typing:start', (data) => {
      const { recipientId } = data;
      const recipientSocketId = userSockets.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('typing:start', {
          userId: socket.userId,
          username: socket.username
        });
      }
    });

    socket.on('typing:stop', (data) => {
      const { recipientId } = data;
      const recipientSocketId = userSockets.get(recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('typing:stop', {
          userId: socket.userId
        });
      }
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${socket.username}`);
      userSockets.delete(socket.userId);
      
      await User.findByIdAndUpdate(socket.userId, {
        isOnline: false,
        lastSeen: new Date()
      });

      io.emit('user:status', { userId: socket.userId, isOnline: false });
    });
  });

  return io;
};

module.exports = initializeSocket;
