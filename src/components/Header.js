import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function Header({link, title}) {
    return (
        <header className="header">
            <div className="header__logo"></div>
            <Link to={link}>{title}</Link> // прописать стили, возможно обернуть в дополнительный див
        </header>
    );
}

export default Header;