import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { ClientInfo, SaleInfo } from './ClassesInterfaces';

import CircleBullet from './CircleBullet';
import { FormProps, getEntry, getHeader, sendEmail } from './Helpers';
import { SubmitConfirm, SubmitDone, Submitting } from './SubmitConfirm';
import Seller from './Seller';
import DateInput from './DateInput';

declare var bootstrap: any;

const SaleForm = (props: FormProps): ReactElement => {

    const [saleInfo, setSaleInfo] = useState(() => new SaleInfo());

    const [missingInfo, setMissingInfo] = useState(false);

    const [numberOfSellers, setNumberOfSellers] = useState(0);

    const [currentPage, setCurrentPage] = useState<
        'GET_SELLERS' | 'GET_SALE_DETAILS' |
        'CONFIRM_SUBMIT' | 'SUBMITTING' | 'SUBMIT_RESULT'
    >('GET_SELLERS');

    const checkPage = () => {
        //

        if (currentPage === 'GET_SELLERS') {
            setMissingInfo(false);
            setCurrentPage('GET_SALE_DETAILS')
            return;

        }
        else {
            // here we are good to submit
            setCurrentPage('CONFIRM_SUBMIT');

        }
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
        const c = getOutput(saleInfo);

        await sendEmail('Sale submission', c);

        setCurrentPage('SUBMIT_RESULT');
    };

    useEffect(() => {
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
        const tempSellers = [...saleInfo.clientsInfo];
        if (numberOfSellers > tempSellers.length) {
            do {
                tempSellers.push(
                    new ClientInfo()
                );
            } while (numberOfSellers > tempSellers.length);
        }
        else if (numberOfSellers < tempSellers.length) {
            do {
                tempSellers.pop();
            } while (numberOfSellers < tempSellers.length);
        }

        setSaleInfo({ ...saleInfo, clientsInfo: tempSellers });

        // eslint-disable-next-line
    }, [numberOfSellers]);

    useEffect(() => {
        if (saleInfo.forCompany) {
            setNumberOfSellers(1);
        }
        else {
            setNumberOfSellers(0);
        }

    }, [saleInfo.forCompany]);

    useEffect(() => {
        //if (currentPage !== 'PROPERTY_INFO') {
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
            <div className={`modal-dialog modal-lg ${(currentPage === 'GET_SELLERS' && saleInfo.clientsInfo.length !== 0)
                ? 'modal-dialog-centered' : 'modal-near-top'} modal-dialog-scrollable`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            {
                                currentPage === 'GET_SELLERS' &&
                                <span>Seller Information</span>
                            }
                            {
                                currentPage === 'GET_SALE_DETAILS' &&
                                <span>Sale Details</span>
                            }

                            {
                                currentPage === 'CONFIRM_SUBMIT' &&
                                <span>Ready to Submit</span>
                            }

                            {
                                currentPage === 'SUBMITTING' &&
                                <span>Please Wait</span>
                            }

                            {
                                currentPage === 'SUBMIT_RESULT' &&
                                <span>Success!</span>
                            }

                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            <div className='container'>
                                <div className="container">

                                    {
                                        currentPage === 'GET_SELLERS' &&
                                        <>
                                            <div className="row">
                                                <div className="col mb-3">
                                                    <h6>
                                                        Seller Information
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row align-items-center">
                                                <div className="col mb-3">
                                                    <h6>
                                                        How many people on title for the property being sold?
                                                    </h6>
                                                </div>

                                                <div className="col mb-3">
                                                    <select className="form-select p-3" aria-label="Sellers"
                                                        value={numberOfSellers}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                            if (e && e.target && e.target.value) {
                                                                setNumberOfSellers(parseInt(e.target.value));
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
                                                    <div className='d-flex flex-nowrap pt-2'>
                                                        <input type='checkbox' id='iscompanyseller' checked={saleInfo.forCompany}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, forCompany: e.target.checked });
                                                            }} />
                                                        <label htmlFor='iscompanyseller' className='ps-2'>
                                                            This is for a company
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                saleInfo.forCompany &&
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
                                                                    value={saleInfo.companyName}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setSaleInfo({ ...saleInfo, companyName: e.target.value });
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
                                                                    value={saleInfo.incorporationNumber}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setSaleInfo({ ...saleInfo, incorporationNumber: e.target.value });
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
                                                numberOfSellers > 0 &&
                                                <>
                                                    {
                                                        saleInfo.clientsInfo.map((c, i) => {
                                                            return (
                                                                <Seller text={saleInfo.forCompany ? 'Signatory' : 'Seller'}
                                                                    num={i}
                                                                    key={i}
                                                                    clientInfo={saleInfo.clientsInfo[i]}
                                                                    client1Info={saleInfo.clientsInfo.length > 1 ? saleInfo.clientsInfo[0] : null}
                                                                    company={saleInfo.forCompany}
                                                                    updated={(c: ClientInfo, idx: number) => {
                                                                        const tempClients: ClientInfo[] = [];
                                                                        for (let t = 0; t < saleInfo.clientsInfo.length; t++) {
                                                                            if (t === idx) {
                                                                                tempClients.push(c);
                                                                            }
                                                                            else {
                                                                                tempClients.push(saleInfo.clientsInfo[t]);
                                                                            }
                                                                        }
                                                                        setSaleInfo({ ...saleInfo, clientsInfo: tempClients });
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
                                        currentPage === 'GET_SALE_DETAILS' &&
                                        <>
                                            <div className="row">
                                                <div className="col mb-1 mt-2 top-second-page">
                                                    &nbsp;
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="col mb-1">
                                                    <h6>
                                                        <CircleBullet />
                                                        Sale and Property Information
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <DateInput
                                                            className='form-control'
                                                            id={`closingdate`}
                                                            value={saleInfo.closingDateTBD ? new Date() : saleInfo.closingDate}
                                                            min={new Date((new Date()).setFullYear(new Date().getFullYear() - 5))}
                                                            label='Closing date'
                                                            onChange={(e) => {
                                                                if (e) {
                                                                    setSaleInfo({ ...saleInfo, closingDate: e });
                                                                }
                                                            }} />
                                                    </div>
                                                    <div className='mt-1'>
                                                        <input type='checkbox' id='chkclosingdatetbd' checked={saleInfo.closingDateTBD}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, closingDateTBD: e.target.checked });
                                                            }} />
                                                        <label htmlFor='chkclosingdatetbd'>
                                                            &nbsp;&nbsp;Date still to be determined
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <input type='number' className='form-control' id='saleprice' placeholder='Sale price'
                                                            value={saleInfo.sellingPrice}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value) {
                                                                    setSaleInfo({ ...saleInfo, sellingPrice: parseFloat(e.target.value) });
                                                                }
                                                            }}
                                                        />
                                                        <label htmlFor='saleprice'>
                                                            Sale price (CAD) if known
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        Address of sale property
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='sellingstreet1' placeholder='Street address line 1'
                                                            value={saleInfo.street1}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, street1: e.target.value });
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
                                                            value={saleInfo.street2}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, street2: e.target.value });
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
                                                            value={saleInfo.city}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, city: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            City
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col mb-3">
                                                    <select className="form-select p-3" aria-label="Province or territory"
                                                        value={saleInfo.provinceTerritory}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                            setSaleInfo({ ...saleInfo, provinceTerritory: e.target.value });
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
                                                            value={saleInfo.postalCode}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, postalCode: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Postal code
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        Your realtor information (if applicable)
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='realtornameseller' placeholder='Realtor name'
                                                            value={saleInfo.realtorName}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, realtorName: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Realtor name
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <input type='tel' className='form-control' id='realtorphoneselling' placeholder='Phone number'
                                                            value={saleInfo.realtorPhone}
                                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, realtorPhone: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Phone number - format: 123-456-7890
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        Is there a mortgage or line of credit on title?
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-3">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="mortgageselling" id="mortgageselling-yes"
                                                            checked={saleInfo.mortgageOrLoCOnTitle === 'YES'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setSaleInfo({ ...saleInfo, mortgageOrLoCOnTitle: 'YES' });
                                                                }
                                                            }} />
                                                        <label className="form-check-label" htmlFor="mortgageselling-yes">
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name="mortgageselling" id="mortgageselling-no"
                                                            checked={saleInfo.mortgageOrLoCOnTitle === 'NO'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setSaleInfo({ ...saleInfo, mortgageOrLoCOnTitle: 'NO' });
                                                                }
                                                            }} />
                                                        <label className="form-check-label" htmlFor="mortgageselling-no">
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                saleInfo.mortgageOrLoCOnTitle === 'YES' &&
                                                <>
                                                    <div className="row">
                                                        <div className="col mb-3">
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='referencenumber' placeholder='Reference number'
                                                                    value={saleInfo.mortgageOrLoCOnTitleReferenceNumber}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setSaleInfo({ ...saleInfo, mortgageOrLoCOnTitleReferenceNumber: e.target.value });
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
                                                                    value={saleInfo.mortgageOrLoCOnTitleBankBranch}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setSaleInfo({ ...saleInfo, mortgageOrLoCOnTitleBankBranch: e.target.value });
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
                                                        Does this involve a separation or divorce?
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-1">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`separation`} id={`separation-yes`}
                                                            checked={saleInfo.involvesSeparationDivorce === 'YES'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, involvesSeparationDivorce: 'YES' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`separation-yes`}>
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`separation`} id={`separation-no`}
                                                            checked={saleInfo.involvesSeparationDivorce === 'NO'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, involvesSeparationDivorce: 'NO' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`separation-no`}>
                                                            No
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        Have you paid the property taxes and/or claimed the Home Owner&apos;s Grant for {new Date().getFullYear()}?
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-1">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`propertytaxes`} id={`propertytaxes-yes`}
                                                            checked={saleInfo.paidPropertyTaxesOrClaimedHownOwnersGrant === 'YES'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, paidPropertyTaxesOrClaimedHownOwnersGrant: 'YES' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`propertytaxes-yes`}>
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`propertytaxes`} id={`propertytaxes-no`}
                                                            checked={saleInfo.paidPropertyTaxesOrClaimedHownOwnersGrant === 'NO'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, paidPropertyTaxesOrClaimedHownOwnersGrant: 'NO' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`propertytaxes-no`}>
                                                            No
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        If applicable, have you filed your Empty Homes Declaration (Vancouver property)?
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-1">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`emptyhome`} id={`emptyhome-occupied`}
                                                            checked={saleInfo.emptyHomesDeclaration === 'OCCUPIED'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, emptyHomesDeclaration: 'OCCUPIED' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`emptyhome-occupied`}>
                                                            Occupied
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`emptyhome`} id={`emptyhome-vacant`}
                                                            checked={saleInfo.emptyHomesDeclaration === 'VACANT'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, emptyHomesDeclaration: 'VACANT' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`emptyhome-vacant`}>
                                                            Vacant
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="col mb-1">

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`emptyhome`} id={`emptyhome-notfiled`}
                                                            checked={saleInfo.emptyHomesDeclaration === 'NOT_COMPLETED'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, emptyHomesDeclaration: 'NOT_COMPLETED' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`emptyhome-notfiled`}>
                                                            Not completed/filed
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`emptyhome`} id={`emptyhome-notapplicable`}
                                                            checked={saleInfo.emptyHomesDeclaration === 'NOT_APPLICABLE'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, emptyHomesDeclaration: 'NOT_APPLICABLE' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`emptyhome-notapplicable`}>
                                                            Not applicable
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-1 mt-4">
                                                    <h6>
                                                        <CircleBullet />
                                                        Do you have any additional details, questions, or concerns?
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col mb-3">

                                                    <textarea
                                                        className='dbm-textarea'
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                        value={saleInfo.additionalComments}
                                                        rows={6}
                                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                                            setSaleInfo({ ...saleInfo, additionalComments: e.target.value });
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
                                            text='Submit your sale information to Drysdale Bacon McStravick?'
                                        />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="modal-footer">

                        {
                            (currentPage === 'GET_SELLERS' && (saleInfo.forCompany || numberOfSellers !== 0)) &&
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
                                    }}>
                                        <input type='submit' value='Next' className='btn btn-primary form-button'
                                            onClick={() => {
                                                checkPage();
                                            }} />
                                    </div>
                                </div>

                            </>
                        }

                        {
                            currentPage === 'GET_SALE_DETAILS' &&
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
                                        <input type='button' value='Back to Sellers' className='btn btn-secondary form-button me-2'
                                            onClick={() => setCurrentPage('GET_SELLERS')} />

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
                                        <input type='button' value='Go back' className='btn btn-secondary form-button me-2'
                                            onClick={() => setCurrentPage('GET_SALE_DETAILS')} />

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

const getOutput = (saleInfo: SaleInfo): string => {

    const output: string[] = [];

    output.push('<html><b>SALE</b><br /><br />');

    output.push('<b>SELLERS</b><br />');

    output.push('<table>');
    if (saleInfo.forCompany) {
        output.push(getEntry('Company', saleInfo.companyName));
        output.push(getEntry('Incorporation Number', saleInfo.incorporationNumber));

        output.push(getEntry('Signatory Full Legal Name', saleInfo.clientsInfo[0].fullLegalName));

        output.push(getEntry('Phone Number', saleInfo.clientsInfo[0].phoneNumber));
        output.push(getEntry('Email', saleInfo.clientsInfo[0].emailAddress));
        output.push(getEntry('Street 1', saleInfo.clientsInfo[0].mailingStreet1));
        output.push(getEntry('Street 2', saleInfo.clientsInfo[0].mailingStreet2));
        output.push(getEntry('Province or Territory', saleInfo.clientsInfo[0].mailingProvinceTerritory));
        output.push(getEntry('Postal Code', saleInfo.clientsInfo[0].mailingPostalCode, true));

        output.push(getEntry('Resident of Canada at completion', saleInfo.clientsInfo[0].residentOfCanada, true));
    }
    else {
        for (let i = 0; i < saleInfo.clientsInfo.length; i++) {

            const client = saleInfo.clientsInfo[i];

            output.push(getHeader(`SELLER ${(i + 1).toString()}`));
            output.push(getEntry('Full Legal Name', client.fullLegalName));
            output.push(getEntry('Phone Number', client.phoneNumber));
            output.push(getEntry('Email', client.emailAddress));
            output.push(getEntry('Date of Birth', client.dateOfBirth.toDateString() === (new Date()).toDateString()
                ? ''
                : client.dateOfBirth.toISOString().split('T')[0]));

            output.push(getHeader('Mailing or Forwarding Address'))

            output.push(getEntry('Street 1', client.mailingStreet1));
            output.push(getEntry('Street 2', client.mailingStreet2));
            output.push(getEntry('City', client.mailingCity));
            output.push(getEntry('Province or Territory', client.mailingProvinceTerritory));
            output.push(getEntry('Postal Code', client.mailingPostalCode, true));

            output.push(getEntry('Resident of Canada at completion', client.residentOfCanada, true));
        }
    }

    output.push(getHeader('SALE PROPERTY INFORMATION'));

    output.push(getEntry('Closing Date', saleInfo.closingDateTBD ? 'TBD' : saleInfo.closingDate ? saleInfo.closingDate.toISOString().split('T')[0] : ''));

    output.push(getEntry('Sale Price (CAD)', saleInfo.sellingPrice.toString()));

    output.push(getEntry('Street 1', saleInfo.street1));
    output.push(getEntry('Street 2', saleInfo.street2));
    output.push(getEntry('City', saleInfo.city));
    output.push(getEntry('Province or Territory', saleInfo.provinceTerritory));
    output.push(getEntry('Postal Code', saleInfo.postalCode, true));

    output.push(getEntry('Realtor Name', saleInfo.realtorName));
    output.push(getEntry('Realtor Phone', saleInfo.realtorPhone, true));

    output.push(getEntry('Mortgage or LOC on title', saleInfo.mortgageOrLoCOnTitle));
    output.push(getEntry('Reference Number', saleInfo.mortgageOrLoCOnTitleReferenceNumber));
    output.push(getEntry('Bank and Branch', saleInfo.mortgageOrLoCOnTitleBankBranch, true));

    output.push(getEntry('Separation or Divorce Involved', saleInfo.involvesSeparationDivorce, true));

    output.push('</table><table>');

    output.push(getEntry(`Property Taxes Paid and or Home Owners Grant Claimed for ${(new Date().getFullYear())}`, saleInfo.paidPropertyTaxesOrClaimedHownOwnersGrant, true));

    output.push('</table><table>');

    output.push(getEntry('Empty Homes Declaration filed (Vancouver property)', saleInfo.emptyHomesDeclaration, true));

    output.push('</table><table>');

    output.push(getEntry('Additional Comments', ''));
    output.push(getEntry(saleInfo.additionalComments, '', true));

    output.push('</table></html>');

    return output.join('');


}

export default SaleForm;