class Api {
  constructor(options) {
    this._url = options.url
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }      
    })
      .then(this._checkResponse)
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(this._checkResponse)
  }

  setUserInfo({name, about}) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._checkResponse)
  }

  addCard({name, link}) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._checkResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then(this._checkResponse)
  }

  setUserAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  url: `https://api.dkay.nomoredomains.sbs/`
});


export {api};