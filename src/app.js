const express = require('express');
const cors = require('cors');

const app = express();

const globalErrorHandler = require('./controllers/error.controller')

//rutas
const userRoutes = require('./routes/users.routes');
const restaurantRoutes = require('./routes/restaurants.routes');
const orderRoutes = require('./routes/orders.routes');
const mealRoutes = require('./routes/meals.routes');
const AppError = require('./utils/appError');

app.use(express.json());
app.use(cors());

app.use('/api/vi/users', userRoutes);
app.use('/api/vi/restaurants', restaurantRoutes);
app.use('/api/vi/meals', mealRoutes);
app.use('/api/vi/orders', orderRoutes);

app.use('*', (req , res ,next) => {
    return next(new AppError(`${req.originalUrl} not found in this server 💀`))
})

app.use(globalErrorHandler)

module.exports = app;
