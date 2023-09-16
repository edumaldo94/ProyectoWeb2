const express = require('express');
const cors = require('cors');
const app=express()
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(cors())
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'));


app.use(bodyParser.json());
let tareasRoutes = require('./routes/index');
app.use('/api/index', tareasRoutes);


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
  });

