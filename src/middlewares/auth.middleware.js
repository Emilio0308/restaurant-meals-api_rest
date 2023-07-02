const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const { promisify } = require('util');
const UserServices = require('../services/user.services');
const AppError = require('../utils/appError');

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }
  const decode = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );
  const userServices = new UserServices();
  const user = await userServices.findOne(decode.id);
  req.sessionUser = user;
  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;
  const user = await new UserServices().findOne(id);

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError('You do not have permission to perfom this action.!', 403)
      );
    }
    next();
  };
};
