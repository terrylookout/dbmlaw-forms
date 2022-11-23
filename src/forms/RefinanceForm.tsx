import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { ClientInfo, GuarantorInfo, RefinanceInfo } from '../ClassesInterfaces';

import CircleBullet from '../controls/CircleBullet';
import { FormProps, getEntry, getHeader, sendEmail } from '../Helpers';
import { SubmitConfirm, SubmitDone, Submitting } from '../controls/SubmitConfirm';
import Owner from '../controls/Owner';
import TransferAdded from '../controls/TransferAdded';
import Guarantor from '../Guarantor';
//import DateInput from '../controls/DateInput';

declare var bootstrap: any;

const RefinanceForm = (props: FormProps): ReactElement => {

    const [refinanceInfo, setRefinanceInfo] = useState<RefinanceInfo>(() => new RefinanceInfo());

    const [missingInfo, setMissingInfo] = useState(false);

    const [numberOfOwners, setNumberOfOwners] = useState(0);

    const [numberOfGuarantors, setNumberOfGuarantors] = useState(0);

    const [numberOfAdded, setNumberOfAdded] = useState(0);

    const [currentPage, setCurrentPage] = useState<
        'GET_PROPERTY_DETAILS' | 'GET_OWNERS' | 'GET_TRANSFER_INFORMATION' | 'GET_MORTGAGE_DETAILS' |
        'CONFIRM_SUBMIT' | 'SUBMITTING' | 'SUBMIT_RESULT'
    >('GET_PROPERTY_DETAILS');

    const checkPage = () => {
        //
        //
        switch (currentPage) {
            case 'GET_PROPERTY_DETAILS':
                setMissingInfo(false);
                setCurrentPage('GET_OWNERS');
                break;

            case 'GET_OWNERS':
                setMissingInfo(false);
                setCurrentPage('GET_TRANSFER_INFORMATION');
                break;

            case 'GET_TRANSFER_INFORMATION':
                setMissingInfo(false);
                setCurrentPage('GET_MORTGAGE_DETAILS');
                break;

            case 'GET_MORTGAGE_DETAILS':
                setMissingInfo(false);
                setCurrentPage('CONFIRM_SUBMIT');
                break;

        }



        // if (currentPage === 'GET_BORROWERS') {
        //     setMissingInfo(false);
        //     setCurrentPage('GET_PROPERTY_DETAILS')
        //     return;

        // }
        // else {
        //     // here we are good to submit
        //     setCurrentPage('CONFIRM_SUBMIT');

        // }
        // else if (currentPage === 'GET_PURCHASERS') {
        //     if (purchaseInfo.forCompany) {
        //         if (!purchaseInfo.companyName.trim()) {
        //             const el = document.querySelector(`#companyname`);
        //             if (el) {
        //                 el.scrollIntoView({
        //                     behavior: 'smooth',
        //                     block: 'center',
        //                 });
        //                 (el as HTMLInputElement).focus();
        //                 setMissingInfo(true);
        //                 return;
        //             }
        //         }

        //         if (!purchaseInfo.incorporationNumber.trim()) {
        //             const el = document.querySelector(`#incorporationnumber`);
        //             if (el) {
        //                 el.scrollIntoView({
        //                     behavior: 'smooth',
        //                     block: 'center',
        //                 });
        //                 (el as HTMLInputElement).focus();
        //                 setMissingInfo(true);
        //                 return;
        //             }
        //         }
        //     }

        //     for (let t = 0; t < purchaseInfo.clientsInfo.length; t++) {
        //         const client = purchaseInfo.clientsInfo[t];

        //         // check legal name
        //         if (!client.fullLegalName.trim()) {
        //             const el = document.querySelector(`#clientname${t}`);
        //             if (el) {
        //                 el.scrollIntoView({
        //                     behavior: 'smooth',
        //                     block: 'center',
        //                 });
        //                 (el as HTMLInputElement).focus();
        //                 setMissingInfo(true);
        //                 return;
        //             }
        //         }

        //         let doNotProceed = false;

        //         // employment
        //         if (!purchaseInfo.forCompany && client.employment === 'TBF') {
        //             //employment-header${props.num}
        //             const el = document.querySelector(`.employment-header${t}`);
        //             if (el) {
        //                 el.scrollIntoView({
        //                     behavior: 'smooth',
        //                     block: 'center',
        //                 });
        //                 el.className += ' pt-1 border border-danger rounded border-2';
        //             }
        //             doNotProceed = true;
        //         }

        //         if (!purchaseInfo.forCompany && client.employment === 'EMPLOYED') {
        //             if (!client.occupation) {
        //                 //`employeroccupation${props.num}`
        //                 const el = document.querySelector(`#employeroccupation${t}`);
        //                 if (el) {
        //                     el.scrollIntoView({
        //                         behavior: 'smooth',
        //                         block: 'center',
        //                     });
        //                     (el as HTMLInputElement).focus();
        //                     setMissingInfo(true);
        //                     return;
        //                 }
        //             }

        //             if (!purchaseInfo.forCompany && !client.employerName) {
        //                 //`employeroccupation${props.num}`
        //                 const el = document.querySelector(`#employername${t}`);
        //                 if (el) {
        //                     el.scrollIntoView({
        //                         behavior: 'smooth',
        //                         block: 'center',
        //                     });
        //                     (el as HTMLInputElement).focus();
        //                     setMissingInfo(true);
        //                     return;
        //                 }
        //             }
        //         }

        //         // citizenship
        //         if (!purchaseInfo.forCompany && client.citizenShip === '') {
        //             //employment-header${props.num}
        //             const el = document.querySelector(`.citizenship-header${t}`);
        //             if (el) {
        //                 el.scrollIntoView({
        //                     behavior: 'smooth',
        //                     block: 'center',
        //                 });
        //                 el.className += ' pt-1 border border-danger rounded border-2';
        //             }
        //             doNotProceed = true;
        //         }

        //         if (doNotProceed) {
        //             setMissingInfo(true);
        //             return;
        //         }

        //         // check to make sure at least an email address and/or phone is provided for purchaser 1
        //         if (t === 0 && !client.phoneNumber && !client.emailAddress) {
        //             const phone = document.querySelector(`#phone${t}`);
        //             if (phone) {
        //                 phone.scrollIntoView({
        //                     behavior: 'smooth',
        //                     block: 'center',
        //                 });
        //                 (phone as HTMLInputElement).focus();
        //                 setMissingInfo(true);
        //                 return;
        //             }
        //         }
        //     }

        //     setMissingInfo(false);
        //     setCurrentPage('PROPERTY_INFO')
        //     return;
        // }
        // else if (currentPage === 'PROPERTY_INFO') {
        //     // page 2
        //     if (!purchaseInfo.purchasePrice) {
        //         const el = document.querySelector(`#purchaseprice`);
        //         if (el) {
        //             el.scrollIntoView({
        //                 behavior: 'smooth',
        //                 block: 'center',
        //             });
        //             (el as HTMLInputElement).focus();
        //             setMissingInfo(true);
        //             return;
        //         }
        //     }

        //     if (purchaseInfo.buildingNewUsed === '') {
        //         const el = document.querySelector(`.newused`);
        //         if (el) {
        //             el.scrollIntoView({
        //                 behavior: 'smooth',
        //                 block: 'center',
        //             });
        //             el.className += ' pt-1 border border-danger rounded border-2';
        //         }
        //         setMissingInfo(true);
        //         return;
        //     }

        //     for (let t = 0; t < purchaseInfo.guarantorsInfo.length; t++) {
        //         const guarantor = purchaseInfo.guarantorsInfo[t];
        //         // check legal name
        //         if (!guarantor.fullLegalName.trim()) {
        //             const el = document.querySelector(`#guarantorname${t}`);
        //             if (el) {
        //                 el.scrollIntoView({
        //                     behavior: 'smooth',
        //                     block: 'center',
        //                 });
        //                 (el as HTMLInputElement).focus();
        //                 setMissingInfo(true);
        //                 return;
        //             }
        //         }

        //         if (!guarantor.phoneNumber.trim()) {
        //             const el = document.querySelector(`#guarantorphone${t}`);
        //             if (el) {
        //                 el.scrollIntoView({
        //                     behavior: 'smooth',
        //                     block: 'center',
        //                 });
        //                 (el as HTMLInputElement).focus();
        //                 setMissingInfo(true);
        //                 return;
        //             }
        //         }
        //     }

        //     // here we are good to submit
        //     setCurrentPage('CONFIRM_SUBMIT');
        // }
    };

    const submitSaleForm = async () => {
        const c = getOutput(refinanceInfo);

        await sendEmail('Refinance submission', c);

        setCurrentPage('SUBMIT_RESULT');
    };

    useEffect(() => {

        console.log(refinanceInfo.clientsInfo, refinanceInfo.clientsAddedInfo, numberOfOwners, numberOfAdded);


        // eslint-disable-next-line
        if (!document.querySelector('.modal-backdrop')) {
            new bootstrap.Modal('#formModal').show();

            const modal = document.querySelector('#formModal');
            if (modal) {
                modal.addEventListener('hidden.bs.modal', () => {
                    props.dismissed();
                });
            }
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const tempOwners = [...refinanceInfo.clientsInfo];
        if (numberOfOwners > tempOwners.length) {
            do {
                tempOwners.push(
                    new ClientInfo()
                );
            } while (numberOfOwners > tempOwners.length);
        }
        else if (numberOfOwners < tempOwners.length) {
            do {
                tempOwners.pop();
            } while (numberOfOwners < tempOwners.length);
        }

        setRefinanceInfo({ ...refinanceInfo, clientsInfo: tempOwners });

        // eslint-disable-next-line
    }, [numberOfOwners,]);

    useEffect(() => {
        const temp = [...refinanceInfo.guarantorsInfo];
        if (numberOfGuarantors > temp.length) {
            do {
                temp.push(
                    new GuarantorInfo(),
                );
            } while (numberOfGuarantors > temp.length);
        }
        else if (numberOfGuarantors < temp.length) {
            do {
                temp.pop();
            } while (numberOfGuarantors < temp.length);
        }

        setRefinanceInfo({ ...refinanceInfo, guarantorsInfo: temp });

        // eslint-disable-next-line
    }, [numberOfGuarantors]);

    useEffect(() => {
        const tempOwners = [...refinanceInfo.clientsAddedInfo];
        if (numberOfAdded > tempOwners.length) {
            do {
                tempOwners.push(
                    new ClientInfo()
                );
            } while (numberOfAdded > tempOwners.length);
        }
        else if (numberOfAdded < tempOwners.length) {
            do {
                tempOwners.pop();
            } while (numberOfAdded < tempOwners.length);
        }

        setRefinanceInfo({ ...refinanceInfo, clientsAddedInfo: tempOwners });

        // eslint-disable-next-line
    }, [numberOfAdded]);

    // useEffect(() => {

    //     setNumberOfOwners(refinanceInfo.forCompany ? 1 : 0);

    // }, [refinanceInfo.forCompany]);

    useEffect(() => {
        //if (currentPage !== 'PROPERTY_INFO') {
        //
        const top = document.querySelector('.top-second-page');
        if (top) {
            top.scrollIntoView({
                behavior: 'smooth',
            });
        }
        //}
    }, [currentPage]);

    return (

        <div className="modal fade" id="formModal" tabIndex={-1} aria-labelledby="formModalLabel" aria-hidden="true"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div className={`modal-dialog modal-lg ${((currentPage === 'GET_OWNERS' && refinanceInfo.clientsInfo.length !== 0)) ||
                (currentPage === 'GET_PROPERTY_DETAILS')
                ? 'modal-dialog-centered' : 'modal-near-top'} modal-dialog-scrollable`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            {
                                currentPage === 'GET_OWNERS' &&
                                <span>REFINANCE - Owner Information</span>
                            }

                            {
                                currentPage === 'GET_TRANSFER_INFORMATION' &&
                                <span>REFINANCE - Transfer Information</span>
                            }

                            {
                                currentPage === 'GET_PROPERTY_DETAILS' &&
                                <span>REFINANCE - Property Details</span>
                            }

                            {
                                currentPage === 'GET_MORTGAGE_DETAILS' &&
                                <span>REFINANCE - Mortgage Details</span>
                            }

                            {
                                currentPage === 'CONFIRM_SUBMIT' &&
                                <span>REFINANCE - Ready to Submit</span>
                            }

                            {
                                currentPage === 'SUBMITTING' &&
                                <span>REFINANCE - Please Wait</span>
                            }

                            {
                                currentPage === 'SUBMIT_RESULT' &&
                                <span>REFINANCE - Success!</span>
                            }

                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            <div className='container'>
                                <div className="container">

                                    {
                                        currentPage === 'GET_PROPERTY_DETAILS' &&
                                        <>
                                            <div className="row">
                                                <div className="col mb-1 mt-2 top-second-page">
                                                    &nbsp;
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        Address of mortgage/subject property
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='sellingstreet1' placeholder='Street address line 1'
                                                            value={refinanceInfo.street1}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setRefinanceInfo({ ...refinanceInfo, street1: e.target.value });
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
                                                        <input type='text' className='form-control' id='sellingstreet2' placeholder='Street address line 2'
                                                            value={refinanceInfo.street2}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setRefinanceInfo({ ...refinanceInfo, street2: e.target.value });
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
                                                        <input type='text' className='form-control' id='sellingcity' placeholder='City'
                                                            value={refinanceInfo.city}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setRefinanceInfo({ ...refinanceInfo, city: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            City
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col mb-3">
                                                    <select className="form-select p-3" aria-label="Province or territory"
                                                        value={refinanceInfo.provinceTerritory}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                            setRefinanceInfo({ ...refinanceInfo, provinceTerritory: e.target.value });
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
                                            <div className='row'>
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='sellingpostalcode' placeholder='Postal code'
                                                            value={refinanceInfo.postalCode}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setRefinanceInfo({ ...refinanceInfo, postalCode: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Postal code
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className='col'></div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        If this is a strata, please enter the following information (if applicable)
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='strataname' placeholder='Strata name'
                                                            value={refinanceInfo.strataName}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setRefinanceInfo({ ...refinanceInfo, strataName: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Strata Management Company name
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-1 mt-4'>
                                                    <h6>
                                                        <CircleBullet />
                                                        Your house insurance information
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='insurancename' placeholder='Agent name'
                                                            value={refinanceInfo.insuranceAgentName}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setRefinanceInfo({ ...refinanceInfo, insuranceAgentName: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='insurancename'>
                                                            Agent name
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='tel' className='form-control' id='insurancenumber' placeholder='Agent number'
                                                            value={refinanceInfo.insuranceAgentPhone}
                                                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setRefinanceInfo({ ...refinanceInfo, insuranceAgentPhone: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='insurancenumber'>
                                                            Phone number - format: 123-456-7890
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }


                                    {
                                        currentPage === 'GET_OWNERS' &&
                                        <>
                                            <div className="row">
                                                <div className="col mb-3 top-second-page">
                                                    <h6>
                                                        Owners
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row align-items-center">
                                                <div className="col mb-3">
                                                    <h6>
                                                        How many people on title?
                                                    </h6>
                                                </div>

                                                <div className="col col-7 mb-3">
                                                    <select className="form-select p-3" aria-label="Sellers"
                                                        value={numberOfOwners}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                            if (e && e.target && e.target.value) {
                                                                setNumberOfOwners(parseInt(e.target.value));
                                                            }
                                                        }}>
                                                        <option value='0'>Please choose...</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                    </select>

                                                </div>
                                            </div>

                                            {
                                                refinanceInfo.forCompany &&
                                                <>
                                                    <div className="row">
                                                        <div className="col mb-1 mt-4">
                                                            <h6>
                                                                Please fill in company name, incorporation number, and signatory. Note that you will be contacted
                                                                for additional information such as minutes books and company share registry.
                                                            </h6>
                                                        </div>
                                                    </div>


                                                    <div className="row">

                                                        <div className="col mb-3">
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='companynameseller' placeholder='Company name'
                                                                    value={refinanceInfo.companyName}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setRefinanceInfo({ ...refinanceInfo, companyName: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='companynameseller'>
                                                                    Company name (required)
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="col mb-3">
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='incorporationnumberseller' placeholder='Incorporation #'
                                                                    value={refinanceInfo.incorporationNumber}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setRefinanceInfo({ ...refinanceInfo, incorporationNumber: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='incorporationnumberseller'>
                                                                    Incorporation # (required)
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            }

                                            {
                                                numberOfOwners > 0 &&
                                                <>
                                                    {
                                                        refinanceInfo.clientsInfo.map((c, i) => {
                                                            return (
                                                                <Owner text={refinanceInfo.forCompany ? 'Signatory' : 'Owner'}
                                                                    num={i}
                                                                    key={i}
                                                                    clientInfo={refinanceInfo.clientsInfo[i]}
                                                                    client1Info={refinanceInfo.clientsInfo.length > 1 ? refinanceInfo.clientsInfo[0] : null}
                                                                    company={refinanceInfo.forCompany}
                                                                    updated={(c: ClientInfo, idx: number) => {
                                                                        const tempClients: ClientInfo[] = [];
                                                                        for (let t = 0; t < refinanceInfo.clientsInfo.length; t++) {
                                                                            if (t === idx) {
                                                                                tempClients.push(c);
                                                                            }
                                                                            else {
                                                                                tempClients.push(refinanceInfo.clientsInfo[t]);
                                                                            }
                                                                        }
                                                                        setRefinanceInfo({ ...refinanceInfo, clientsInfo: tempClients });
                                                                    }}
                                                                />
                                                            );
                                                        })
                                                    }

                                                </>
                                            }
                                        </>
                                    }

                                    {
                                        currentPage === 'GET_TRANSFER_INFORMATION' &&
                                        <>
                                            <div className="row">
                                                <div className="col mb-1 mt-2 top-second-page">
                                                    &nbsp;
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <h6>
                                                        Title changes
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        {
                                                            numberOfOwners === 1 ?
                                                                `Is the owner (${refinanceInfo.clientsInfo[0].fullLegalName}) going to be removed from title?`
                                                                :
                                                                `Are any of the owners going to be removed from title?`
                                                        }
                                                    </h6>
                                                </div>
                                            </div>

                                            {
                                                refinanceInfo.clientsInfo.map((owner, idx) => {
                                                    return (
                                                        <div className='row mb-1' key={idx}>
                                                            <div className='col'>
                                                                <span style={{
                                                                    textDecoration: refinanceInfo.removedFromTitle.indexOf(owner.fullLegalName) > -1 ? 'line-through' : '',
                                                                }}>
                                                                    {owner.fullLegalName}
                                                                </span>
                                                            </div>
                                                            <div className='col' style={{
                                                                whiteSpace: 'nowrap',
                                                            }}>
                                                                <span>
                                                                    <input type='checkbox' className='btn btn-secondary'
                                                                        id={`removecheck${idx}`}
                                                                        value='Remove from title'
                                                                        checked={refinanceInfo.removedFromTitle.indexOf(owner.fullLegalName) > -1}
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                                                                            let temp = refinanceInfo.removedFromTitle;
                                                                            if (e.target.checked) {
                                                                                temp.push(owner.fullLegalName);
                                                                            } else {
                                                                                temp = temp.filter((s) => s !== owner.fullLegalName);
                                                                            }
                                                                            setRefinanceInfo({ ...refinanceInfo, removedFromTitle: temp });
                                                                        }

                                                                        }
                                                                    />
                                                                </span>
                                                                <label htmlFor={`removecheck${idx}`}
                                                                    className='ps-2'>
                                                                    Check to remove from title / uncheck to keep

                                                                </label>
                                                            </div>

                                                            <div className='col'>
                                                                <span>
                                                                    {

                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }

                                            <div className='row align-items-center mt-5'>
                                                <div className="col mb-3">
                                                    <h6>
                                                        <CircleBullet />
                                                        How many people are being ADDED to title?
                                                    </h6>
                                                </div>

                                                <div className="col col-6 mb-3">
                                                    <select className="form-select p-3" aria-label="Added"
                                                        value={numberOfAdded}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                            if (e && e.target && e.target.value) {
                                                                setNumberOfAdded(parseInt(e.target.value));
                                                            }
                                                        }}>
                                                        <option value='0'>Please choose...</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                    </select>

                                                </div>
                                            </div>

                                            {
                                                numberOfAdded > 0 &&
                                                <>
                                                    {
                                                        refinanceInfo.clientsAddedInfo.map((c, i) => {
                                                            return (
                                                                <TransferAdded text={refinanceInfo.forCompany ? 'Signatory' : 'Added Owner'}
                                                                    num={i}
                                                                    key={i}
                                                                    refinanceInfo={refinanceInfo}
                                                                    updated={(c: ClientInfo, idx: number) => {
                                                                        const tempClients: ClientInfo[] = [];
                                                                        for (let t = 0; t < refinanceInfo.clientsAddedInfo.length; t++) {
                                                                            if (t === idx) {
                                                                                tempClients.push(c);
                                                                            }
                                                                            else {
                                                                                tempClients.push(refinanceInfo.clientsAddedInfo[t]);
                                                                            }
                                                                        }
                                                                        setRefinanceInfo({ ...refinanceInfo, clientsAddedInfo: tempClients });
                                                                    }}
                                                                />
                                                            );
                                                        })
                                                    }

                                                </>
                                            }

                                        </>
                                    }


                                    {
                                        currentPage === 'GET_MORTGAGE_DETAILS' &&
                                        <>

                                            <div className="row">
                                                <div className="col mb-1 mt-4 top-second-page">
                                                    <h6>
                                                        <CircleBullet />
                                                        Name of Mortgage Lender?
                                                    </h6>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='mortgagelendername' placeholder='Mortgage Lender name'
                                                            value={refinanceInfo.mortgageLenderName}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setRefinanceInfo({ ...refinanceInfo, mortgageLenderName: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='mortgagelendername'>
                                                            Mortgage Lender name
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        Is there currently a mortgage or line of credit on title that will need to be paid out and discharged?
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="mortgageselling" id="mortgageselling-yes"
                                                            checked={refinanceInfo.mortgageOrLoCOnTitle === 'YES'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setRefinanceInfo({ ...refinanceInfo, mortgageOrLoCOnTitle: 'YES' });
                                                                }
                                                            }} />
                                                        <label className="form-check-label" htmlFor="mortgageselling-yes">
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="mortgageselling" id="mortgageselling-no"
                                                            checked={refinanceInfo.mortgageOrLoCOnTitle === 'NO'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setRefinanceInfo({ ...refinanceInfo, mortgageOrLoCOnTitle: 'NO' });
                                                                }
                                                            }} />
                                                        <label className="form-check-label" htmlFor="mortgageselling-no">
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                refinanceInfo.mortgageOrLoCOnTitle === 'YES' &&
                                                <>
                                                    <div className="row">
                                                        <div className="col mb-3">
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='referencenumber' placeholder='Reference number'
                                                                    value={refinanceInfo.mortgageOrLoCOnTitleReferenceNumber}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setRefinanceInfo({ ...refinanceInfo, mortgageOrLoCOnTitleReferenceNumber: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='referencenumber'>
                                                                    Reference number
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="col mb-3">
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='bankbranch' placeholder='Bank and Brank'
                                                                    value={refinanceInfo.mortgageOrLoCOnTitleBankBranch}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setRefinanceInfo({ ...refinanceInfo, mortgageOrLoCOnTitleBankBranch: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    Bank and Branch
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }

                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        Does Mortgage Lender require other debts to be paid?
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="mortgagedebt" id="mortgagedebts-yes"
                                                            checked={refinanceInfo.mortgageLenderRequiresOtherDebtsPaid === 'YES'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setRefinanceInfo({ ...refinanceInfo, mortgageLenderRequiresOtherDebtsPaid: 'YES' });
                                                                }
                                                            }} />
                                                        <label className="form-check-label" htmlFor="mortgagedebts-yes">
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="mortgagedebts" id="mortgagedebts-no"
                                                            checked={refinanceInfo.mortgageLenderRequiresOtherDebtsPaid === 'NO'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setRefinanceInfo({ ...refinanceInfo, mortgageLenderRequiresOtherDebtsPaid: 'NO' });
                                                                }
                                                            }} />
                                                        <label className="form-check-label" htmlFor="mortgagedebts-no">
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                refinanceInfo.mortgageLenderRequiresOtherDebtsPaid === 'YES' &&
                                                <div className="row">
                                                    <div className="col mb-3">
                                                        <div className='form-floating mb-0'>
                                                            <input type='text' className='form-control' id='mortgagelenderotherdebts' placeholder='Mortgage Lender Other Debts'
                                                                value={refinanceInfo.mortgageLenderRequiresOtherDebtsPaidDetails}
                                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                    setRefinanceInfo({ ...refinanceInfo, mortgageLenderRequiresOtherDebtsPaidDetails: e.target.value });
                                                                }}
                                                            />
                                                            <label htmlFor='mortgagelendername'>
                                                                Enter details ie. Credit card, student loans, etc.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>


                                            }

                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        Does this involve a separation or divorce?
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-1">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`separation`} id={`separation-yes`}
                                                            checked={refinanceInfo.involvesSeparationDivorce === 'YES'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setRefinanceInfo({ ...refinanceInfo, involvesSeparationDivorce: 'YES' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`separation-yes`}>
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`separation`} id={`separation-no`}
                                                            checked={refinanceInfo.involvesSeparationDivorce === 'NO'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setRefinanceInfo({ ...refinanceInfo, involvesSeparationDivorce: 'NO' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`separation-no`}>
                                                            No
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>

                                            {
                                                ((refinanceInfo.clientsInfo.length + refinanceInfo.clientsAddedInfo.length) > 1) &&
                                                <>
                                                    <div className='row'>
                                                        <div className='col mb-1 mt-4'>
                                                            <h6>
                                                                <CircleBullet />
                                                                Do you want to own the property as Joint Tenants or as Tenants-In-Common?
                                                            </h6>
                                                        </div>
                                                    </div>


                                                    <div className='row'>
                                                        <div className='col mb-3'>

                                                            <div className='form-check'>
                                                                <input className='form-check-input' type='radio' name='ownertype' id='jointtenants'
                                                                    checked={refinanceInfo.joinType === 'JOINT_TENANTS'}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        if (e.target.checked) {
                                                                            setRefinanceInfo({ ...refinanceInfo, joinType: 'JOINT_TENANTS' });
                                                                        }
                                                                    }}
                                                                />
                                                                <label className='form-check-label' htmlFor='jointtenants'>
                                                                    Joint Tenants
                                                                </label>
                                                            </div>

                                                            <div className='form-check'>
                                                                <input className='form-check-input' type='radio' name='ownertype' id='tenantsincommon'
                                                                    checked={refinanceInfo.joinType === 'TENANTS_IN_COMMON'}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        if (e.target.checked) {
                                                                            setRefinanceInfo({ ...refinanceInfo, joinType: 'TENANTS_IN_COMMON' });
                                                                        }
                                                                    }}

                                                                />
                                                                <label className='form-check-label' htmlFor='tenantsincommon'>
                                                                    Tenants-In-Common
                                                                </label>
                                                            </div>

                                                        </div>

                                                        <div className='col-7 mb-3'>

                                                            <span>
                                                                For more information between Joint Tenancy and Tenancy In Common, click on the following link to our blog post:&nbsp;&nbsp;
                                                            </span>

                                                            <a href='http://www.dbmrealestatelaw.com/joint-tenancy-vs-tenancy-common/' target='_blank' rel='noreferrer'>
                                                                http://www.dbmrealestatelaw.com/joint-tenancy-vs-tenancy-common/
                                                            </a>
                                                        </div>

                                                    </div>
                                                </>
                                            }


                                            <div className='row align-items-center mt-4'>
                                                <div className='col mb-3'>
                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'min-content 1fr'
                                                    }}>
                                                        <div>
                                                            <CircleBullet />
                                                        </div>
                                                        <div>

                                                            <h6 style={{
                                                                display: 'inline-block',
                                                            }}>
                                                                <div>Are there any guarantors/co-signers?</div>
                                                                <div>If so, how many?</div>
                                                            </h6>
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className='col mb-3'>
                                                    <select className='form-select p-3' aria-label='number of guarantors'
                                                        value={refinanceInfo.guarantorsInfo.length}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                            if (e && e.target && e.target.value) {
                                                                setNumberOfGuarantors(parseInt(e.target.value));
                                                            }
                                                        }}>
                                                        <option value='0'>No guarantors</option>
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                        <option value='4'>4</option>
                                                    </select>

                                                </div>
                                            </div>

                                            {
                                                numberOfGuarantors > 0 &&
                                                <>
                                                    <div className='row'>
                                                        <div className='col mb-1 mt-4'>
                                                            <h6>
                                                                IMPORTANT: All guarantors will be required to sign particular mortgage documents
                                                                and attend appointment(s)
                                                            </h6>
                                                        </div>
                                                    </div>
                                                    {
                                                        refinanceInfo.guarantorsInfo.map((c, i) => {
                                                            return (
                                                                <Guarantor text={'Guarantor/Co-signer'}
                                                                    num={i}
                                                                    key={i}
                                                                    numberOfPurchasers={refinanceInfo.clientsInfo.length}
                                                                    guarantorInfo={refinanceInfo.guarantorsInfo[i]}
                                                                    updated={(c: GuarantorInfo, idx: number) => {
                                                                        const tempGuarantors: GuarantorInfo[] = [];
                                                                        for (let t = 0; t < refinanceInfo.guarantorsInfo.length; t++) {
                                                                            if (t === idx) {
                                                                                tempGuarantors.push(c);
                                                                            }
                                                                            else {
                                                                                tempGuarantors.push(refinanceInfo.guarantorsInfo[t]);
                                                                            }
                                                                        }
                                                                        setRefinanceInfo({ ...refinanceInfo, guarantorsInfo: tempGuarantors });
                                                                    }}
                                                                />
                                                            );
                                                        })
                                                    }

                                                </>
                                            }

                                            <div className='row'>
                                                <div className='col mb-1 mt-4'>
                                                    <h6>
                                                        <CircleBullet />
                                                        Do you have any additional details, questions, or concerns?
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>

                                                    <textarea
                                                        className='dbm-textarea'
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        value={refinanceInfo.additionalComments}
                                                        rows={6}
                                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                                            setRefinanceInfo({ ...refinanceInfo, additionalComments: e.target.value });
                                                        }}>
                                                    </textarea>

                                                </div>
                                            </div>

                                        </>
                                    }


                                    {
                                        currentPage === 'SUBMITTING' &&
                                        <Submitting />
                                    }

                                    {
                                        currentPage === 'SUBMIT_RESULT' &&
                                        <SubmitDone />
                                    }

                                    {
                                        currentPage === 'CONFIRM_SUBMIT' &&
                                        <SubmitConfirm
                                            text='Submit your refinance information to Drysdale Bacon McStravick?'
                                        />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="modal-footer">

                        {
                            currentPage === 'GET_PROPERTY_DETAILS' &&
                            <>
                                <div className="row">
                                    <div className="col mb-3 mt-4 text-danger fw-semibold error-label">
                                        <h6 style={{
                                            visibility: missingInfo ? 'visible' : 'hidden',
                                        }}>
                                            Please fill in all required information
                                        </h6>
                                    </div>
                                    <div className="col mb-3 mt-4" style={{
                                        textAlign: 'right',
                                        whiteSpace: 'nowrap',
                                    }}>

                                        <input type='button' value='Next' className='btn btn-primary form-button'
                                            onClick={() => {
                                                checkPage();
                                            }} />
                                    </div>
                                </div>
                            </>
                        }

                        {
                            (currentPage === 'GET_OWNERS' && (refinanceInfo.forCompany || numberOfOwners !== 0)) &&
                            <>
                                <div className="row">
                                    <div className="col mb-3 mt-4 text-danger fw-semibold error-label">
                                        {
                                            missingInfo &&
                                            <h6>
                                                Please fill in all required information
                                            </h6>
                                        }
                                    </div>
                                    <div className="col mb-3 mt-4" style={{
                                        textAlign: 'right',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        <input type='button' value='Back to Property Details' className='btn btn-secondary form-button me-2'
                                            onClick={() => setCurrentPage('GET_PROPERTY_DETAILS')} />

                                        <input type='submit' value='Next' className='btn btn-primary form-button'
                                            onClick={() => {
                                                checkPage();
                                            }} />
                                    </div>
                                </div>

                            </>
                        }

                        {
                            currentPage === 'GET_TRANSFER_INFORMATION' &&
                            <>
                                <div className="row">
                                    <div className="col mb-3 mt-4 text-danger fw-semibold error-label">
                                        <h6 style={{
                                            visibility: missingInfo ? 'visible' : 'hidden',
                                        }}>
                                            Please fill in all required information
                                        </h6>
                                    </div>
                                    <div className="col mb-3 mt-4" style={{
                                        textAlign: 'right',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        <input type='button' value='Back to Owners' className='btn btn-secondary form-button me-2'
                                            onClick={() => setCurrentPage('GET_OWNERS')} />

                                        <input type='button' value='Next' className='btn btn-primary form-button'
                                            onClick={() => {
                                                checkPage();
                                            }} />
                                    </div>
                                </div>
                            </>
                        }

                        {
                            currentPage === 'GET_MORTGAGE_DETAILS' &&
                            <>
                                <div className="row">
                                    <div className="col mb-3 mt-4 text-danger fw-semibold error-label">
                                        <h6 style={{
                                            visibility: missingInfo ? 'visible' : 'hidden',
                                        }}>
                                            Please fill in all required information
                                        </h6>
                                    </div>
                                    <div className="col mb-3 mt-4" style={{
                                        textAlign: 'right',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        <input type='button' value='Back to Transfer Information' className='btn btn-secondary form-button me-2'
                                            onClick={() => setCurrentPage('GET_TRANSFER_INFORMATION')} />

                                        <input type='button' value='Next' className='btn btn-primary form-button'
                                            onClick={() => {
                                                checkPage();
                                            }} />
                                    </div>
                                </div>
                            </>
                        }

                        {
                            currentPage === 'CONFIRM_SUBMIT' &&
                            <>
                                <div className="row">
                                    <div className="col mb-3 mt-4" style={{
                                        textAlign: 'right',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        <input type='button' value='Back to Mortgage Information' className='btn btn-secondary form-button me-2'
                                            onClick={() => setCurrentPage('GET_MORTGAGE_DETAILS')} />

                                        <input type='button' value='Submit to DBM' className='btn btn-primary form-button'
                                            onClick={() => {
                                                setCurrentPage('SUBMITTING');
                                                setTimeout(() => {
                                                    submitSaleForm();
                                                }, 250);
                                            }} />
                                    </div>
                                </div>
                            </>
                        }

                        {
                            currentPage === 'SUBMIT_RESULT' &&
                            <>
                                <div className="row">
                                    <div className="col mb-3 mt-4" style={{
                                        textAlign: 'right',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        <input
                                            type='button' value='Finish' className='btn btn-primary form-button'
                                            data-bs-dismiss="modal" aria-label="Close"
                                        />
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )

};

const getOutput = (refinanceInfo: RefinanceInfo): string => {

    const output: string[] = [];

    output.push('<html><b>REFINANCE</b><br /><br />');

    output.push('<table>');
    output.push(getHeader('MORTGAGE-SUBJECT PROPERTY'));
    output.push(getEntry('Street Address 1', refinanceInfo.street1));
    output.push(getEntry('Street Address 2', refinanceInfo.street2));
    output.push(getEntry('City', refinanceInfo.city));
    output.push(getEntry('Province or Territory', refinanceInfo.provinceTerritory));
    output.push(getEntry('Postal Code', refinanceInfo.postalCode, true));

    output.push(getEntry('Strata Company', refinanceInfo.strataName, true));

    output.push(getEntry('House Insurance Agent', refinanceInfo.insuranceAgentName));
    output.push(getEntry('House Insurance Phone', refinanceInfo.insuranceAgentPhone, true));

    output.push('</table><table>');

    for (let i = 0; i < refinanceInfo.clientsInfo.length; i++) {

        const client = refinanceInfo.clientsInfo[i];

        output.push(getHeader(`OWNER ${(i + 1).toString()}`));
        output.push(getEntry('Full Legal Name', client.fullLegalName));
        output.push(getEntry('Phone Number', client.phoneNumber));
        output.push(getEntry('Email', client.emailAddress));
        output.push(getEntry('Date of Birth', client.dateOfBirth.toDateString() === (new Date()).toDateString()
            ? ''
            : client.dateOfBirth.toISOString().split('T')[0]));
        output.push(getEntry('SIN', client.sinViaPhone ? 'TO BE PROVIDED BY PHONE' : client.socialInsNumber));

        output.push(getHeader('Current Address'))

        if (client.addressSameAsProperty === 'NO') {
            output.push(getEntry('Street 1', client.mailingStreet1));
            output.push(getEntry('Street 2', client.mailingStreet2));
            output.push(getEntry('City', client.mailingCity));
            output.push(getEntry('Province or Territory', client.mailingProvinceTerritory));
            output.push(getEntry('Postal Code', client.mailingPostalCode, true));
        }
        else if (client.addressSameAsProperty === 'YES') {
            output.push(getEntry('Address', 'SAME AS MORTGAGE PROPERTY', true));
            output.push(getEntry('Time Living At Property', client.timeLivingAtProperty, true));
        }
        else {
            output.push(getEntry('Address', 'NOT SPECIFIED', true));
        }


        //output.push(getEntry('Resident of Canada at completion', client.residentOfCanada, true));
    }

    output.push(getHeader('TO BE REMOVED FROM TITLE'));

    if (refinanceInfo.removedFromTitle.length === 0) {
        output.push('NONE');
    }
    else {
        for (let i = 0; i < refinanceInfo.removedFromTitle.length; i++) {
            output.push(getEntry('Remove', refinanceInfo.removedFromTitle[i], i === refinanceInfo.removedFromTitle.length - 1 ? true : false));
        }
    }

    output.push(getHeader('TO BE ADDED TO TITLE'));

    if (refinanceInfo.clientsAddedInfo.length === 0) {
        output.push('NONE');
    }
    else {
        for (let i = 0; i < refinanceInfo.clientsAddedInfo.length; i++) {
            const client = refinanceInfo.clientsAddedInfo[i];

            output.push(getHeader(`TRANSFER ${(i + 1).toString()}`));
            output.push(getEntry('Full Legal Name', client.fullLegalName));
            output.push(getEntry('Phone Number', client.phoneNumber));
            output.push(getEntry('Email', client.emailAddress));
            output.push(getEntry('Date of Birth', client.dateOfBirth.toDateString() === (new Date()).toDateString()
                ? ''
                : client.dateOfBirth.toISOString().split('T')[0]));
            output.push(getEntry('Social Insurance Number', client.sinViaPhone ? 'TO BE PROVIDED VIA PHONE' : client.socialInsNumber, true));

            output.push(getHeader('Current Address'))

            output.push(getEntry('Street 1', client.mailingStreet1));
            output.push(getEntry('Street 2', client.mailingStreet2));
            output.push(getEntry('City', client.mailingCity));
            output.push(getEntry('Province or Territory', client.mailingProvinceTerritory));
            output.push(getEntry('Postal Code', client.mailingPostalCode, true));

            output.push(getEntry('Relationship', client.relationship));

            output.push(getEntry('Occupation', client.occupation));
            output.push(getEntry('Employer Name', client.employerName));
            output.push(getEntry('Employer Phone Number', client.employerPhone));
            output.push(getEntry('Employer Street 1', client.employerStreet1));
            output.push(getEntry('Employer Street 2', client.employerStreet2));
            output.push(getEntry('Employer City', client.employerCity));
            output.push(getEntry('Employer Province or Territory', client.employerProvinceTerritory));
            output.push(getEntry('Employer Postal Code', client.employerPostalCode, true));

            let citizenShip = '';
            switch (client.citizenShip) {
                case 'CANADIAN_CITIZEN':
                    citizenShip = 'Canadian citizen';
                    break;

                case 'PERMANENT_RESIDENT':
                    citizenShip = 'Permanent resident';
                    break;

                case 'BC_PROV_NOMINEE':
                    citizenShip = 'B.C. Provincial Nominee';
                    break;

                default:
                    citizenShip = '';
            }

            output.push(getEntry('Citizenship', citizenShip));

            output.push(getEntry('Time Living At Property', client.timeLivingAtProperty, true));

        }
    }

    output.push(getHeader('MORTGAGE INFORMATION'));

    output.push(getEntry('Mortgage Lender Name', refinanceInfo.mortgageLenderName));

    output.push(getEntry('Need To Pay Out Mortgage / LOC', refinanceInfo.mortgageOrLoCOnTitle));

    if (refinanceInfo.mortgageOrLoCOnTitle === 'YES') {
        output.push(getEntry('Reference Number', refinanceInfo.mortgageOrLoCOnTitleReferenceNumber));
        output.push(getEntry('Bank And Branch', refinanceInfo.mortgageOrLoCOnTitleBankBranch, true));
    }

    output.push(getEntry('Lender Requires Debts To Be Paid', refinanceInfo.mortgageLenderRequiresOtherDebtsPaid));
    if (refinanceInfo.mortgageLenderRequiresOtherDebtsPaid === 'YES') {
        output.push(getEntry('Debt Details', refinanceInfo.mortgageLenderRequiresOtherDebtsPaidDetails, true));
    }

    output.push(getEntry('Separation or Divorce Involved', refinanceInfo.involvesSeparationDivorce, true));

    let joinType = '';
    if ((refinanceInfo.clientsInfo.length + refinanceInfo.clientsAddedInfo.length) < 2) {
        joinType = 'NOT APPLICABLE AS ONLY ONE OWNER';
    }
    else {
        switch (refinanceInfo.joinType) {
            case 'JOINT_TENANTS':
                joinType = 'Joint Tenants';
                break;

            case 'TENANTS_IN_COMMON':
                joinType = 'Tenants-in-Common'
                break;

            default:
                joinType = '';
        }
    }

    output.push(getEntry('Tenancy', joinType, true));

    for (let i = 0; i < refinanceInfo.guarantorsInfo.length; i++) {

        const guarantor = refinanceInfo.guarantorsInfo[i];

        output.push(getEntry(`GUARANTOR ${(i + 1).toString()}`, ''));
        output.push(getEntry('Full Legal Name', guarantor.fullLegalName));
        output.push(getEntry('Phone Number', guarantor.phoneNumber));
        output.push(getEntry('Email', guarantor.emailAddress));
        output.push(getEntry('Relationship', guarantor.relationship, true));
    }

    output.push('</table><table>');

    output.push(getEntry('Additional Comments', ''));
    output.push(getEntry(refinanceInfo.additionalComments, '', true));

    output.push('</table></html>');

    return output.join('');


}

export default RefinanceForm;