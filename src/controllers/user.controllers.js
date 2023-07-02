const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const UserServices = require('../services/user.services');
const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const userServices = new UserServices();

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await userServices.findUserByEmail({ email, next });
  if (user) {
    return next(
      new AppError(`the user with email: ${email} already exist`, 400)
    );
  }
  const newUser = await userServices.createUser({
    name,
    email,
    password,
    role,
  });

  const token = await generateJWT(newUser.id);

  return res.status(200).json({
    status: 'success',
    message: 'user created',
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userServices.findUserByEmail({ email, next });
  if (!user) {
    return next(new AppError('user not found', 404));
  }

  //validar password bcrypt//
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('invalid credentials', 401));
  }
  const token = await generateJWT(user.id);

  return res.status(200).json({
    status: 'success',
    message: 'ok',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      reviews: user.reviews,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { sessionUser } = req;

  const user = await userServices.updateUser({ name, email, sessionUser });

  return res.status(200).json({
    message: 'success',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  await userServices.deleteUser({ sessionUser });

  return res.status(200).json({
    message: `the user ${sessionUser.name} has been deleted`,
    status: 'success',
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  return res.status(200).json({
    message: 'ok',
  });
});
