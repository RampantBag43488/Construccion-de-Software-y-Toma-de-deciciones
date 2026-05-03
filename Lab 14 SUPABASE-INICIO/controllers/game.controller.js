const model = require('../models/game.model');

module.exports.count = async (req, res) => {
    const resultados = await model.count();
    res.status(200).json({ total: resultados });
}