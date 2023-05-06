import React, { useState } from 'react'
import '../styles/components/article-form.scss';

type ValidationInputProps = {
    type: string;
    name: string;
    children: React.ReactNode;
    error: string;
    onInputChange: (newValue: string) => void;
}

export const ValidationInput = ({type, name, children, error, onInputChange}: ValidationInputProps) => {
    const [value, setValue] = useState("");

  return (
    <label htmlFor={name}>
        {children}
        <input
          type={type}
          id={name}
          value={value}
          onChange={(e) => {
            const newValue = e.target.value;
            setValue(newValue);
            onInputChange(newValue);
          }}
        />
        {error && <div className="errorText">{error}</div>}
    </label>
  )
}