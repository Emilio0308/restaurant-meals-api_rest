const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const MealModel = db.define(
  'meals',
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'disable'),
      allowNull: false,
      defaultValue: 'active',
    },
  },
  {
    hooks: {
      beforeFind: (options) => {
        options.attributes = {
          exclude: ['status', 'createdAt', 'updatedAt'],
        };
      },
    },
  }
);

module.exports = MealModel;
