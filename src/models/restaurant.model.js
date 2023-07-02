const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const RestaurantModel = db.define(
  'restaurants',
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
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

module.exports = RestaurantModel;
