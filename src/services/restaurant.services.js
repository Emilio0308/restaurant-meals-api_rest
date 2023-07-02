const RestaurantModel = require('../models/restaurant.model');
const MealModel = require('../models/meal.model');
const ReviewModel = require('../models/review.model');
// const UserModel = require('../models/user.model');

const AppError = require('../utils/appError');

class RestaurantServices {
  async createRestaurant({ name, address, rating }) {
    try {
      const newRestaurant = await RestaurantModel.create({
        name,
        address,
        rating,
      });
      return newRestaurant;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllRestaurant() {
    try {
      const allRestaurants = await RestaurantModel.findAll({
        where: {
          status: 'active',
        },
        include: [
          {
            model: ReviewModel,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'status'],
            },
          },
          {
            model: MealModel,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'status'],
            },
          },
        ],
      });
      return allRestaurants;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOneRestaurantById(id, next) {
    try {
      const restaurant = await RestaurantModel.findOne({
        where: {
          id,
          status: 'active',
        },
        include: [
          {
            model: ReviewModel,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'status'],
            },
          },
          {
            model: MealModel,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'status'],
            },
          },
        ],
      });
      if (!restaurant) {
        throw next(new AppError(`restaurant with id: ${id} not found`, 404));
      }
      return restaurant;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateRestaurant({ name, address, id }) {
    try {
      const restaurant = await this.getRestaurantById(id);

      const restaurantUpdated = await restaurant.update({ name, address });

      return restaurantUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteRestaurant(id) {
    try {
      const restaurant = await this.getRestaurantById(id);
      await restaurant.update({ status: 'disable' });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getRestaurantById(id, next) {
    try {
      //este servicio esta dirijido a cumplir validaciones para otros servicios
      const restaurant = await RestaurantModel.findOne({
        where: {
          id,
          status: 'active',
        },
      });
      if (!restaurant) {
        throw next(new AppError(`restaurant with id: ${id} not found`, 404));
      }
      return restaurant;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = RestaurantServices;
