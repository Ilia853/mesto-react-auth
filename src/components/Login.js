import React from "react";

function Login() {

    return (
        <div className="register">
            <h2 className="register__title">Вход</h2>
            <form className="register__form">
                <input placeholder="Email" />
                <input placeholder="Пароль" />
                <button className="register__form-button">Войти</button>
            </form>
        </div>
    )
}

export default Login;