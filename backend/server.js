const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./Routes/router');
const sequelize = require('./bd');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = process.env.PORT;

require('dotenv').config();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: [process.env.SERVER_API],
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/api', routes);

app.get('/api/health-check', async (req, res, next) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ status: 'Server is up and running', dbStatus: 'Database connection is successful' });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({
      status: 'Server is down',
      error: 'Database connection failed',
      details: error.message
    });
  }
});
app.use('/Files', express.static('Files'));

app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true });
});

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: process.env.SERVER_API } });

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com a base de dados foi bem-sucedida.');
  } catch (error) {
    console.error('Ocorreu um erro ao conectar com a base de dados:', error);
  }
})();

server.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
