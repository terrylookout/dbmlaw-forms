import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import CircleBullet from './CircleBullet';
import { ClientInfo } from '../ClassesInterfaces';
//import DateInput from './DateInput';
import { getCountries, getProvincesTerritories, getStates } from '../Helpers';
import RadioGroup from './RadioGroup';
import IsRequired from './IsRequired';

interface SellerProps {
    text: string;
    num: number;
    client1Info: ClientInfo | null;
    clientInfo: ClientInfo;
    company: boolean;
    updated: (c: ClientInfo, idx: number) => void;
}

const Seller = (props: SellerProps): ReactElement => {

    const provinceSelect = useRef<HTMLSelectElement>(null);

    const [countries] = useState<string[]>(() => {
        return getCountries();
    });

    const [provinces, setProvinces] = useState<string[]>([]);

    const [clientInfo, setClientInfo] = useState(props.clientInfo);

    useEffect(() => {
        props.updated(clientInfo, props.num);
        // eslint-disable-next-line
    }, [clientInfo]);

    useEffect(() => {
        switch (clientInfo.mailingCountry) {
            case 'Canada':
                setProvinces(getProvincesTerritories());
                break;

            case 'United States':
                setProvinces(getStates());
                break;

            default:
                setProvinces(['Not applicable']);
        }
    }, [clientInfo.mailingCountry]);

    return (
        <>
            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />Your Contact information - {props.text} {props.num + 1}
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control is-required' id={`clientname${props.num}`} placeholder={`${props.text} ${props.num + 1} full legal name`}
                            value={clientInfo.fullLegalName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, fullLegalName: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please enter this field
                        </div>
                        <label htmlFor='floatingInput'>
                            {`${props.text} ${props.num + 1} full legal name`}
                            <IsRequired />
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
                        <input type='tel' className='form-control is-required' id={`phone${props.num}`} placeholder='Phone number'
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={clientInfo.phoneNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, phoneNumber: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please enter this field
                        </div>
                        <label htmlFor='floatingInput'>
                            Phone number - format: 123-456-7890
                            <IsRequired />
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

            {
                // !props.company &&
                // <div className="row">
                //     <div className="col mb-3">
                //         <div className='form-floating mb-0'>
                //             <DateInput
                //                 className='form-control'
                //                 id={`dob${props.num}`}
                //                 value={clientInfo.dateOfBirth}
                //                 max={new Date()}
                //                 label='Date of birth'
                //                 onChange={(e) => {
                //                     if (e) {
                //                         setClientInfo({ ...clientInfo, dateOfBirth: e })
                //                     }

                //                 }} />

                //         </div>
                //     </div>
                //     <div className="col mb-3">
                //     </div>
                // </div>

            }
            <div className="row align-items-center mt-4">
                <div className="col mb-1">
                    <h6>
                        <CircleBullet />Mailing or forwarding address after date of completion
                    </h6>
                </div>

                {
                    (props.num > 0 && props.client1Info !== null) &&
                    <div className='col mb-1' style={{
                        textAlign: 'right',
                    }}>
                        <input type='button' className='btn btn-secondary' value={`Same as ${props.text} 1`} onClick={() => {
                            if (props.client1Info) {
                                setClientInfo({
                                    ...clientInfo,
                                    mailingStreet1: props.client1Info.mailingStreet1,
                                    mailingStreet2: props.client1Info.mailingStreet2,
                                    mailingCity: props.client1Info.mailingCity,
                                    mailingProvinceTerritory: props.client1Info.mailingProvinceTerritory,
                                    mailingPostalCode: props.client1Info.mailingPostalCode,
                                    mailingCountry: props.client1Info.mailingCountry,
                                });
                            }

                        }} />
                    </div>
                }
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control is-required' id='mailingstreet1' placeholder='Street address line 1'
                            value={clientInfo.mailingStreet1}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, mailingStreet1: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please enter this field
                        </div>
                        <label htmlFor='floatingInput'>
                            Street address line 1
                            <IsRequired />
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
                        <input type='text' className='form-control is-required' id='mailingcity' placeholder='City'
                            value={clientInfo.mailingCity}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, mailingCity: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please enter this field
                        </div>
                        <label htmlFor='floatingInput'>
                            City
                            <IsRequired />
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <select className="form-select p-3 is-required" aria-label="Province or territory"
                        ref={provinceSelect}
                        value={clientInfo.mailingProvinceTerritory}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setClientInfo({ ...clientInfo, mailingProvinceTerritory: e.target.value });
                        }}
                    >
                        {
                            provinces.map((p) => {
                                return (
                                    <option
                                        key={p}
                                        value={p}>
                                        {p}
                                    </option>
                                );
                            })
                        }
                    </select>
                    <div className="invalid-feedback">
                        Please enter this field
                    </div>
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
                        <div className="invalid-feedback">
                            Please enter this field
                        </div>
                        <label htmlFor='floatingInput'>
                            Postal code
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <select className='form-control' id='mailingcountry' placeholder='Country'
                            value={clientInfo.mailingCountry}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setClientInfo({ ...clientInfo, mailingCountry: e.target.value });
                                if (e.target.value !== 'Canada') {
                                    //
                                }
                            }}
                        >
                            <option key='not_selected' value={''} disabled={true} >
                                Choose country...
                            </option>
                            {
                                countries.map((c) => {
                                    return (
                                        <option
                                            key={c}
                                            value={c}>
                                            {c}
                                        </option>
                                    );
                                })
                            }
                        </select>
                        <label htmlFor='mailingcountry'>
                            Country
                        </label>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        At time of completion of the sale will you be a resident of Canada? <IsRequired />
                    </h6>
                </div>
            </div>

            <div className="row">
                <RadioGroup groupName="resident-of-canada-comp">
                    <div className="col mb-1">
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={`residentofcanada${props.num}`} id={`residentofcanada-yes${props.num}`}
                                checked={clientInfo.residentOfCanada === 'YES'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.checked) {
                                        setClientInfo({ ...clientInfo, residentOfCanada: 'YES' });
                                    }
                                }} />

                            <label className="form-check-label" htmlFor={`residentofcanada-yes${props.num}`}>
                                Yes
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name={`residentofcanada${props.num}`} id={`residentofcanada-no${props.num}`}
                                checked={clientInfo.residentOfCanada === 'NO'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.checked) {
                                        setClientInfo({ ...clientInfo, residentOfCanada: 'NO' });
                                    }
                                }} />

                            <label className="form-check-label" htmlFor={`residentofcanada-no${props.num}`}>
                                No
                            </label>
                        </div>
                    </div>
                </RadioGroup>
            </div>

            {
                clientInfo.residentOfCanada === 'NO' &&
                <div className="row">
                    <div className="col mt-2 mb-3">
                        <h6>
                            Please ensure you have contacted an Accountant to begin any paperwork that may be necessary due to non-residency
                        </h6>
                    </div>
                </div>
            }

            <div className="row">
                <div className="col mb-1 mt-4 border border-primary">

                </div>
            </div>

        </>
    )

};

export default Seller;