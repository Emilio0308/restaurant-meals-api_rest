const RestaurantModel = require('../models/restaurant.model');
const MealModel = require('../models/meal.model');
const OrderModel = require('../models/order.model');
const MealServicel = require('./meal.services');
const AppError = require('../utils/appError');

class OrderServices {
  mealServices = new MealServicel();

  async cretaeOrder({ quantity, mealId, userId, next }) {
    try {
      //validar si existe el platillo
      const meal = await this.mealServices.getOneMeal(mealId, next);
      //calculo del total
      const totalPrice = meal.price * quantity;

      const newOrder = await OrderModel.create({
        mealId,
        userId,
        totalPrice,
        quantity,
      });
      return newOrder;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOneOrder({ orderId, next, userId }) {
    //servicio para encontrar a y validar orden usado por update y delete//
    try {
      const order = await OrderModel.findOne({
        where: {
          id: orderId,
        },
      });
      //validar si existe, si ya esta cancelada no se puede actualizar ni cancelar, y validar si el usurio en sesion creo la orden
      if (!order) {
        throw next(new AppError('order not found', 404));
      }
      if (order.status === 'cancelled') {
        throw next(new AppError('order is already cancelled', 400));
      }
      if (order.userId !== userId) {
        throw next(new AppError('you are not the owner of this order', 401));
      }
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateOrder({ userId, orderId, next }) {
    try {
      const order = await this.findOneOrder({ orderId, next, userId });

      if (order.status === 'completed') {
        throw next(new AppError('order is already completed', 400));
      }
      return await order.update({ status: 'completed' });
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteOrder({ userId, orderId, next }) {
    try {
      const order = await this.findOneOrder({ orderId, next, userId });

      if (order.status === 'completed') {
        throw next(
          new AppError('order is already completed can not cancelled', 400)
        );
      }
      return await order.update({ status: 'cancelled' });
    } catch (error) {
      throw new Error(error);
    }
  }
  async getOrdersByUser({ userId }) {
    try {
      const orders = await OrderModel.findAll({
        where: {
          userId,
          status: 'active',
        },
        attributes: {
          exclude: ['status', 'createdAt', 'updatedAt'],
        },
        include: [
          {
            model: MealModel,
            attributes: {
              exclude: ['status', 'createdAt', 'updatedAt'],
            },
            include: [
              {
                model: RestaurantModel,
                attributes: {
                  exclude: ['status', 'createdAt', 'updatedAt'],
                },
              },
            ],
          },
        ],
      });
      return orders;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = OrderServices;
