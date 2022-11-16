import React, { ReactElement, useEffect, useState } from 'react';
import { FormType } from './App';

interface FormButtonsProps {
    onFormSelected: (formType: FormType) => void;
}

const classesString = 'col-button col col-xl-2 col-lg-4 col-md-4 col-sm-6'

const FormButtons = (props: FormButtonsProps): ReactElement => {

    const [spacer, setSpacer] = useState(() =>
        window.innerWidth < 1200 && window.innerWidth > 536 ? true : false);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setSpacer(window.innerWidth < 1200 && window.innerWidth > 536 ? true : false);
        });
    }, []);

    /*
    
    */
    return (
        <>
            <div className='container-fluid'>
                <div className='row gy-3 justify-content-center'>
                    <div className={classesString}>
                        <input type='button' value='Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('PURCHASE')} />
                    </div>

                    <div className={classesString}>
                        <input type='button' value='Sale' className='btn btn-primary form-button' onClick={() => props.onFormSelected('SALE')} />
                    </div>

                    <div className={classesString}>
                        <input type='button' value='Re-Finance' className='btn btn-primary form-button' onClick={() => props.onFormSelected('REFINANCE')} />
                    </div>

                    <div className={classesString}>
                        <input type='button' value='Sale and Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('SALE_AND_PURCHASE')} />
                    </div>

                    <div className={classesString}>
                        <input type='button' value='Project Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('PROJECT_PURCHASE')} />
                    </div>

                    {
                        spacer &&
                        <div className={classesString}>
                            <span> </span>
                        </div>
                    }

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