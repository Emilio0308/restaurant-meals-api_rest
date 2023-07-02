const MealModel = require('../models/meal.model');
const RestaurantModel = require('../models/restaurant.model');
const AppError = require('../utils/appError');
const RestaurantServices = require('./restaurant.services');

class MealServices {
  restaurantServices = new RestaurantServices();

  async createOneMeal({ name, price, restaurantId, next }) {
    try {
      await this.restaurantServices.getRestaurantById(restaurantId, next);

      const meal = await MealModel.create({ name, price, restaurantId });

      return meal;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllMeals() {
    try {
      const meals = MealModel.findAll({
        where: {
          status: 'active',
        },
        include: [
          {
            model: RestaurantModel,
            // attributes: {
            //   exclude: ['status', 'createdAt', 'updatedAt'],
            // },
          },
        ],
      });
      return meals;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getOneMeal(id, next) {
    try {
      const meal = await MealModel.findOne({
        where: {
          id,
          status: 'active',
        },
        include:{
          model:RestaurantModel
        }
      });
      if (!meal) {
        throw next(new AppError('meal not found', 404));
      }
      return meal;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateOneMeal({ name, price, id, next }) {
    try {
      const meal = await this.getOneMeal(id, next);

      const mealUpdated = await meal.update({ name, price });

      return mealUpdated;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateOneMeal({ id, next }) {
    try {
      const meal = await this.getOneMeal(id, next);

      const deletedMeal = await meal.update({ status: 'disable' });

      return deletedMeal;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = MealServices;
