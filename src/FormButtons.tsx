import React, { ReactElement } from 'react';
import { FormType } from './App';

interface FormButtonsProps {
    onFormSelected: (formType: FormType) => void;
}


const FormButtons = (props: FormButtonsProps): ReactElement => {

    return (
        <div style={{
            width: '100%',
            padding: '50px 20% 0',
            boxSizing: 'border-box',
        }}>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto auto auto',
                    columnGap: '100px',
                    rowGap: '50px',
                    width: '50%',
                    textAlign: 'left',
                }}>

                <div style={{
                    flexGrow: '1',
                }}>
                    <input type='button' value='Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('PURCHASE')} />
                </div>

                <div style={{
                    flexGrow: '1',
                }}>
                    <input type='button' value='Sale' className='btn btn-primary form-button' onClick={() => props.onFormSelected('SALE')} />
                </div>

                <div style={{
                    flexGrow: '1',
                }}>
                    <input type='button' value='Re-Finance' className='btn btn-primary form-button' onClick={() => props.onFormSelected('REFINANCE')} />
                </div>

                <div style={{
                    flexGrow: '1',
                }}>
                    <input type='button' value='Purchase and Sale' className='btn btn-primary form-button' onClick={() => props.onFormSelected('PURCHASE_AND_SALE')} />
                </div>

                <div style={{
                    flexGrow: '1',
                }}>
                    <input type='button' value='Project Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('PROJECT_PURCHASE')} />
                </div>

            </div>

        </div>
    );
}

export default FormButtons;