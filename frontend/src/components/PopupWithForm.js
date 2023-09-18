import Popup from "./Popup";
export default class PopupWithForm extends Popup {
  constructor({ submitFormCallback }, popupSelector) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popupElement.querySelector('.popup__form');
  }

  setInitialValues(inputValues) {
    const inputNames = Object.keys(inputValues);
    inputNames.forEach((inputName) => {
      this._form[inputName].value = inputValues[inputName];
    });
  }

  _getInputValues() {
    // https://stackoverflow.com/a/47188324
    const formData = Object.values(this._form).reduce((obj,field) => {
      if (field.name) {
        obj[field.name] = field.value;
      }
      return obj
    }, {});

    return formData;
  }

  _submitForm(event) {
    const inputValues = this._getInputValues();
    this._submitFormCallback(event, inputValues);
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitForm(event);
    });
  }
}
