export const BASE_URL = "https://auth.nomoreparties.co";

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)))
        .then((res) => {
            return res;
        })
        .catch((err) => console.log("Registration error", err));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                return data;
            } else {
                return;
            }
        })
        .catch((err) => {
            console.log("Authorize", err);
        });
};

export const getContent = (token) => {
    return (
        fetch(`${BASE_URL}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .catch((err) => {
                console.log("Ошибка проверки токена", err);
            })
    );
};
