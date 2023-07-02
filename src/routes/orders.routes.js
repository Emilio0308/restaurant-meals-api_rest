const express = require('express');
const router = express.Router();
//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const validMiddleware = require('../middlewares/valid.middleware');
//controllers
const ordersController = require('../controllers/order.controllers');

router.use(authMiddleware.protect);

router.post(
  '/',
  validMiddleware.validCreateOrder,
  ordersController.createAnOrder
);
router.get('/me', ordersController.getMyOrders);
router.patch('/:id', ordersController.updateOrder);
router.delete('/:id', ordersController.deleteOrder);

module.exports = router;
