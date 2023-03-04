import { ReactElement, useEffect, useState } from "react";
import { DayPicker } from 'react-day-picker';

interface DateInputProps {
    id?: string;
    value: Date | null;
    onChange: (e: Date) => void;
    className?: string;
    min?: Date;
    max?: Date;
    label?: string;
}

const DeleteDate = (props: {
    visible: boolean;
    onClearDate: () => void;
}): ReactElement => {

    return (

        props.visible ?
            <span style={{
                position: 'absolute',
                top: '16px',
                right: '10px',
                cursor: 'pointer',
            }} title='Click to remove date'
                onClick={props.onClearDate}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
            </span>
            : <></>

    );
};

const DateInput = (props: DateInputProps): ReactElement => {

    const [dateValue, setDateValue] = useState<Date | null>(props.value);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (dateValue) {
            props.onChange(dateValue);
        }
        // eslint-disable-next-line
    }, [dateValue]);

    useEffect(() => {
        setDateValue(props.value);
    }, [props.value]);

    useEffect(() => {
        if (isOpen) {
            const d = document.querySelector('.rdp');
            if (d) {
                d.scrollIntoView(false);
            }
        }
    }, [isOpen]);

    return (
        <>
            <div className='form-floating mb-0'>
                <input type='text' className='form-control' id={`${props.id}`}
                    value={dateValue ? dateValue.toISOString().split('T')[0] : ''}
                    readOnly={true}
                    onClick={() => {
                        //if (dateValue) {
                        setIsOpen(!isOpen);
                        //}
                    }}
                />

                {
                    props.label &&
                    <label htmlFor='floatingInput'>
                        {`${props.label}`}
                    </label>
                }

                <DeleteDate
                    visible={dateValue !== null}
                    onClearDate={() => setDateValue(null)}
                />

                {
                    isOpen &&
                    <DayPicker
                        selected={dateValue ? dateValue : undefined}
                        mode='single'
                        captionLayout='dropdown'
                        fromYear={1900}
                        toYear={2030}
                        onSelect={(e) => {
                            setIsOpen(!isOpen);
                            if (e) {
                                setDateValue(e);
                            }
                        }
                        }
                        style={{
                            position: 'absolute',
                            zIndex: '1',
                            backgroundColor: '#fff',
                            border: '1px solid #bbb',
                            borderRadius: '12px',
                        }}
                    />

                }
            </div>
        </>
    )
};

export default DateInput;