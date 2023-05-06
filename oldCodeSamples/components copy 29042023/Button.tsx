import React from 'react';
import  './Button.scss';

type ButtonProps = {
    text: string;
    onButtonClick: () => void;
};

export const Button = ({ text, onButtonClick }: ButtonProps) => {
    return (
        <button
            className={text}
            onClick={() => {
                onButtonClick()
            }}
        >
            {text}
        </button>
    )
};