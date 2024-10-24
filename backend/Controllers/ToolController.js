const { Tools } = require('../Models/model')

async function getTools(req, res) {
    try {
      const ferramentas = await Tools.findAll();
      res.json(ferramentas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao obter ferramentas' });
    }
  }

module.exports = { getTools };