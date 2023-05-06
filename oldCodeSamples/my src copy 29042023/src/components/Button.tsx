import React from 'react';
import  '../styles/components/button.scss';

type ButtonProps = {
    variant?: "primary" | "secondary"
    text: string;
    type?: "submit" | "button";
    onButtonClick?: () => void;
};

export const Button = ({ variant="primary", text, type="button", onButtonClick }: ButtonProps) => {
    return (
        <button
            className= {`button ${variant}`}
            type= {type}
            onClick={() => {
                onButtonClick?.()
            }}
        >
            {text}
        </button>
    )
};