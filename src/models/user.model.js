const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const bcrypt = require('bcryptjs');

const UserModel = db.define(
  'users',
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'disable'),
      allowNull: false,
      defaultValue: 'active',
    },
    role: {
      type: DataTypes.ENUM('normal', 'admin'),
      allowNull: false,
      defaultValue: 'normal',
    },
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
        const salt = await bcrypt.genSalt(12);
        const secretPassword = await bcrypt.hash(newUser.password, salt);
        newUser.password = secretPassword;
      },
    },
  }
);

module.exports = UserModel;
