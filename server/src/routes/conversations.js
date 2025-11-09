const express = require('express');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get messages for a conversation
router.get('/:userId/messages', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const conversationId = [req.userId.toString(), userId].sort().join('_');

    const messages = await Message.find({ conversationId })
      .populate('sender', 'username')
      .populate('recipient', 'username')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
