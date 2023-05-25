import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';
import IsRequired from './IsRequired';

interface PhoneNumberProps {
    disabled: boolean;
    value: string;
    placeholder: string;
    required: boolean;
    onChange: (phoneNumber: string) => void;
}

const PhoneNumber = ({
    disabled, value, placeholder, required, onChange,
}: PhoneNumberProps) => {

    const prevValue = useRef(value);

    const [htmlId] = useState(() => Math.random().toString());

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // const text = e.target.value;
        // const reg = /^(?:[0-9]+(?:\.[0-9]{0,2})?)?$/;
        // if (reg.test(text)) {
        //     onChange(e);
        // }

        let value = e.target.value;

        console.log(`'${value}', '${prevValue.current}'`);

        // if (value.trim().endsWith(')') || value.endsWith('-')) {
        //     value = value.trim().slice(1, value.length - 2);
        // }

        let numbers = [...value]
            .filter((e, idx) => !isNaN(parseInt(e)));

        if (numbers.length > 10) {
            numbers = numbers.slice(0, 10);
        }

        if (value.endsWith(')') ||
            ((prevValue.current.length > value.length) && prevValue.current.endsWith('-'))) {
            console.log(43, numbers);
            numbers = numbers.slice(0, numbers.length - 1);
            console.log(45, numbers);
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
                console.log(60, numbers.length);
                formattedVal.push('-');
            }
        }

        // if (value.length === 1) {
        //     value = `(${value}`
        // }

        // if (value.length === 4) {
        //     value = `${value}) `;
        // }

        prevValue.current = formattedVal.join('');

        onChange(prevValue.current);
    }

    const handleKeyDown = (e: KeyboardEvent) => {

        //const target = e.target as HTMLInputElement;
        //let value = target.value;

        if (isNaN(parseInt(e.key)) && ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].indexOf(e.key) === -1) {
            e.preventDefault();
            return;
        }

        // if (e.key === 'Backspace' && value.length > 0 && target.selectionStart && target.selectionStart > 0) {
        //     value = `${value.slice(0, target.selectionStart - 1)}${value.slice(target.selectionStart)}`;

        //     if (value === '(') {
        //         value = '';
        //     }

        //     if (value.endsWith(') ')) {
        //         console.log('')
        //         value = value.substring(0, 4);
        //     }

        //     onChange(value);
        //     return;
        // }

        // if (value.length === 0) {
        //     onChange(`(${e.key}`)
        //     return;
        // }

        // if (value.length === 3) {
        //     onChange(`${value}${e.key}) `)
        //     return;
        // }

        // if (value.length === 8) {
        //     onChange(`${value}${e.key}-`)
        //     return;
        // }

        // if (e.key === 'Delete' || e.key === 'Backspace') {
        //     if (value.endsWith(') ')) {
        //         onChange(value.substring(0, 3));
        //     }
        // }

        // onChange(`${value}${e.key}`);
    }

    return (
        <div className='form-floating mb-0'>
            <input type='text'
                id={htmlId}
                className={`numeric-input form-control ${required !== undefined && required ? 'is-required' : ''}`}
                disabled={disabled}
                value={value}
                placeholder={placeholder}
                onPaste={() => {
                    return false;
                }}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            {
                required &&
                <div className="invalid-feedback">
                    Please enter this field
                </div>
            }
            <label htmlFor={htmlId}>
                {placeholder}
                {
                    required && <IsRequired />
                }
            </label>

        </div>
    )
};

export default PhoneNumber
