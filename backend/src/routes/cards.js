const express = require('express');
const cardsController = require('../controllers/cards');
const {
  createCardValidation, cardIdValidation,
} = require('../middlewares/validation');

const cardRouters = express.Router();

cardRouters.get('/', cardsController.getCards);
cardRouters.post('/', createCardValidation, cardsController.createCard);
cardRouters.delete('/:cardId', cardIdValidation, cardsController.deleteCard);
cardRouters.put('/:cardId/likes', cardIdValidation, cardsController.likeCard);
cardRouters.delete('/:cardId/likes', cardIdValidation, cardsController.dislikeCard);

module.exports = {
  cardRouters,
};
