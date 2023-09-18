class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization,
      }
    })
    .then(this._checkResponse)
  // другие методы работы с API
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type'],
      },
      body: JSON.stringify({
        name,
        link,
      })
    })
    .then(this._checkResponse)
  // другие методы работы с API
  }

  deleteCard(id) {
   return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      }
    })
    .then(this._checkResponse)
  // другие методы работы с API
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization,
      }
    })
    .then(this._checkResponse)
  // другие методы работы с API
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization,
      }
    })
    .then(this._checkResponse)
  // другие методы работы с API
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization,
      }
    })
      .then(this._checkResponse)
  // другие методы работы с API
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type'],
      },
      body: JSON.stringify({
        name,
        about,
      })
    })
    .then(this._checkResponse)
  // другие методы работы с API
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._headers.authorization,
        'Content-Type': this._headers['Content-Type'],
      },
      body: JSON.stringify({
        avatar,
      })
    })
    .then(this._checkResponse)
  // другие методы работы с API
  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: 'ad409708-ab6d-48ec-b3a6-3e6c2313ee38',
    'Content-Type': 'application/json'
  }
});
