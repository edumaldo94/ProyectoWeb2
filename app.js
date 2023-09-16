const express = require('express');
const cors = require('cors');
const app=express()
const port=3001
const bodyParser = require('body-parser');
app.use(express.static('public'));



const tareasRoutes = require('./routes/index');
app.use('/api/index', tareasRoutes);
app.use(cors())



app.use(express.urlencoded({extended: true}))
app.use(express.json({type: "*/*"}))
app.listen(port, ()=>{console.log(`Servidor escuchando en el puerto http://localhost:${port}`)})
    



