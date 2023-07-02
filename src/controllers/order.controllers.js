const catchAsync = require('../utils/catchAsync');
const OrderServices = require('../services/order.services');
const orderServices = new OrderServices();

exports.createAnOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { id: userId } = req.sessionUser;

  const newOrder = await orderServices.cretaeOrder({
    quantity,
    mealId,
    userId,
    next,
  });

  return res.status(200).json({
    message: 'order created',
    status: 'success',
    newOrder,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const { id: orderId } = req.params;
  const order = await orderServices.updateOrder({ userId, orderId, next });

  return res.status(200).json({
    message: `order with id: ${order.id} completed`,
    status: 'success',
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const { id: orderId } = req.params;
  const order = await orderServices.deleteOrder({ userId, orderId, next });

  return res.status(200).json({
    message: `order with id: ${order.id} deleted`,
    status: 'success',
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const { id: userId } = req.sessionUser;
  const orders = await orderServices.getOrdersByUser({ userId });
  return res.status(200).json({
    message: 'orders found',
    status: 'success',
    results: orders.length,
    orders
  });
});
