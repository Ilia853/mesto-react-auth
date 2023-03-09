class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _checkResponse(res){
        return res.ok ? res.json() : Promise.reject(res.statusText)
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    editProfile(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        })
            .then(this._checkResponse)
    }

    addImage(name, link, likes) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
                likes,
            }),
        })
            .then(this._checkResponse)
    }

    delImage(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    // addLike(cardId) {
    //     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    //         method: "PUT",
    //         headers: this._headers,
    //     })
    //         .then(this._checkResponse)
    // }

    // delLike(cardId) {
    //     return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    //         method: "DELETE",
    //         headers: this._headers,
    //     })
    //         .then(this._checkResponse)
    // }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? "DELETE" : "PUT",
            headers: this._headers,
        })
            .then(this._checkResponse)
    }

    changeAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar,
            }),
        })
            .then(this._checkResponse)
    }
}

const api = new Api({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-55",
    headers: {
        authorization: "1964c9fe-86a7-460a-b318-7e558d91efb6",
        "Content-Type": "application/json",
    },
});

export default api;
