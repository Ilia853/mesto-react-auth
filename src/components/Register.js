import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(email, password)
            .then((res) => {
                navigate("/sign-in", { replace: true });
            })
            .catch((err) => {
                console.log("Error", err);
            });
    };

    return (
        <div className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input placeholder="Email" onChange={handleEmailChange} />
                <input placeholder="Пароль" onChange={handlePasswordChange} />
                <button className="register__form-button" onSubmit={handleSubmit}>
                    Зарегистрироваться
                </button>
            </form>
            <div className="register__sign-in">
                <p className="">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="register__login-link">
                    Войти
                </Link>
            </div>
        </div>
    );
}

export default Register;
