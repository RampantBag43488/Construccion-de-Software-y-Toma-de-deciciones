const express = require('express');
const router = express.Router();

const preguntasController = require('../controllers/preguntas.controller');

router.get('/preguntas', preguntasController.getPreguntas);

module.exports = router;