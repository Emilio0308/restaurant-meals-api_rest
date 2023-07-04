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

  //agregando la relacion hasone y no has many
  
  MealModel.hasOne(OrderModel, { foreignKey: 'mealId' });
  OrderModel.belongsTo(MealModel, { foreignKey: 'mealId' });
};

module.exports = initModel;
