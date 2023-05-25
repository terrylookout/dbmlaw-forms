import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import IsRequired from './IsRequired';

interface PhoneNumberProps {
    disabled?: boolean;
    value: string;
    placeholder?: string;
    required?: boolean;
    onChange: (phoneNumber: string) => void;
}

const PhoneNumber = ({
    disabled, value, placeholder, required, onChange,
}: PhoneNumberProps) => {

    const prevValue = useRef(value);

    const [htmlId] = useState(() => Math.random().toString());

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        let value = e.target.value;

        let numbers = [...value]
            .filter((e, idx) => !isNaN(parseInt(e)));

        if (numbers.length > 10) {
            numbers = numbers.slice(0, 10);
        }

        if (value.endsWith(')') ||
            ((prevValue.current.length > value.length) && prevValue.current.endsWith('-'))) {
            numbers = numbers.slice(0, numbers.length - 1);
        }

        const formattedVal: string[] = [];

        if (numbers.length > 0) {
            formattedVal.push('(');
        }

        for (let i = 0; i < numbers.length; i++) {
            formattedVal.push(numbers[i].toString());
            if (i === 2 && numbers.length > 2) {
                formattedVal.push(') ');
            }
            if (i === 5 && numbers.length > 5) {
                formattedVal.push('-');
            }
        }

        prevValue.current = formattedVal.join('');

        onChange(prevValue.current);
    }

    const handleKeyDown = (e: KeyboardEvent) => {

        if (isNaN(parseInt(e.key)) && ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].indexOf(e.key) === -1) {
            e.preventDefault();
            return;
        }
    }

    return (
        <div className='form-floating mb-0'>
            <input type='text'
                id={htmlId}
                className={`phone-input form-control ${required !== undefined && required ? 'is-required' : ''}`}
                disabled={disabled !== undefined ? disabled : false}
                value={value}
                placeholder={placeholder ? placeholder : 'Phone number'}
                onPaste={() => {
                    return false;
                }}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {
                (required !== undefined && required) &&
                <div className="invalid-feedback">
                    Please enter this field
                </div>
            }
            <label htmlFor={htmlId}>
                {placeholder ? placeholder : 'Phone number'}
                {
                    required && <IsRequired />
                }
            </label>

        </div>
    )
};

export default PhoneNumber
