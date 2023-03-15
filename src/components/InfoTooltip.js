import React from "react";

function InfoTooltip({ isOpen, onClose, text, isOk }) {

    return(
        <div className={`popup ` + (isOpen ? "image-popup_opened" : "")}>
            <div className="popup__container">
                <button type="button" className="popup__close-button" onClick={onClose}></button>
                <div className={`popup__reg-status ` + (isOk ? "popup__reg-status_type_ok" : "popup__reg-status_type_err")}></div>
                {/* <div className="popup__reg-status popup__reg-status_type_ok"></div> */}
                <h2 className="popup__reg-title">{text}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;