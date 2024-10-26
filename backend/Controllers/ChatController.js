const { Messages, Friends, Chat } = require('../Models/model');
const { Op } = require('sequelize');

async function createChat(req, res) {
  const { participantOneId, participantTwoId } = req.body;

  try {
      const existingChat = await Chat.findOne({
          where: {
              [Op.or]: [
                  { participantOneId, participantTwoId },
                  { participantOneId: participantTwoId, participantTwoId: participantOneId }
              ]
          }
      });

      if (existingChat) {
          return res.json({ success: true, chat: existingChat });
      }

      const newChat = await Chat.create({ participantOneId, participantTwoId });
      res.json({ success: true, chat: newChat });
  } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Erro ao criar uma sala de conversação." });
  }
};



async function sendMessage(req, res) {
  try {
    const { senderId, receiverId, content, chatId } = req.body;

    if (!senderId || !receiverId || !content || !chatId) {
      return res.status(400).json({ success: false, message: "Dados insuficientes para enviar uma mensagem." });
    }

    const message = await Messages.create({ senderId, receiverId, content, chatId });
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}


async function getMessages(req, res) {
  const { idTeacher } = req.userToken;
  const { friendId } = req.params;

  try {
    const isFriend = await Friends.findOne({ where: { idTeacher, friendId } });
    if (!isFriend) return res.status(403).json({ error: 'Access denied: not a friend.' });

    const messages = await Messages.findAll({
      where: {
        [Op.or]: [
          { senderId: idTeacher, receiverId: friendId },
          { senderId: friendId, receiverId: idTeacher }
        ]
      },
      order: [['timestamp', 'ASC']]
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { createChat, sendMessage, getMessages };
