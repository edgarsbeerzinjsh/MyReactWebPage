import React from 'react'

type FilterProps = {
    options: string[];
    label: string;
    onChange: (value: string) => void;
}

export const Filter = ({ options, label, onChange }: FilterProps) => {
  return (
    <label>
        {label}
        <input
            onChange={(e)=>{
                onChange(e.target.value)
            }}    
        >

        </input>
    </label>
  )
}