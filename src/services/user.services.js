const UserModel = require('../models/user.model');
const ReviewModel = require('../models/review.model');
const AppError = require('../utils/appError');

class UserServices {
  async findOne(id) {
    try {
      const user = await UserModel.findOne({
        where: {
          id,
          status: 'active',
        },
        include: [
          {
            model: ReviewModel,
            attributes: {
              exclude: ['status', 'createdAt', 'updatedAt'],
            },
          },
        ],
      });
      if (!user) {
        throw new AppError('user not found', 404);
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findUserByEmail({ email, next }) {
    try {
      const user = await UserModel.findOne({
        where: {
          email,
        },
      });
      if (user && user.status === 'disable') {
        throw next(
          new AppError(`the user of ${email} is not longer avialable`,400)
        );
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async createUser({ name, email, password, role }) {
    try {
      const user = await UserModel.findOne({
        where: {
          email,
        },
      });
      if (user) {
        throw new AppError(`user with email ${email} already exist`, 400);
      }
      const newUser = await UserModel.create({
        name,
        email,
        password,
        role: role || 'normal',
      });

      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser({ name, email, sessionUser }) {
    try {
      const user = await sessionUser.update({ name, email });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteUser({ sessionUser }) {
    try {
      const user = await sessionUser.update({ status: 'disable' });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserServices;
