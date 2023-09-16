const fs = require('fs');
const path = require('path');
let tareasData = require('../models/baseDatos.json'); // Cambiado el nombre del archivo

exports.obtenerTodasLasTareas = (req, res) => {
    console.log("paso 2");
    fs.readFile(path.join(__dirname, '../models/baseDatos.json'), 'utf8', (err, data) => {
        if (!err) {
            try {
                tareasData = JSON.parse(data);
                // Enviar la respuesta aquí, después de cargar los datos
                res.json(tareasData);
            } catch (error) {
                console.error('Error al parsear los datos desde el archivo JSON:', error);
                res.status(500).send('Error al procesar los datos.');
            }
        } else {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).send('Error al procesar los datos.');
        }
    });
};

exports.crearTarea = (req, res) => {
    console.log("paso 1");
    let formComplet = req.body;

    tareasData.push(formComplet);

    tareasData.sort((a, b) => {
        if (a.puntaje !== b.puntaje) {
            return b.puntaje - a.puntaje; 
        } else {
            return a.tiempo - b.tiempo; 
        }
    });

    if (tareasData.length > 20) {
        tareasData = tareasData.slice(0, 20);
    }

    fs.writeFile(path.join(__dirname, '../models/baseDatos.json'), JSON.stringify(tareasData, null, 2), (error) => {
        if (error) {
            res.status(500).send('Error al guardar los datos como archivo JSON.');
            return;
        }

        // Cargar datos desde el archivo JSON al iniciar el servidor
        fs.readFile(path.join(__dirname, '../models/baseDatos.json'), 'utf8', (err, data) => {
            if (!err) {
                try {
                    tareasData = JSON.parse(data);
                } catch (error) {
                    console.error('Error al parsear los datos desde el archivo JSON:', error);
                }
            }
            // Enviar respuesta después de cargar y guardar los datos
            res.send('Datos guardados correctamente.');
        });
    });
};

exports.controlarUsu = (req, res) => {
    console.log("paso 3");
    const usuario = req.params.usuario;

    if (!usuario || usuario.trim() === '') {
        return res.json({ usuarioExistente: false, mensaje: 'El usuario no es válido.' });
    }

    // Asumiendo que guardar es la misma variable que tareasData
    const usuarioExistente = tareasData.some(item => item.usuario === usuario);

    res.json({ usuarioExistente });
};

exports.posicionEnTiempoReal = (req, res) => {
    console.log("paso 4");
    fs.readFile(path.join(__dirname, '../models/baseDatos.json'), 'utf8', (err, data) => {
        if (!err) {
            try {
                tareasData = JSON.parse(data);
                res.json(tareasData);
            } catch (error) {
                console.error('Error al parsear los datos desde el archivo JSON:', error);
                res.status(500).send('Error al procesar los datos.');
            }
        } else {
            console.error('Error al leer el archivo JSON:', err);
            res.status(500).send('Error al procesar los datos.');
        }
    });
};

exports.cargarDatosAlEmpezar = (req, res) => {
    // Cargar datos desde el archivo JSON al iniciar el servidor
    fs.readFile(path.join(__dirname, '../models/baseDatos.json'), 'utf8', (err, data) => {
        if (!err) {
            try {
                tareasData = JSON.parse(data);
            } catch (error) {
                console.error('Error al parsear los datos desde el archivo JSON:', error);
            }
        }
        // Enviar respuesta después de cargar los datos
        res.send('Datos cargados al iniciar el servidor.');
    });
};
