import { ChangeEvent } from 'react';
import IsRequired from './IsRequired';

interface NumericInputProps {
    id: string;
    disabled: boolean;
    value: string;
    placeholder: string;
    required: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NumericInput = (props: NumericInputProps) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const text = e.target.value;
        const reg = /^(?:[0-9]+(?:\.[0-9]{0,2})?)?$/;
        if (reg.test(text)) {
            props.onChange(e);
        }
    }

    return (
        <div className='form-floating mb-0'>
            <input
                type='text'
                className={`numeric-input form-control ${props.required !== undefined && props.required ? 'is-required' : ''}`}
                id={props.id}
                disabled={props.disabled}
                value={props.value}
                placeholder={props.placeholder}
                onChange={handleChange}
            />
            {
                props.required &&
                <div className="invalid-feedback">
                    Please enter this field
                </div>
            }
            <label htmlFor={props.id}>
                {props.placeholder}
                {
                    props.required && <IsRequired />
                }
            </label>

        </div>
    )
};

export default NumericInput

