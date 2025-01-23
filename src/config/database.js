const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bikes_dev', 'bikes_dev', 'Tsc10012000@', {
    host: 'bikes_dev.postgresql.dbaas.com.br',
    dialect: 'postgres', // Altere para 'mysql', 'sqlite', etc.
});

sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
    .catch((error) => console.error('Erro ao conectar ao banco:', error));

module.exports = sequelize;
