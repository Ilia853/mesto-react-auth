import React, { useState } from "react";
import {Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

function Login({handleLogin}) {
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
        if(!email || !password) {
            return;
        }
        auth.authorize(email, password).then((data) => {
            if(data.token) {
                setEmail("");
                setPassword("");
                handleLogin();
                navigate("/", {replace: true})
            }
        })
        .catch((err) => {
            console.log("Login", err)
        })
      }

    return (
        <div className="register">
            <h2 className="register__title">Вход</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                <input placeholder="Email" onChange={handleEmailChange} />
                <input placeholder="Пароль" onChange={handlePasswordChange}/>
                <button className="register__form-button" onSubmit={handleSubmit}>Войти</button>
            </form>
        </div>
    )
}

export default Login;