const mealControllers = require('../controllers/meal.controllers');
const express = require('express');
//midleware
const authMiddeware = require('../middlewares/auth.middleware');
const validMiddleware = require('../middlewares/valid.middleware');

const router = express.Router();

router.get('/', mealControllers.findAllMeals);
router.get('/:id', mealControllers.findOneMeal);

router.use(authMiddeware.protect);
router.use(authMiddeware.restrictTo('admin'));

router.post(
  '/:id',
  validMiddleware.validCreateMeal,
  mealControllers.CreateMeal
);
router.patch('/:id', validMiddleware.validCreateMeal, mealControllers.UpdateMeal);
router.delete('/:id', mealControllers.deleteMeal);

module.exports = router;
