export default class Card {
  constructor(cardData, selectorTemplate, handleCardClick, handleLikeClick, handleDeleteClick, userId) {
    this._cardData = cardData;
    this._link = cardData.link;
    this._name = cardData.name;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._selectorTemplate = selectorTemplate;
    this._imagePopup = document.querySelector('.popup_img_view');
    this._cardElement = this._getTemplate();
    this._imageElement = this._cardElement.querySelector('.element__img');
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._likeBtnElement = this._cardElement.querySelector('.element__like-btn');
    this._likeCountElement = this._cardElement.querySelector('.element__like-count');
    this._deleteBtnElement = this._cardElement.querySelector('.element__del-btn');
    this._titleElement = this._cardElement.querySelector('.element__title');
    this._titleElement.textContent = this._name;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likeCountElement.textContent = this._likes.length;
    this._userId = userId;
    this._hasOwnLike = this._resolveOwnLike(this._cardData);
    this._resolveLikeBtns();
    this._resolveDeleteBtns();
  }

  _resolveLikeBtns() {
    if (this._hasOwnLike) this._likeBtnElement.classList.add('element__like-btn_active');
  }

  _resolveOwnLike(cardData) {
    let that = this;

    return cardData.likes.some((like) => {
      return (like._id === that._userId);
    });
  }

  _setNewCardData(cardData) {
    this._cardData = cardData;
  }

  _resolveDeleteBtns() {
    if (this._cardData.owner._id !== this._userId) this._deleteBtnElement.remove();
  }

  _getTemplate() {
    return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
  }

  _handleLike = () => {
    this._handleLikeClick(this._cardData, this._cardId, this._likeCountElement, this._likeBtnElement, this._resolveOwnLike.bind(this), this._setNewCardData.bind(this));
  }

  _handleDeleteElement = () => {
    this._handleDeleteClick(this._cardElement, this._cardId);
  }

  _setEventListeners() {
    this._likeBtnElement.addEventListener('click', this._handleLike);
    this._deleteBtnElement.addEventListener('click', this._handleDeleteElement);
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name, this._titleElement.textContent)
    });
  }

  createCard() {
    this._setEventListeners();
    return this._cardElement;
  }

}
