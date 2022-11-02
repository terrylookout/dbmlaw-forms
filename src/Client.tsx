import React, { ReactElement, useState } from 'react';
import { FormType } from './App';

interface ClientProps {
    text: string;
}

const Client = (props: ClientProps): ReactElement => {

    return (
        <>

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        Contact information
                    </h6>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='client' placeholder={`${props.text} full legal name`} />
                        <label htmlFor='floatingInput'>
                            {`${props.text} full legal name`}
                        </label>
                    </div>
                    <div>
                        MUST MATCH PHOTO ID INCLUDING MIDDLE NAMES (IF APPLICABLE), extra fees will apply should we have to amend documents
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='tel' className='form-control' id='phone' placeholder='Phone number'
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                        <label htmlFor='floatingInput'>
                            Phone number - format: 123-456-7890
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='email' className='form-control' id='email' placeholder='Email address' />
                        <label htmlFor='floatingInput'>
                            Email address
                        </label>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='date' className='form-control' id='dob' placeholder='Date of birth'
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                        <label htmlFor='floatingInput'>
                            Date of birth
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='number' className='form-control' id='sin' placeholder='Social Insurance Number' />
                        <label htmlFor='floatingInput'>
                            Social Insurance Number
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        If you are not moving in, enter your mailing address
                    </h6>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='mailingstreet1' placeholder='Street address line 1' />
                        <label htmlFor='floatingInput'>
                            Street address line 1
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='mailingstreet2' placeholder='Street address line 2' />
                        <label htmlFor='floatingInput'>
                            Street address line 2
                        </label>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='mailingcity' placeholder='City' />
                        <label htmlFor='floatingInput'>
                            City
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <select className="form-select p-3" aria-label="Province or territory">
                        <option selected>Province or territory</option>
                        <option value="Alberta">Alberta</option>
                        <option value="British Columbia">British Columbia</option>
                        <option value="Manitoba">Manitoba</option>
                        <option value="New Brunswick">New Brunswick</option>
                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                        <option value="Northwest Territories">Northwest Territories</option>
                        <option value="Nova Scotia">Nova Scotia</option>
                        <option value="Nunavut">Nunavut</option>
                        <option value="Ontario">Ontario</option>
                        <option value="Prince Edward Island">Prince Edward Island</option>
                        <option value="Quebec">Québec</option>
                        <option value="Saskatchewan">Saskatchewan</option>
                        <option value="Yukon">Yukon</option>
                    </select>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='mailingpostalcode' placeholder='Postal code' />
                        <label htmlFor='floatingInput'>
                            Postal code
                        </label>
                    </div>
                </div>
                <div className="col mb-3">

                </div>
            </div>



            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        Employer Information
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='employeroccupation' placeholder='Your occupation' />
                        <label htmlFor='floatingInput'>
                            Your occupation
                        </label>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='employername' placeholder='Employer name' />
                        <label htmlFor='floatingInput'>
                            Employer name
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='tel' className='form-control' id='employerphone' placeholder='Phone number'
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                        <label htmlFor='floatingInput'>
                            Phone number - format: 123-456-7890
                        </label>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='employerstreet1' placeholder='Street address line 1' />
                        <label htmlFor='floatingInput'>
                            Street address line 1
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='employerstreet2' placeholder='Street address line 2' />
                        <label htmlFor='floatingInput'>
                            Street address line 2
                        </label>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='employercity' placeholder='City' />
                        <label htmlFor='floatingInput'>
                            City
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <select className="form-select p-3" aria-label="Province or territory">
                        <option selected>Province or territory</option>
                        <option value="Alberta">Alberta</option>
                        <option value="British Columbia">British Columbia</option>
                        <option value="Manitoba">Manitoba</option>
                        <option value="New Brunswick">New Brunswick</option>
                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                        <option value="Northwest Territories">Northwest Territories</option>
                        <option value="Nova Scotia">Nova Scotia</option>
                        <option value="Nunavut">Nunavut</option>
                        <option value="Ontario">Ontario</option>
                        <option value="Prince Edward Island">Prince Edward Island</option>
                        <option value="Quebec">Québec</option>
                        <option value="Saskatchewan">Saskatchewan</option>
                        <option value="Yukon">Yukon</option>
                    </select>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='employerpostalcode' placeholder='Postal code' />
                        <label htmlFor='floatingInput'>
                            Postal code
                        </label>
                    </div>
                </div>
                <div className="col mb-3">

                </div>
            </div>

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        Citizenship
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="citizentype" id="canadiancitizen" />
                        <label className="form-check-label" htmlFor="canadiancitizen">
                            Canadian citizen
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="citizentype" id="permresident" />
                        <label className="form-check-label" htmlFor="permresident">
                            Permanent resident
                        </label>
                    </div>

                </div>
            </div >


        </>
    )

};

export default Client;