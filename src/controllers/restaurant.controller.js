const catchAsync = require('../utils/catchAsync');
// const RestaurantModel = require('../models/restaurant.model')
const RestaurantServices = require('../services/restaurant.services');
const restaurantServices = new RestaurantServices();

exports.getAllRestaurant = catchAsync(async (req, res, next) => {
  const allRestaurants = await restaurantServices.getAllRestaurant();
  return res.status(200).json({
    status: 'success',
    message: 'all restaurants',
    restaurants: allRestaurants,
  });
});

exports.getRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await restaurantServices.getOneRestaurantById(id, next);
  return res.status(200).json({
    status: 'success',
    message: 'restaurant found',
    restaurant,
  });
});

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await restaurantServices.createRestaurant({
    name,
    address,
    rating,
  });

  return res.status(200).json({
    status: 'success',
    message: 'restaurant created',
    restaurant: newRestaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, address } = req.body;
  const restaurant = await restaurantServices.updateRestaurant({
    name,
    address,
    id,
  });
  console.log(restaurant);
  return res.status(200).json({
    status: 'success',
    message: `restaurant with id ${id} updated`,
    restaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await restaurantServices.deleteRestaurant(id);
  return res.status(200).json({
    status: 'success',
    message: `restaurant with id ${id} deleted`,
  });
});
