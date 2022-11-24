import React, { ChangeEvent, ReactElement, useEffect, useRef, useState } from 'react';
import CircleBullet from './CircleBullet';
import { ClientInfo } from '../ClassesInterfaces';
import { getCountries, getProvincesTerritories, getStates } from '../Helpers';

interface BorrowerProps {
    text: string;
    num: number;
    client1Info: ClientInfo | null;
    clientInfo: ClientInfo;
    company: boolean;
    updated: (c: ClientInfo, idx: number) => void;
}

const Owner = (props: BorrowerProps): ReactElement => {

    const provinceSelect = useRef<HTMLSelectElement>(null);

    const [countries] = useState<string[]>(() => {
        return getCountries();
    });

    const [provinces, setProvinces] = useState<string[]>([]);

    const [clientInfo, setClientInfo] = useState(props.clientInfo);
    useEffect(() => {
        //
    }, []);

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
                        <input type='text' className='form-control is-required' id={`clientname${props.num}`} placeholder={`${props.text} ${props.num + 1} full legal name`}
                            value={clientInfo.fullLegalName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, fullLegalName: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please enter the full legal name.
                        </div>
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
                        <input type='tel' className='form-control is-required' id={`phone${props.num}`} placeholder='Phone number'
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={clientInfo.phoneNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setClientInfo({ ...clientInfo, phoneNumber: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please enter the phone number.
                        </div>

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
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Is your address the same as mortgaged/subject property?
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

            {
                clientInfo.addressSameAsProperty === 'NO' &&
                <>
                    <div className="row align-items-center mt-4">
                        <div className="col mb-1">
                            <h6>
                                <CircleBullet />Your current address
                            </h6>
                        </div>

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
                                    Please enter the street 1 address
                                </div>

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
                                <input type='text' className='form-control is-required' id='mailingcity' placeholder='City'
                                    value={clientInfo.mailingCity}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setClientInfo({ ...clientInfo, mailingCity: e.target.value });
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Please enter the city.
                                </div>

                                <label htmlFor='floatingInput'>
                                    City
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
                                    provinces.map((p, idx) => {
                                        return (
                                            <option
                                                key={idx}
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
                                    {
                                        countries.map((c, idx) => {
                                            return (
                                                <option
                                                    key={idx}
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

        </>
    )

};

export default Owner;