const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';

function authenticateToken(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Não autorizado: Token de autorização necessário' });
    }

    jwt.verify(token, jwtSecretKey, (err, userToken) => {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          return res.status(402).json({ message: 'Erro: Formato de token inválido' });
        } else if (err.name === 'TokenExpiredError') {
          return res.status(403).json({ message: 'Erro: Tempo de validade do token expirou' });
        } else {
          return res.status(404).json({ message: 'Erro: Token inválido' });
        }
      }

      req.userToken = userToken;
      next();
    });
  } catch (error) {
    console.error('Erro de autenticação:', error);
    return res.status(500).json({ message: 'Erro do servidor na autenticação' });
  }
}

module.exports = { authenticateToken };
