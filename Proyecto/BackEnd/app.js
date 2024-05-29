const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  console.log('Conectado');
}

main().catch(console.error);

app.use('/api/', require('./Routers/Home.js'));
app.use('/api/inversiones', require('./Routers/Inversiones.js'));
app.use('/api/login', require('./Routers/Login.js'));
app.use('/api/perfil', require('./Routers/Perfil.js'));
app.use('/api/register', require('./Routers/Registro.js'));

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
