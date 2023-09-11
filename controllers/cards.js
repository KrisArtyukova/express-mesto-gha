const Card = require('../models/card');
const { errorHandler } = require('../errors/errorHandler');
const {
  NotFound, NotFoundError, InternalServerError,
} = require('../errors/errorCodes');
const { defaultErrorMessages } = require('../errors/errorHandler');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(err, res, {
      ...defaultErrorMessages,
      [NotFoundError]: 'Карточки не найдены',
      [InternalServerError]: 'Произошла ошибка при получении карточек',
    }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NotFound).send({ message: 'Карточка не найдена' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => errorHandler(err, res, {
      ...defaultErrorMessages,
      [NotFoundError]: 'Карточки не найдены',
      [InternalServerError]: 'Произошла ошибка при удалении карточки',
    }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => errorHandler(err, res, {
      ...defaultErrorMessages,
      [NotFoundError]: 'Не найдено',
      [InternalServerError]: 'Произошла ошибка при создании карточки',
    }));
};

const setLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(NotFound).send({ message: 'Карточка не найдена' });
    } else {
      res.send({ data: card });
    }
  })
    .catch((err) => errorHandler(err, res, {
      ...defaultErrorMessages,
      [NotFoundError]: 'Не найдено',
      [InternalServerError]: 'Произошла ошибка при установке лайка',
    }));
};

const unsetLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      res.status(NotFound).send({ message: 'Карточка не найдена' });
    } else {
      res.send({ data: card });
    }
  })
    .catch((err) => errorHandler(err, res, {
      ...defaultErrorMessages,
      [NotFoundError]: 'Не найдено',
      [InternalServerError]: 'Произошла ошибка при удалении лайка',
    }));
};

module.exports = {
  getCards, deleteCard, createCard, setLike, unsetLike,
};
