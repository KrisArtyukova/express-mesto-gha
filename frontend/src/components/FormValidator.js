export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorSelectorTemplate = config.errorSelectorTemplate;
    this._disableButtonClass = config.disableButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(config.submitButtonSelector);

    this._enableValidation();
  }

_enableValidation() {
    this._setInputsListeners();
    this._setSubmitListener();
    this._toggleButtonValidity();
  }

  _setInputValidState(input, errorElement) {
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _setInputInvalidState(input, errorElement) {
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;

  }

  _checkInputValidity(input) {
    const errorElement = this._form.querySelector(`#error-${input.id}`);

    if (input.checkValidity()) {
        this._setInputValidState(input, errorElement);
    } else {
        this._setInputInvalidState(input, errorElement);
    }
  }

  _disableButton() {
    this._submitButton.setAttribute('disabled', '');
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _enableButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonValidity() {
    if (this._form.checkValidity()) {
        this._enableButton();
    } else {
      this._disableButton();
    }
  }


  _setSubmitListener() {
    this._form.addEventListener('submit', (event) => {
        event.preventDefault();
        this._toggleButtonValidity();
    });
  }

  _setInputsListeners = () => {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonValidity();
      });
    });
  }

  resetInputValidity() {
    this._inputList.forEach((inputElement) => {
      const errorElement = document.querySelector(`#error-${inputElement.id}`);
      this._setInputValidState(inputElement, errorElement);
      this._toggleButtonValidity();
    });
  }

}
