import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { ClientInfo } from './ClassesInterfaces';

interface ClientProps {
    text: string;
    num: number;
    clientInfo: ClientInfo;
    updated: (c: ClientInfo, idx: number) => void;
}

const Client = (props: ClientProps): ReactElement => {

    const [clientInfo, setClientInfo] = useState(props.clientInfo);

    useEffect(() => {
        props.updated(clientInfo, props.num);
        // eslint-disable-next-line
    }, [clientInfo]);

    return (
        <>
            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        Contact information - {props.text} {props.num + 1}
                    </h6>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='client' placeholder={`${props.text} ${props.num + 1} full legal name`}
                            value={clientInfo.fullLegalName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, fullLegalName: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            {`${props.text} ${props.num + 1} full legal name`}
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
                        <input type='email' className='form-control' id='email' placeholder='Email address'
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
                        <input type='date' className='form-control' id='dob' placeholder='Date of birth'
                            value={clientInfo.dateOfBirth.toISOString().split('T')[0]}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, dateOfBirth: new Date(e.target.value) });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            Date of birth
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='number' className='form-control' id='sin' placeholder='Social Insurance Number'
                            value={clientInfo.socialInsNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, socialInsNumber: e.target.value });
                            }} />
                        <label htmlFor='floatingInput'>
                            Social Insurance Number
                        </label>
                    </div>
                    <div>
                        <input type='checkbox' id={`chksin${props.num.toString()}`} checked={clientInfo.sinViaPhone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, sinViaPhone: e.target.checked });
                            }} />
                        <label htmlFor={`chksin${props.num.toString()}`}>
                            &nbsp;&nbsp;I will provide later via phone
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        Your current address
                    </h6>
                </div>
            </div>


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
                        <input type='text' className='form-control' id='employeroccupation' placeholder='Your occupation'
                            value={clientInfo.occupation}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, occupation: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            Your occupation
                        </label>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='employername' placeholder='Employer name'
                            value={clientInfo.employerName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, employerName: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            Employer name
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
                            B.C. Provincial Nominee (we will require a copy of your B.C. Provincial Nominee confirmation)
                        </label>
                    </div>

                </div>
            </div>



            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6 className='pb-3'>
                        Are you a First-time Home Buyer?
                    </h6>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`firsttimehomebuyer${props.num}`} id={`firsttimehomebuyer-yes${props.num}`}
                            checked={clientInfo.isFirstTimeHomeBuyer === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, isFirstTimeHomeBuyer: 'YES' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor={`firsttimehomebuyer-yes${props.num}`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`firsttimehomebuyer${props.num}`} id={`firsttimehomebuyer-no${props.num}`}
                            checked={clientInfo.isFirstTimeHomeBuyer === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, isFirstTimeHomeBuyer: 'NO' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`firsttimehomebuyer-no${props.num}`}>
                            No
                        </label>
                    </div>
                </div>



                <div className="col mb-1 mt-4">
                    <h6>
                        Will you be living in the property within three months?
                    </h6>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`livewithinthreemonths${props.num}`} id={`livewithinthreemonths-yes${props.num}`}
                            checked={clientInfo.willBeLivingInPropertyWithinThreeMonths === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, willBeLivingInPropertyWithinThreeMonths: 'YES' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`livewithinthreemonths-yes${props.num}`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`livewithinthreemonths${props.num}`} id={`livewithinthreemonths-no${props.num}`}
                            checked={clientInfo.willBeLivingInPropertyWithinThreeMonths === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, willBeLivingInPropertyWithinThreeMonths: 'NO' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`livewithinthreemonths-no${props.num}`}>
                            No
                        </label>
                    </div>
                </div>

            </div>



            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        Have you been a resident of BC for at least a year?
                    </h6>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`residentbc${props.num}`} id={`residentbc-yes${props.num}`}
                            checked={clientInfo.isFirstTimeHomeBuyer === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, hasBeenBCResidentForAYear: 'YES' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor={`residentbc-yes${props.num}`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`residentbc${props.num}`} id={`residentbc-no${props.num}`}
                            checked={clientInfo.isFirstTimeHomeBuyer === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, hasBeenBCResidentForAYear: 'NO' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`residentbc-no${props.num}`}>
                            No
                        </label>
                    </div>
                </div>



                <div className="col mb-1 mt-4">
                    <h6>
                        Have you ever owned a principal residence anywhere in the world?
                    </h6>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`principalresidenceworld${props.num}`} id={`principalresidenceworld-yes${props.num}`}
                            checked={clientInfo.hasOwnedPrincipalResidenceSomewhere === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, hasOwnedPrincipalResidenceSomewhere: 'YES' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`principalresidenceworld-yes${props.num}`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`principalresidenceworld${props.num}`} id={`principalresidenceworld-no${props.num}`}
                            checked={clientInfo.hasOwnedPrincipalResidenceSomewhere === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setClientInfo({ ...clientInfo, hasOwnedPrincipalResidenceSomewhere: 'NO' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`principalresidenceworld-no${props.num}`}>
                            No
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

export default Client;