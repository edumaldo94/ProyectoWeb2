const fs = require('fs');
const path = require('path');
let tareasData =  require('../models/baseDatos.json');


exports.controlarUsu = (req, res) => {
    //"registrar 3"
    const usuario = req.params.usuario;

    if (!usuario || usuario.trim() === '') {
      
        return res.json({ usuarioExistente: false, mensaje: 'El usuario no es válido.' });

    }
    const usuarioExistente = tareasData.some(item => item.usuario === usuario);
   
    res.json({ usuarioExistente });

};

exports.obtenerTodasLasTareas = (req, res) => {
    
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
    let formComplet = req.body;
   
    tareasData.push(formComplet);

    tareasData.sort((a, b) => {
        if (a.puntaje !== b.puntaje) {
            return b.puntaje - a.puntaje; 
        } else {
            return a.Tiempo.localeCompare(b.Tiempo); // Ordenar por tiempo ascendente
        }
    });

    if (tareasData.length > 20) {
        tareasData = tareasData.slice(0, 20);
    }

    // Encuentra el mejor puntaje y tiempo
    const mejorPuntaje = tareasData[0].puntaje;
    const mejorTiempo = tareasData[0].Tiempo;

    // Actualizar el archivo JSON
    fs.writeFile(path.join(__dirname, '../models/baseDatos.json'), JSON.stringify(tareasData, null, 2), (error) => {
        if (error) {
            res.status(500).send('Error al guardar los datos como archivo JSON.');
            return;
        }

        // Enviar respuesta después de cargar y guardar los datos
        res.send(`Datos guardados correctamente. Mejor puntaje: ${mejorPuntaje}, Mejor tiempo: ${mejorTiempo}`);
    });
};


exports.posicionEnTiempoReal = (req, res) => {
   // console.log("boton posicion 4");
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

