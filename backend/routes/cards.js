const router = require('express').Router();
const {
  getCards, deleteCard, createCard, setLike, unsetLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', setLike);
router.delete('/:cardId/likes', unsetLike);

module.exports = router;
