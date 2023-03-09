import React from "react";

function Register() {

    return (
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form">
                <input placeholder="Email" />
                <input placeholder="Пароль" />
                <button className="register__form-button">Зарегистрироваться</button>
            </form>
        </div>
    )
}

export default Register;