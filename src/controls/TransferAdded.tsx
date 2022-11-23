import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import CircleBullet from './CircleBullet';
import { ClientInfo, RefinanceInfo } from '../ClassesInterfaces';
import DateInput from './DateInput';

interface TransferAddedProps {
    text: string;
    num: number;
    refinanceInfo: RefinanceInfo;
    updated: (c: ClientInfo, idx: number) => void;
}

const TransferAdded = (props: TransferAddedProps): ReactElement => {

    const [clientInfo, setClientInfo] = useState(props.refinanceInfo.clientsAddedInfo[props.num]);

    useEffect(() => {
        props.updated(clientInfo, props.num);
        // eslint-disable-next-line
    }, [clientInfo]);

    return (
        <>
            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />Contact information - {props.text} {props.num + 1}
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id={`clientname${props.num}`} placeholder={`${props.text} ${props.num + 1} full legal name`}
                            value={clientInfo.fullLegalName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, fullLegalName: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            {`${props.text} ${props.num + 1} full legal name - required`}
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
                        <input type='tel' className='form-control' id={`phone${props.num}`} placeholder='Phone number'
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={clientInfo.phoneNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, phoneNumber: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            Phone number - format: 123-456-7890
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='email' className='form-control' id={`email${props.num}`} placeholder='Email address'
                            value={clientInfo.emailAddress}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, emailAddress: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            Email address
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <DateInput
                            className='form-control'
                            id={`dob${props.num}`}
                            value={clientInfo.dateOfBirth}
                            max={new Date()}
                            label='Date of birth'
                            onChange={(e) => {
                                if (e) {
                                    setClientInfo({ ...clientInfo, dateOfBirth: e })
                                }

                            }} />

                    </div>
                </div>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='number' className='form-control' id={`sin${props.num}`} placeholder='Social Insurance Number'
                            disabled={clientInfo.sinViaPhone}
                            value={clientInfo.sinViaPhone ? '' : clientInfo.socialInsNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, socialInsNumber: e.target.value });
                            }} />
                        <label htmlFor='floatingInput'>
                            Social Insurance Number
                        </label>
                    </div>
                    <div className='d-flex flex-nowrap pt-2'>
                        <input type='checkbox' id={`chksin${props.num.toString()}`} checked={clientInfo.sinViaPhone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, sinViaPhone: e.target.checked });
                                // if (e.target.checked) {
                                //     setClientInfo({ ...clientInfo, socialInsNumber: '' });
                                // }
                            }} />
                        <label htmlFor={`chksin${props.num.toString()}`} className='ps-2'>
                            I will provide later via phone
                        </label>
                    </div>
                </div>
            </div>


            <div className="row align-items-center mt-4">
                <div className="row">
                    <div className="col mb-1 mt-4">
                        <h6>
                            <CircleBullet />
                            Is your address the same as mortgage property?
                        </h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={`addresssame${props.num}`} id={`addresssame-yes${props.num}`}
                                checked={clientInfo.addressSameAsProperty === 'YES'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e && e.target && e.target.value && e.target.value === 'on') {
                                        setClientInfo({ ...clientInfo, addressSameAsProperty: 'YES' });
                                    }
                                }} />
                            <label className="form-check-label" htmlFor={`addresssame-yes${props.num}`}>
                                Yes
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={`addresssame${props.num}`} id={`addresssame-no${props.num}`}
                                checked={clientInfo.addressSameAsProperty === 'NO'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e && e.target && e.target.value && e.target.value === 'on') {
                                        setClientInfo({ ...clientInfo, addressSameAsProperty: 'NO' });
                                    }
                                }} />
                            <label className="form-check-label" htmlFor={`addresssame-no${props.num}`}>
                                No
                            </label>
                        </div>
                    </div>
                </div>
            </div>


            {
                clientInfo.addressSameAsProperty === 'NO' &&
                <>
                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='mailingstreet1' placeholder='Street address line 1'
                                    value={clientInfo.mailingStreet1}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, mailingStreet1: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Street address line 1
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='mailingstreet2' placeholder='Street address line 2'
                                    value={clientInfo.mailingStreet2}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, mailingStreet2: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Street address line 2
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='mailingcity' placeholder='City'
                                    value={clientInfo.mailingCity}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, mailingCity: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    City
                                </label>
                            </div>
                        </div>
                        <div className="col mb-3">
                            <select className="form-select p-3" aria-label="Province or territory"
                                value={clientInfo.mailingProvinceTerritory}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    setClientInfo({ ...clientInfo, mailingProvinceTerritory: e.target.value });
                                }}
                            >
                                <option value='0'>Province or territory</option>
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
                                <input type='text' className='form-control' id='mailingpostalcode' placeholder='Postal code'
                                    value={clientInfo.mailingPostalCode}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, mailingPostalCode: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Postal code
                                </label>
                            </div>
                        </div>
                        <div className="col mb-3">

                        </div>
                    </div>


                </>
            }
            <div className="row">
                <div className={`col mb-1 mt-4 employment-header${props.num}`} >
                    <h6>
                        <CircleBullet />
                        Relationship
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='relationship' placeholder='relationship'
                            value={clientInfo.relationship}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, relationship: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            Relationship to Seller/Vendor/Transferor
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className={`col mb-1 mt-4 employment-header${props.num}`} >
                    <h6>
                        <CircleBullet />
                        Employment Information (required)
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`employ${props.num}`} id={`employed${props.num}`}
                            checked={clientInfo.employment === 'EMPLOYED'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, employment: 'EMPLOYED' });
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`employed${props.num}`}>
                            Employed
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`employ${props.num}`} id={`retired${props.num}`}
                            checked={clientInfo.employment === 'RETIRED'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, employment: 'RETIRED' });
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`retired${props.num}`}>
                            Retired
                        </label>
                    </div>

                </div>

                <div className="col mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`employ${props.num}`} id={`student${props.num}`}
                            checked={clientInfo.employment === 'STUDENT'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, employment: 'STUDENT' });
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`student${props.num}`}>
                            Student
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`employ${props.num}`} id={`other${props.num}`}
                            checked={clientInfo.employment === 'OTHER'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, employment: 'OTHER' });
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`other${props.num}`}>
                            Other
                        </label>
                    </div>

                </div>

                <div className="col mb-3">

                </div>

            </div>

            {
                clientInfo.employment === 'EMPLOYED' &&
                <>
                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id={`employeroccupation${props.num}`} placeholder='Your occupation - required'
                                    value={clientInfo.occupation}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, occupation: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Your occupation (required)
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id={`employername${props.num}`} placeholder='Employer name - required'
                                    value={clientInfo.employerName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, employerName: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Employer name (required)
                                </label>
                            </div>
                        </div>
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='tel' className='form-control' id='employerphone' placeholder='Phone number'
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    value={clientInfo.employerPhone}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, employerPhone: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Phone number - format: 123-456-7890
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='employerstreet1' placeholder='Street address line 1'
                                    value={clientInfo.employerStreet1}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, employerStreet1: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Street address line 1
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='employerstreet2' placeholder='Street address line 2'
                                    value={clientInfo.employerStreet2}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, employerStreet2: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Street address line 2
                                </label>
                            </div>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='employercity' placeholder='City'
                                    value={clientInfo.employerCity}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, employerCity: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    City
                                </label>
                            </div>
                        </div>
                        <div className="col mb-3">
                            <select className="form-select p-3" aria-label="Province or territory"
                                value={clientInfo.employerProvinceTerritory}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    setClientInfo({ ...clientInfo, employerProvinceTerritory: e.target.value });
                                }}
                            >
                                <option value='0'>Province or territory</option>
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
                                <input type='text' className='form-control' id='employerpostalcode' placeholder='Postal code'
                                    value={clientInfo.employerPostalCode}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, employerPostalCode: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Postal code
                                </label>
                            </div>
                        </div>
                        <div className="col mb-3">

                        </div>
                    </div>
                </>
            }

            {
                clientInfo.addressSameAsProperty === 'YES' &&
                <>

                    <div className="row">
                        <div className={`col mb-1 mt-4 employment-header${props.num}`} >
                            <h6>
                                <CircleBullet />
                                Time at property
                            </h6>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='timelivingproperty' placeholder='Time in Property'
                                    value={clientInfo.timeLivingAtProperty}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, timeLivingAtProperty: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    How long have you lived in the property? Ie '2 years, 3 months'
                                </label>
                            </div>
                        </div>
                    </div>

                </>
            }

            <div className="row">
                <div className={`col mb-1 mt-4 citizenship-header${props.num}`}>
                    <h6>
                        <CircleBullet />
                        Citizenship (required)
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`citizentype${props.num}`} id={`canadiancitizen${props.num}`}
                            checked={clientInfo.citizenShip === 'CANADIAN_CITIZEN'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, citizenShip: 'CANADIAN_CITIZEN' });
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`canadiancitizen${props.num}`}>
                            Canadian citizen
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`citizentype${props.num}`} id={`permresident${props.num}`}
                            checked={clientInfo.citizenShip === 'PERMANENT_RESIDENT'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, citizenShip: 'PERMANENT_RESIDENT' });
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`permresident${props.num}`}>
                            Permanent resident
                        </label>
                    </div>
                </div>
                <div className="col mb-3">

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`citizentype${props.num}`} id={`residentother${props.num}`}
                            checked={clientInfo.citizenShip === 'RESIDENT_OTHER_COUNTRY'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, citizenShip: 'RESIDENT_OTHER_COUNTRY' });
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`residentother${props.num}`}>
                            Resident of country other than Canada
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`citizentype${props.num}`} id={`bcprovincialnominee${props.num}`}
                            checked={clientInfo.citizenShip === 'BC_PROV_NOMINEE'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, citizenShip: 'BC_PROV_NOMINEE' });
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`bcprovincialnominee${props.num}`}>
                            B.C. Provincial Nominee (requires confirmation)
                        </label>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="col mb-1 mt-4 border border-primary">

                </div>
            </div>


        </>
    )

};

export default TransferAdded;