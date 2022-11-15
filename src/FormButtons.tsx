import React, { ReactElement } from 'react';
import { FormType } from './App';

interface FormButtonsProps {
    onFormSelected: (formType: FormType) => void;
}

const FormButtons = (props: FormButtonsProps): ReactElement => {

    return (
        <>
            <div className='container'>
                <div className='row gy-3 justify-content-center'>
                    <div className='col'>
                        <input type='button' value='Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('PURCHASE')} />
                    </div>

                    <div className='col'>
                        <input type='button' value='Sale' className='btn btn-primary form-button' onClick={() => props.onFormSelected('SALE')} />
                    </div>

                    <div className='col'>
                        <input type='button' value='Re-Finance' className='btn btn-primary form-button' onClick={() => props.onFormSelected('REFINANCE')} />
                    </div>

                    <div className='col'>
                        <input type='button' value='Sale and Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('SALE_AND_PURCHASE')} />
                    </div>

                    <div className='col'>
                        <input type='button' value='Project Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('PROJECT_PURCHASE')} />
                    </div>


                </div>

            </div>
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

                    </div>

                    <div style={{
                        flexGrow: '1',
                    }}>

                    </div>

                    <div style={{
                        flexGrow: '1',
                    }}>

                    </div>

                    <div style={{
                        flexGrow: '1',
                    }}>

                    </div>

                    <div style={{
                        flexGrow: '1',
                    }}>

                    </div>

                </div>

            </div>
        </>
    );
}

export default FormButtons;