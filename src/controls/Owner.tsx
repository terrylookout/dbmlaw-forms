import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import CircleBullet from './CircleBullet';
import { ClientInfo } from '../ClassesInterfaces';
import DateInput from './DateInput';

interface BorrowerProps {
    text: string;
    num: number;
    client1Info: ClientInfo | null;
    clientInfo: ClientInfo;
    company: boolean;
    updated: (c: ClientInfo, idx: number) => void;
}

const Owner = (props: BorrowerProps): ReactElement => {

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
    )

};

export default Owner;