import { ChangeEvent, ReactElement, useEffect, useState } from "react";


interface DateInputProps {
    id?: string;
    value: null | Date;
    onChange: (e: Date) => void;
    className?: string;
    min?: Date;
    max?: Date;
    label?: string;
}

const DateInput = (props: DateInputProps): ReactElement => {

    const [dateValue, setDateValue] = useState<null | Date>(props.value);
    const [invalid, setInvalid] = useState(false);

    useEffect(() => {
        if (dateValue) {
            props.onChange(dateValue);
        }
        // eslint-disable-next-line
    }, [dateValue,]);

    return (
        <>
            <input
                id={props.id}
                type='date'
                className={props.className}
                value={dateValue && dateValue.getFullYear() < 9999 ? dateValue.toISOString().split('T')[0] : ''}
                min={props.min ? props.min.toISOString().split('T')[0] : undefined}
                max={props.max ? props.max.toISOString().split('T')[0] : undefined}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {

                    if (e && e.target && e.target.value) {
                        const date = new Date(e.target.value);
                        if (date instanceof Date) {
                            setInvalid(false);
                            setDateValue(date);
                        }
                    }
                }}
                onBlur={(e) => {
                    if (e && e.target && e.target.value) {
                        const date = new Date(e.target.value);
                        if (date instanceof Date) {
                            if ((props.max && date.getTime() > props.max.getTime()) ||
                                (props.min && date.getTime() < props.min.getTime())) {
                                setInvalid(true);
                                setDateValue(props.value);
                            }

                        }
                    }
                }}
            />
            {
                props.label &&
                <label htmlFor={props.id}
                    style={{
                        color: invalid ? '#990000' : undefined,
                    }}
                >
                    {
                        `${props.label}${invalid ? ' - date is invalid' : ''}`
                    }
                </label>

            }
        </>
    )
};

export default DateInput;