const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/obtenerDatos');


router.get('/formComplet', tareasController.obtenerTodasLasTareas);
router.get('/baseDatos/:usuario', tareasController.controlarUsu);
router.get('/baseDatos', tareasController.posicionEnTiempoReal);
router.post('/formComplet', tareasController.crearTarea);

module.exports = router;
