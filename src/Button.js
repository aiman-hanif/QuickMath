import React from "react";

const Button = ({ content, type, onButtonClick }) => {
    return <div className="Button" onClick={onButtonClick(content)}>{content}</div>
}

export default Button;