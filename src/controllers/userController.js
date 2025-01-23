const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
};

// Função para criar um novo usuário
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, cpf, birth_date, phone } = req.body;

        if (!name || !email || !password || !cpf || !birth_date || !phone) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
        }

        // Verifica se o e-mail ou CPF já existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já cadastrado!' });
        }

        const existingCPF = await User.findOne({ where: { cpf } });
        if (existingCPF) {
            return res.status(400).json({ message: 'CPF já cadastrado!' });
        }

        // Hash da senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password_hash: hashedPassword,
            cpf,
            birth_date,
            phone,
        });

        res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
    }
};

// Função para efetuar login do usuário
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Os campos email e senha são obrigatórios!' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas!' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'minha_chave_secreta',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login bem-sucedido!',
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
    }
};