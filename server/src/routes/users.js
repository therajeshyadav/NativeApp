const express = require('express');
const User = require('../models/User');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get all users except current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } })
      .select('-password')
      .sort({ isOnline: -1, lastSeen: -1 });

    // Get last message for each user
    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const conversationId = [req.userId, user._id].sort().join('_');
        const lastMessage = await Message.findOne({ conversationId })
          .sort({ createdAt: -1 })
          .limit(1);

        return {
          ...user.toJSON(),
          lastMessage: lastMessage || null
        };
      })
    );

    res.json(usersWithLastMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
