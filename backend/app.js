const express = require('express');
const cors = require('cors');
const app=express()
const port=3001
let guardar=[]
const fs=require('fs')

app.use(cors())
app.use(express.static('../public'));
app.use(express.urlencoded({extended: true}))
app.use(express.json({type: "*/*"}))

// Cargar datos desde el archivo JSON al iniciar el servidor
fs.readFile('baseDatos.json', 'utf8', (err, data) => {
  if (!err) {
      try {
          guardar = JSON.parse(data);
      } catch (error) {
          console.error('Error al parsear los datos desde el archivo JSON:', error);
      }
  }
});
app.get('/baseDatos', (req,res)=> {
    fs.readFile('baseDatos.json', 'utf8', (err, data) => {
        if (!err) {
            try {
                guardar = JSON.parse(data);
            } catch (error) {
                console.error('Error al parsear los datos desde el archivo JSON:', error);
            }
        }
      });
     // const jsonData = JSON.parse(data);
      res.json(guardar); 

})

app.get('/baseDatos/:usuario', (req, res) => {
    console.log("paso 3")
    const usuario = req.params.usuario;

    // Verificar si el parámetro usuario está presente y no es una cadena vacía
    
    if (!usuario || usuario.trim() === '') {
        return res.json({ usuarioExistente: false, mensaje: 'El usuario no es válido.' });
    }

    //const baseDeDatos = require('./baseDatos.json');
    const usuarioExistente = guardar.some(item => item.usuario === usuario);

    res.json({ usuarioExistente });
});

  //http://localhost:3001/formComplet
app.get('/formComplet', (req, res)=>{
    console.log("paso 2")
 fs.readFile('baseDatos.json', 'utf8', (err, data) => {
        if (err) {
    
            res.status(500).send('Error al leer el archivo JSON.');
            return;
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData); 
        

});
})

app.post('/formComplet', (req, res)=>{
    console.log("paso 1")
    let formComplet=req.body;
 /* const usuarioExistente = guardar.find(item => item.usuario === formComplet.usuario);
    if (usuarioExistente) {
        res.status(400).send('El usuario ya existe.');
        return;
    }*/
    guardar.push(formComplet)
  
    guardar.sort((a, b) => {
      if (a.puntaje !== b.puntaje) {
          return b.puntaje - a.puntaje; // Ordenar por puntaje de mayor a menor
      } else {
          return a.tiempo - b.tiempo; // Si los puntajes son iguales, ordenar por tiempo de menor a mayor
      }
  });

  // Limitar la longitud del arreglo a 20 elementos
  if (guardar.length > 20) {
      guardar = guardar.slice(0, 20);
  }

     fs.writeFile('baseDatos.json', JSON.stringify(guardar, null, 2), (error) => {
      if (error) {
          res.status(500).send('Error al guardar los datos como archivo JSON.');

          return;
      }
      // Cargar datos desde el archivo JSON al iniciar el servidor
fs.readFile('baseDatos.json', 'utf8', (err, data) => {
    if (!err) {
        try {
            guardar = JSON.parse(data);
        } catch (error) {
            console.error('Error al parsear los datos desde el archivo JSON:', error);
        }
    }
  });
      res.send('Datos guardados correctamente.');
  });
    //res.send('hicieron un post')
})


app.listen(port, ()=>{
console.log(`estoy ejecutando http://localhost:${port}`)

})
