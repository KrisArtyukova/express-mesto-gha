import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.popup__img');
    this._imagePopupCaption = this._popupElement.querySelector('.popup__caption');
  }

  open({ link, name, caption }) {
    super.open();
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._imagePopupCaption.textContent = caption;
  }
}
