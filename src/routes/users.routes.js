const express = require('express');

//controllers
const userController = require('.././controllers/user.controllers');
//middleware
const validMiddleware = require('../middlewares/valid.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/signup', validMiddleware.ValidSignup, userController.signup);
router.post('/login', validMiddleware.validLogin, userController.login);
router.use(authMiddleware.protect);
router.patch(
  '/:id',
  validMiddleware.validUpdate,
  authMiddleware.protectAccountOwner,
  userController.updateUser
);
router.delete(
  '/:id',
  authMiddleware.protectAccountOwner,
  userController.deleteUser
);
router.get('/orders', userController.getAllUsers);
router.get('/orders/:id', userController.getAllUsers);

module.exports = router;
