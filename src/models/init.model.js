const MealModel = require('./meal.model');
const RestaurantModel = require('./restaurant.model');
const ReviewModel = require('./review.model');
const UserModel = require('./user.model');
const OrderModel = require('./order.model');

const initModel = () => {
  UserModel.hasMany(ReviewModel, { foreignKey: 'userId' });
  ReviewModel.belongsTo(UserModel, { foreignKey: 'userId' });

  RestaurantModel.hasMany(ReviewModel, { foreignKey: 'restaurantId' });
  ReviewModel.belongsTo(RestaurantModel, { foreignKey: 'restaurantId' });

  RestaurantModel.hasMany(MealModel, { foreignKey: 'restaurantId' });
  MealModel.belongsTo(RestaurantModel, { foreignKey: 'restaurantId' });

  MealModel.hasMany(OrderModel, { foreignKey: 'mealId' });
  OrderModel.belongsTo(MealModel, { foreignKey: 'mealId' });
};

module.exports = initModel;
