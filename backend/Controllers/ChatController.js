const Messages = require('../Models/model');

async function sendMessage(req, res) {
  try {
    const { senderId, receiverId, content } = req.body;
    const message = await Messages.create({ senderId, receiverId, content });
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function getMessages(req, res) {
  try {
    const { userId, friendId } = req.params;
    const messages = await Messages.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, receiverId: friendId },
          { senderId: friendId, receiverId: userId }
        ]
      },
      order: [['timestamp', 'ASC']]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { sendMessage, getMessages };
