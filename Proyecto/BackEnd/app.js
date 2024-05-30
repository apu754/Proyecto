const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

main().catch(console.error);

app.use('/api/', require('./Routers/Home.js'));
app.use('/api/action', require('./Routers/Action.js'));
app.use('/api/login', require('./Routers/Login.js'));
app.use('/api/perfil', require('./Routers/Perfil.js'));
app.use('/api/register', require('./Routers/Registro.js'));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
