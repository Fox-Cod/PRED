const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./Routes/router');
const sequelize = require('./bd');
const path = require('path');

const app = express();
const PORT = 8081;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
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

app.use('/Uploads', express.static(path.join(__dirname, 'Uploads')));

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ success: true });
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com a base de dados foi bem-sucedida.');
  } catch (error) {
    console.error('Ocorreu um erro ao conectar com a base de dados:', error);
  }
})();

app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
