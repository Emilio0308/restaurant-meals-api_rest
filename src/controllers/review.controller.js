const catchAsync = require('../utils/catchAsync');
const ReviewServices = require('../services/review.services');

const reviewServices = new ReviewServices();

exports.createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { sessionUser } = req;
  const { id } = req.params;
  const review = await reviewServices.createReview({
    comment,
    rating,
    id,
    sessionUser,
    next,
  });

  return res.status(200).json({
    status: 'success',
    message: 'review created',
    review,
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { sessionUser } = req;
  const { restaurantId, id: reviewId } = req.params;

  const review = await reviewServices.updateReview({
    comment,
    rating,
    sessionUser,
    restaurantId,
    reviewId,
    next,
  });

  return res.status(200).json({
    status: 'success',
    message: 'review updated',
    review,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { restaurantId, id: reviewId } = req.params;

  const review = await reviewServices.deleteReview({
    sessionUser,
    restaurantId,
    reviewId,
    next,
  });

  return res.status(200).json({
    status: 'success',
    message: `review  deleted`,
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  return res.json(/* valor a retornar */);
});
