import { ReactElement, useEffect, useState } from "react";
import { DayPicker } from 'react-day-picker';

interface DateInputProps {
    id?: string;
    value: Date;
    onChange: (e: Date) => void;
    className?: string;
    min?: Date;
    max?: Date;
    label?: string;
}

const DateInput = (props: DateInputProps): ReactElement => {

    const [dateValue, setDateValue] = useState<Date>(props.value);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (dateValue) {
            props.onChange(dateValue);
        }
        // eslint-disable-next-line
    }, [dateValue,]);

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
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                    onChange={() => {
                        //
                    }}
                />
                {
                    props.label &&
                    <label htmlFor='floatingInput'>
                        {`${props.label}`}
                    </label>
                }
                {
                    isOpen &&
                    <DayPicker
                        selected={dateValue}
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