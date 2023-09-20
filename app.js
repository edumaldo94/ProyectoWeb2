const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app=express()
const fs = require('fs');
const port=3001

const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}
app.use(bodyParser.json());
app.use(cors(corsOptions))
app.use(express.static('public'));
const tareasRoutes = require('./routes/index');
app.use('/api/index', tareasRoutes);
app.use(express.urlencoded({extended: true}))
app.use(express.json({type: "*/*"}))

app.listen(port, () => {
    console.log(`Servidor escuchando en la dirección http://localhost:${port}`);
});

