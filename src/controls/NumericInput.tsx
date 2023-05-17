import { ChangeEvent, useState } from 'react';

interface NumericInputProps {
    id: string;
    disabled: boolean;
    value: string;
    placeholder?: string;
    required: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NumericInput = (props: NumericInputProps) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        const reg = /^(?:[0-9]+(?:\.[0-9]{0,2})?)?$/;
        if (reg.test(text)) {
            props.onChange(e);
        }
    }

    return (
        <input type='text'
            className={`numeric-input form-control ${props.required !== undefined && props.required ? 'is-required' : ''}`}
            id={props.id}
            disabled={props.disabled}
            value={props.value}
            placeholder={props.placeholder}
            pattern="/^(?:[0-9]+(?:\.[0-9]{0,2})?)?$/"
            onChange={handleChange}
        />
    )
};

export default NumericInput

