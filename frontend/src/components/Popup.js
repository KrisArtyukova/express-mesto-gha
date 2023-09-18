export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector('.popup__close-icon');
    this._localSetEventListeners = this._handleEscClose.bind(this);
  }

  open() {
    // Извините, но очень поняла, что требуется в данной правке - "Привязку метода к контексту следует выполнить единоразово в конструкторе класса"
    document.addEventListener('keydown', this._localSetEventListeners);
    this._popupElement.classList.add('popup_opened');
  }

  close() {
    // Извините, но очень поняла, что требуется в данной правке - "Привязку метода к контексту следует выполнить единоразово в конструкторе класса"
    document.removeEventListener('keydown', this._localSetEventListeners);
    this._popupElement.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    console.log('click');
    if (evt.key === 'Escape') this.close();
  }

  setEventListeners() {
    this._popupCloseBtn.addEventListener('click', () => this.close());
    this._popupElement.addEventListener('mousedown', (event) => {
      if (event.target === this._popupElement) this.close();
    });
  }
}
