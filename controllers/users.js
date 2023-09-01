const User = require('../models/user');
const { errorHandler } = require('./errorHandler');
const { NotFoundError, InternalServerError } = require('./errorCodes');
const { defaultErrorMessages } = require('./errorHandler');

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.status(200).send({ data: user });
      else {
        res.status(404).send({
          message: 'Нет пользователя с таким id',
        });
      }
    })
    .catch((err) => errorHandler(err, res, {
      ...defaultErrorMessages,
      [NotFoundError]: 'Пользователь не найден',
      [InternalServerError]: 'Произошла ошибка при поиске пользователя',
    }));
};

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res, {
      ...defaultErrorMessages,
      [NotFoundError]: 'Пользователи не найдены',
      [InternalServerError]: 'Произошла ошибка при поиске пользователей',
    }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => errorHandler(err, res, {
      ...defaultErrorMessages,
      [NotFoundError]: 'Не найдено',
      [InternalServerError]: 'Произошла ошибка при создании пользователя',
    }));
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    name: req.body.name, about: req.body.about,
  }, { new: true, runValidators: true })
    .then((user) => (res.send({ data: user })))
    .catch((err) => errorHandler(err, res, {
      ...defaultErrorMessages,
      [NotFoundError]: 'Пользователь не найден',
      [InternalServerError]: 'Произошла ошибка при обновлении пользователя',
    }));
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    avatar: req.body.avatar,
  }, { new: true, runValidators: true })
    .then((user) => (res.send({ data: user })))
    .catch((err) => errorHandler(err, res, {
      ...defaultErrorMessages,
      [NotFoundError]: 'Пользователь не найден',
      [InternalServerError]: 'Произошла ошибка при обновлении аватара',
    }));
};

module.exports = {
  getUserById, getUsers, createUser, updateUser, updateAvatar,
};
