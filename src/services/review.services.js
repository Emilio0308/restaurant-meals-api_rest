const ReviewModel = require('../models/review.model');
const AppError = require('../utils/appError');
const RestaurantServices = require('./restaurant.services');

class ReviewServices {
  restaurantServices = new RestaurantServices();

  async createReview({ comment, rating, id, sessionUser, next }) {
    try {
      //comment y rating fueron validados por valid.creteReview , sesionUser proviene de la validacion de protec , por ultimo validamos que el restauran del que se quiere hacer review exista
      const restaurantServices = new RestaurantServices();
      const restaurant = await restaurantServices.getRestaurantById(id, next);

      const newReview = await ReviewModel.create({
        userId: sessionUser.id,
        comment,
        restaurantId: restaurant.id,
        rating,
      });

      return newReview;
    } catch (error) {
      throw new Error(error);
    }
  }

  async validReview({ sessionUser, restaurantId, reviewId, next }) {
    try {
      //validamos q el restaurant este activo para evitar actualizar review de un restaurant que ya no extista
      await this.restaurantServices.getRestaurantById(restaurantId, next);
      //determinamos si la review existe
      const review = await ReviewModel.findOne({
        where: {
          id: reviewId,
          restaurantId,
          status: 'active',
        },
      });
      if (!review) {
        throw next(new AppError('review not found', 404));
      }
      //validamos que la review sea del usuario en sesion, para q solo el pueda actualizar su review
      if (review.userId !== sessionUser.id) {
        throw next(new AppError('you are not the owner of this review', 401));
      }
      return review;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateReview({
    comment,
    rating,
    sessionUser,
    restaurantId,
    reviewId,
    next,
  }) {
    try {
      const review = await this.validReview({
        sessionUser,
        restaurantId,
        reviewId,
        next,
      });

      const updatedReview = await review.update({ comment, rating });
      return updatedReview;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteReview({ sessionUser, restaurantId, reviewId, next }) {
    try {
      const review = await this.validReview({
        sessionUser,
        restaurantId,
        reviewId,
        next,
      });
      const deleteReview = await review.update({ status: 'disable' });
      console.log(deleteReview);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ReviewServices;
