import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { ClientInfo, SaleInfo } from '../ClassesInterfaces';

import CircleBullet from '../controls/CircleBullet';
import { checkInputs, FormProps, getEntry, getHeader, sendEmail } from '../Helpers';
import { SubmitConfirm, SubmitDone, SubmitError, Submitting } from '../controls/SubmitForms';
import Seller from '../controls/Seller';
import DateInput from '../controls/DateInput';
import House from '../controls/House';
import ModalBottomButtons from '../controls/ModalBottomButtons';

declare var bootstrap: any;

const SaleForm = (props: FormProps): ReactElement => {

    const [saleInfo, setSaleInfo] = useState(() => new SaleInfo());
    const [missingInfo, setMissingInfo] = useState(false);
    const [numberOfSellers, setNumberOfSellers] = useState(0);
    const [currentPage, setCurrentPage] = useState<
        'GET_SELLERS' | 'GET_SALE_DETAILS' |
        'CONFIRM_SUBMIT' | 'SUBMITTING' | 'SUBMIT_RESULT' |
        'SUBMIT_ERROR'
    >('GET_SELLERS');

    const [sendResult, setSendResult] = useState(-1);
    const [submitOk, setSubmitOk] = useState(false);

    const submitSaleForm = async () => {

        setCurrentPage('SUBMITTING');
        setSendResult(-1);
        setTimeout(async () => {
            const result = await sendEmail('Sale submission', getOutput(saleInfo));
            setSendResult(result);
        }, 250);
    };

    useEffect(() => {
        if (sendResult === 200) {
            setCurrentPage('SUBMIT_RESULT');
        }
        else if (sendResult !== -1) {
            setCurrentPage('SUBMIT_ERROR');
        }

    }, [sendResult]);


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
        setSubmitOk(false);
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
                || currentPage === 'GET_SALE_DETAILS'
                ? 'modal-dialog-centered' : 'modal-near-top'} modal-dialog-scrollable`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            <House />
                            {
                                currentPage === 'GET_SELLERS' &&
                                <span>SALE - Seller Information</span>
                            }
                            {
                                currentPage === 'GET_SALE_DETAILS' &&
                                <span>SALE - Sale Details</span>
                            }

                            {
                                currentPage === 'CONFIRM_SUBMIT' &&
                                <span>SALE - Ready to Submit</span>
                            }

                            {
                                currentPage === 'SUBMITTING' &&
                                <span>SALE - Please Wait</span>
                            }

                            {
                                currentPage === 'SUBMIT_RESULT' &&
                                <span>SALE - Success!</span>
                            }

                            {
                                currentPage === 'SUBMIT_ERROR' &&
                                <span>SALE - Error!</span>
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

                                                <div className="col col-7 mb-3">
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
                                                            <p className='mb-4'>
                                                                If this purchase involves a corporation, a trustee of a trust or a partner of a
                                                                partnership, please advise our office immediately. Additional fees and disbursements will apply.
                                                            </p>
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
                                                                    key={c.id}
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
                                                            value={saleInfo.closingDateTBD ? null : saleInfo.closingDate}
                                                            min={new Date((new Date()).setFullYear(new Date().getFullYear() - 5))}
                                                            label='Closing date'
                                                            onChange={(e) => {
                                                                if (e) {
                                                                    setSaleInfo({ ...saleInfo, closingDate: e });
                                                                }
                                                            }} />
                                                    </div>
                                                    <div className='d-flex flex-nowrap pt-2'>
                                                        <input type='checkbox' id='chkclosingdatetbd' checked={saleInfo.closingDateTBD}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, closingDateTBD: e.target.checked });
                                                            }} />
                                                        <label htmlFor='chkclosingdatetbd' className='ms-1'>
                                                            Date still to be determined
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <input type='number' className='form-control' id='saleprice' placeholder='Sale price'
                                                            value={saleInfo.sellingPrice}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target) {
                                                                    setSaleInfo({
                                                                        ...saleInfo, sellingPrice: e.target.value ?
                                                                            parseFloat(e.target.value).toString() : ''
                                                                    });
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
                                                        <input type='text' className='form-control is-required' id='sellingstreet1' placeholder='Street address line 1'
                                                            value={saleInfo.street1}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, street1: e.target.value });
                                                            }}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Please enter this field
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
                                                        <input type='text' className='form-control is-required' id='sellingcity' placeholder='City'
                                                            value={saleInfo.city}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, city: e.target.value });
                                                            }}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Please enter this field
                                                        </div>
                                                        <label htmlFor='floatingInput'>
                                                            City
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col mb-3">
                                                    <select className="form-select p-3 is-required" aria-label="Province or territory"
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
                                                    <div className="invalid-feedback">
                                                        Please enter this field
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className="col mb-3">
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control is-required' id='sellingpostalcode' placeholder='Postal code'
                                                            value={saleInfo.postalCode}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setSaleInfo({ ...saleInfo, postalCode: e.target.value });
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
                                                <div className='col'>

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
                                                        Have you paid the property taxes for the current applicable year?
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-1">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`propertytaxes`} id={`propertytaxes-yes`}
                                                            checked={saleInfo.paidPropertyTaxes === 'YES'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, paidPropertyTaxes: 'YES' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`propertytaxes-yes`}>
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`propertytaxes`} id={`propertytaxes-no`}
                                                            checked={saleInfo.paidPropertyTaxes === 'NO'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, paidPropertyTaxes: 'NO' });
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
                                                        Have you claimed the Home Owner&apos;s Grant for the current applicable year?
                                                    </h6>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col mb-1">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`homeownersgrant`} id={`homeownersgrant-yes`}
                                                            checked={saleInfo.claimedHownOwnersGrant === 'YES'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, claimedHownOwnersGrant: 'YES' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`homeownersgrant-yes`}>
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio" name={`homeownersgrant`} id={`homeownersgrant-no`}
                                                            checked={saleInfo.claimedHownOwnersGrant === 'NO'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setSaleInfo({ ...saleInfo, claimedHownOwnersGrant: 'NO' });
                                                                }
                                                            }} />

                                                        <label className="form-check-label" htmlFor={`homeownersgrant-no`}>
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
                                        currentPage === 'SUBMIT_ERROR' &&
                                        <SubmitError onClick={() => submitSaleForm()} />
                                    }

                                    {
                                        currentPage === 'CONFIRM_SUBMIT' &&
                                        <SubmitConfirm
                                            text='Submit your sale information to Drysdale Bacon McStravick?'
                                            submitOk={(e) => setSubmitOk(e)}
                                        />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="modal-footer">

                        {
                            (currentPage === 'GET_SELLERS' && (saleInfo.forCompany || numberOfSellers !== 0)) &&

                            <ModalBottomButtons
                                showError={missingInfo}
                                rightButtonText='Next'
                                rightButtonClicked={() => {
                                    if (checkInputs()) {
                                        setMissingInfo(false);
                                        setCurrentPage('GET_SALE_DETAILS');
                                    }
                                    else {
                                        setMissingInfo(true);
                                    }
                                }} />

                        }

                        {
                            currentPage === 'GET_SALE_DETAILS' &&

                            <ModalBottomButtons
                                showError={missingInfo}
                                leftButtonText='Back to Sellers'
                                leftButtonClicked={() => setCurrentPage('GET_SELLERS')}
                                rightButtonText='Next'
                                rightButtonClicked={() => {
                                    if (checkInputs()) {
                                        setMissingInfo(false);
                                        setCurrentPage('CONFIRM_SUBMIT');
                                    }
                                    else {
                                        setMissingInfo(true);
                                    }

                                }} />

                        }

                        {
                            currentPage === 'CONFIRM_SUBMIT' &&
                            <ModalBottomButtons
                                leftButtonText='Go back'
                                leftButtonClicked={() => setCurrentPage('GET_SALE_DETAILS')}
                                rightButtonText='Submit to DBM'
                                rightButtonDisabled={!submitOk}
                                rightButtonClicked={() => {
                                    setCurrentPage('SUBMITTING');
                                    setTimeout(() => {
                                        submitSaleForm();
                                    }, 250);
                                }} />
                        }

                        {
                            currentPage === 'SUBMIT_RESULT' &&

                            <ModalBottomButtons
                                rightButtonText='Finish'
                                rightButtonClicked={() => {
                                    props.dismissed();
                                }} />
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
            // output.push(getEntry('Date of Birth', client.dateOfBirth.toDateString() === (new Date()).toDateString()
            //     ? ''
            //     : client.dateOfBirth.toISOString().split('T')[0]));

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

    output.push(getEntry(`Property Taxes Paid for current applicable year`, saleInfo.paidPropertyTaxes));

    output.push(getEntry(`Home Owners Grant Claimed for current applicable year`, saleInfo.claimedHownOwnersGrant, true));

    output.push('</table><table>');

    output.push(getEntry('Empty Homes Declaration filed (Vancouver property)', saleInfo.emptyHomesDeclaration, true));

    output.push('</table><table>');

    output.push(getEntry('Additional Comments', ''));
    output.push(getEntry(saleInfo.additionalComments, '', true));

    output.push('</table>');

    return output.join('');


}

export default SaleForm;