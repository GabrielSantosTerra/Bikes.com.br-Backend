const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Rota para obter todos os usuários
router.get('/', userController.getAllUsers);

// Rota para criar um novo usuário
router.post('/registerUser', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;
