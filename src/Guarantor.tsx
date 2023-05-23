import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import CircleBullet from './controls/CircleBullet';
import { GuarantorInfo } from './ClassesInterfaces';
import IsRequired from './controls/IsRequired';

interface GuarantorProps {
    text: string;
    num: number;
    numberOfPurchasers: number;
    guarantorInfo: GuarantorInfo;
    updated: (c: GuarantorInfo, idx: number) => void;
}

const Guarantor = (props: GuarantorProps): ReactElement => {

    const [guarantorInfo, setGuarantorInfo] = useState(props.guarantorInfo);

    useEffect(() => {
        props.updated(guarantorInfo, props.num);
        // eslint-disable-next-line
    }, [guarantorInfo]);

    return (
        <>
            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Guarantor information - {props.text} {props.num + 1}
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control is-required' id={`guarantorname${props.num}`} placeholder={`${props.text} ${props.num + 1} full legal name`}
                            value={guarantorInfo.fullLegalName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setGuarantorInfo({ ...guarantorInfo, fullLegalName: e.target.value });
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
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='tel' className='form-control is-required' id={`guarantorphone${props.num}`} placeholder='Phone number'
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={guarantorInfo.phoneNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setGuarantorInfo({ ...guarantorInfo, phoneNumber: e.target.value });
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

                        <input type='email' className='form-control' id={`guarantoremail${props.num}`} placeholder='Email'
                            value={guarantorInfo.emailAddress}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setGuarantorInfo({ ...guarantorInfo, emailAddress: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            Email
                        </label>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='email' className='form-control' id={`guarantorrelationship${props.num}`} placeholder='Relationship'
                            value={guarantorInfo.relationship}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setGuarantorInfo({ ...guarantorInfo, relationship: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            {`Relationship to Purchaser${props.numberOfPurchasers > 1 ? 's' : ''}`}
                        </label>

                    </div>
                </div>
            </div>


        </>
    )

};

export default Guarantor;