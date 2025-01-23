const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userRoute');

const app = express();

// Configuração do CORS
// app.use(cors({
//   origin: 'http://localhost:5000', // Substitua pela URL do frontend
//   methods: '*', // Métodos permitidos
//   allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
// }));

app.use(cors());

// Middleware para interpretar JSON
app.use(express.json());

// Usando as rotas de usuários
app.use(userRoute);

module.exports = app;
