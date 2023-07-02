const { validationResult, body } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.ValidSignup = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('invalid format'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  validateFields,
];

exports.validLogin = [
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('invalid format'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters long'),
  validateFields,
];

exports.validUpdate = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('invalid format'),
  validateFields,
];

exports.ValidCreateRestaurant = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('address').notEmpty().withMessage('address is require'),
  body('rating')
    .notEmpty()
    .withMessage('rating is requiere')
    .isInt()
    .withMessage('rating cannot be decimal'),
  validateFields,
];

exports.validUpdateRestaurant = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('address').notEmpty().withMessage('address is require'),
  validateFields,
];

exports.validCreateReview = [
  body('comment')
    .notEmpty()
    .withMessage('the comment cannot be empty')
    .isLength({ min: 10 })
    .withMessage('comment must be at least 10 characters long')
    .trim(),
  body('rating')
    .notEmpty()
    .withMessage('rating cannot be empty')
    .isInt()
    .withMessage('rating must be a integer number')
    .isIn([1, 2, 3, 4, 5])
    .withMessage('rating must be between 1 and 5'),
  validateFields,
];

exports.validCreateMeal = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('price')
    .notEmpty()
    .withMessage('price is require')
    .isInt()
    .withMessage('price must be a number'),
  validateFields,
];

exports.validCreateOrder = [
  body('quantity')
    .notEmpty()
    .withMessage('quantity cannot be empty')
    .isInt()
    .withMessage('quantity must be a integer'),
  body('mealId')
    .notEmpty()
    .withMessage('mealId is require')
    .isInt()
    .withMessage('mealId must be a integer'),
  validateFields,
];
