const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant.controller');
const reviewController = require('../controllers/review.controller');
//middleware
const authMiddleware = require('../middlewares/auth.middleware');
const validMiddleware = require('../middlewares/valid.middleware');

router.get('/', restaurantController.getAllRestaurant);
router.get('/:id', restaurantController.getRestaurantById);

router.use(authMiddleware.protect);
router.post(
  '/',
  validMiddleware.ValidCreateRestaurant,
  authMiddleware.restrictTo('admin'),
  restaurantController.createRestaurant
);
router.patch(
  '/:id',
  validMiddleware.validUpdateRestaurant,
  authMiddleware.restrictTo('admin'),
  restaurantController.updateRestaurant
);
router.delete(
  '/:id',
  authMiddleware.restrictTo('admin'),
  restaurantController.deleteRestaurant
);

router.post(
  '/reviews/:id',
  validMiddleware.validCreateReview,
  reviewController.createReview
);
router.patch(
  '/reviews/:restaurantId/:id',
  validMiddleware.validCreateReview,
  reviewController.updateReview
);
router.delete('/reviews/:restaurantId/:id', reviewController.deleteReview);

module.exports = router;
