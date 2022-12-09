import React, { ReactElement, useEffect, } from 'react';
import { FormType } from '../App';
import './FormButtons.css';

interface FormButtonsProps {
    onFormSelected: (formType: FormType) => void;
}

//const classesString = 'col-button col col-xl-2 col-lg-4 col-md-4 col-sm-6 col-xs-12';

const FormButtons = (props: FormButtonsProps): ReactElement => {

    useEffect(() => {
        // window.addEventListener('resize', () => {
        //     setSpacer(window.innerWidth < 1200 && window.innerWidth > 400 ? false : false);
        // });
    }, []);

    /*
    
    */
    return (
        <>
            <div className='container-fluid dbm-form-container'>
                <div className='row mb-5' style={{
                    fontWeight: 600,
                }}>
                    <div className='col-button col dbm-gohome-button'>
                        <input type='button' value='Go back to DBM Home' className='btn btn-success' onClick={() => {
                            window.location.href = 'https://www.dbmlaw.ca';
                        }} />
                    </div>

                </div>
                <div className="dbm-form-buttons-parent">
                    <div className='row gy-3 justify-content-center dbm-form-buttons-container'>
                        <div className='col-button col dbm-form-button'>
                            <input type='button' value='Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('PURCHASE')} />
                        </div>

                        <div className='col-button col dbm-form-button'>
                            <input type='button' value='Sale' className='btn btn-primary form-button' onClick={() => props.onFormSelected('SALE')} />
                        </div>

                        <div className='col-button col dbm-form-button'>
                            <input type='button' value='Refinance' className='btn btn-primary form-button' onClick={() => props.onFormSelected('REFINANCE')} />
                        </div>

                        <div className='col-button col dbm-form-button'>
                            <input type='button' value='Sale and Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('SALE_AND_PURCHASE')} />
                        </div>

                        <div className='col-button col dbm-form-button'>
                            <input type='button' value='Project Purchase' className='btn btn-primary form-button' onClick={() => props.onFormSelected('PROJECT_PURCHASE')} />
                        </div>
                    </div>
                </div>

            </div>

        </>
    );
}

export default FormButtons;