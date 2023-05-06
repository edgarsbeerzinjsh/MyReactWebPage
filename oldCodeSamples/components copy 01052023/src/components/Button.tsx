import React from 'react';
import  '../styles/components/button.scss';

type ButtonProps = {
    variant?: "primary" | "secondary"
    children: JSX.Element | string;
    type?: "submit" | "button";
    onButtonClick?: () => void;
};

export const Button = ({ variant="primary", children, type="button", onButtonClick }: ButtonProps) => {
    return (
        <button
            className= {`button ${variant}`}
            type= {type}
            onClick={() => {
                onButtonClick?.()
            }}
        >
            {children}
        </button>
    )
};