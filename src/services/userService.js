// src/services/userService.js
const User = require('../models/userModel');

exports.getUsers = async () => {
    return await User.findAll();
};

exports.createUser = async (data) => {
    return await User.create(data);
};
