const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'divyanshusingh',
  password: 'root',
  database: 'chatbot',
});

const Message = sequelize.define('Message', {
  user_message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  bot_reply: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

sequelize.sync(); // Sync the model with the database

module.exports = { sequelize, Message };
