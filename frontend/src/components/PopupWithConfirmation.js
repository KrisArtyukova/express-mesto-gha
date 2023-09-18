import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(submitFormCallback, popupSelector) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popupElement.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__button');
  }

  open({ card, cardId }) {
    super.open();
    this._element = card;
    this._cardId = cardId;
  }

  close() {
    super.close();
  }

  _submitForm(event) {
    event.preventDefault();
    this._submitButton.textContent = `${this._submitButton.textContent} ...`;
    this._submitFormCallback({ card: this._element, cardId: this._cardId });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm.bind(this));
  }
}
