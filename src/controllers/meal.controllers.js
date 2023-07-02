const catchAsync = require('../utils/catchAsync');
// const modelName = require('../models/modelFile');
const MealServices = require('../services/meal.services');

const mealServices = new MealServices();

exports.CreateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id: restaurantId } = req.params;

  const newMeal = await mealServices.createOneMeal({
    name,
    price,
    restaurantId,
    next,
  });

  return res.status(200).json({
    status: 'success',
    message: 'meal creates',
    meal: newMeal,
  });
});

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await mealServices.getAllMeals();

  return res.status(200).json({
    status: 'success',
    message: 'meals found',
    result: meals.length,
    meal: meals,
  });
});

exports.findOneMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await mealServices.getOneMeal(id, next);

  return res.status(200).json({
    status: 'success',
    message: 'meal found',
    meal,
  });
});

exports.UpdateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const meal = await mealServices.updateOneMeal({ name, price, id, next });

  return res.status(200).json({
    status: 'success',
    message: 'meal updated',
    meal,
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  await mealServices.updateOneMeal({ id, next });

  return res.status(200).json({
    status: 'success',
    message: 'meal deleted',
  });
});
