import React, { useEffect, useRef, useState } from 'react'
import { Button } from './Button';
import { Article } from '../types/article';
import '../styles/components/article-form.scss';
import axios from 'axios';
import { CATEGORY_LIST } from '../constants/category-list';

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
        {error && <div>{error}</div>}
    </label>
  )
}