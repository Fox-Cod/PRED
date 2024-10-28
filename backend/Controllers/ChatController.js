const { Messages, Friends, Chats, Users } = require('../Models/model');
const { Op } = require('sequelize');
const crypto = require('crypto');

const encryptionKey = 'my-secret-key-12345';
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(encryptionKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(encryptionKey), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

async function getUserChats(req, res) {
  const { idTeacher } = req.userToken;

  try {
    const chats = await Chats.findAll({
      where: {
        [Op.or]: [
          { idParticipantOne: idTeacher },
          { idParticipantTwo: idTeacher }
        ]
      },
      include: [
        {
          model: Users,
          as: 'participantOne',
          attributes: ['idTeacher', 'name', 'photo'] 
        },
        {
          model: Users,
          as: 'participantTwo',
          attributes: ['idTeacher', 'name', 'photo']
        }
      ],
      order: [['lastMessageTime', 'DESC']]
    });

    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Erro ao recuperar a lista de conversações." });
  }
}



async function createChat(req, res) {
  const { idParticipantOne, idParticipantTwo } = req.body;

  if (!idParticipantOne || !idParticipantTwo) {
    return res.status(400).json({ success: false, message: "idParticipantOne и idParticipantTwo обязательны." });
  }

  console.log(idParticipantOne, idParticipantTwo)
  try {
    const participants = [idParticipantOne, idParticipantTwo].sort();
    const chatToken = crypto.createHash('sha256').update(participants.join('-')).digest('hex');

    console.log(participants, "token:", chatToken)
    const existingChat = await Chats.findOne({ where: { chatToken } });

    if (existingChat) {
      return res.json({ success: true, chat: existingChat });
    }

    const newChat = await Chats.create({
      idParticipantOne,
      idParticipantTwo,
      chatToken
    });

    res.json({ success: true, chat: newChat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Erro ao criar uma sala de conversação." });
  }
}



async function sendMessage(req, res) {
  try {
    const { idSender, idReceiver, message, idChat } = req.body;

    if (!idSender || !idReceiver || !message || !idChat) {
      return res.status(400).json({ success: false, message: "Dados insuficientes para enviar uma mensagem." });
    }

    const encryptedMessage = encrypt(message);

    const newMessage = await Messages.create({ idSender, idReceiver, message: encryptedMessage, idChat });
    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function getMessages(req, res) {
  const { chatToken } = req.params;
  try {
      const chat = await Chats.findOne({ where: { chatToken } });
      if (!chat) {
          return res.status(404).json({ success: false, message: "Чат не найден." });
      }

      const messages = await Messages.findAll({
          where: { idChat: chat.id },
          order: [['timeStamp', 'ASC']]
      });

      // const decryptedMessages = messages.map((msg) => ({
      //     ...msg.toJSON(),
      //     message: decrypt(msg.message)
      // }));

      res.json(messages);
  } catch (error) {
      console.error("Error retrieving messages:", error);
      res.status(500).json({ success: false, error: error.message });
  }
}




module.exports = { getUserChats, createChat, sendMessage, getMessages };
