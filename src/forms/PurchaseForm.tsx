import React, { ChangeEvent, Fragment, ReactElement, useEffect, useState } from 'react';
import Client from '../controls/Client';
import { ClientInfo, GuarantorInfo, PurchaseInfo } from '../ClassesInterfaces';
import Guarantor from '../Guarantor';

import CircleBullet from '../controls/CircleBullet';
import { checkInputs, FormProps, getEntry, getHeader, sendEmail } from '../Helpers';
import { SubmitConfirm, SubmitDone, SubmitError, Submitting } from '../controls/SubmitForms';
import DateInput from '../controls/DateInput';
import House from '../controls/House';


declare var bootstrap: any;


const PurchaseForm = (props: FormProps): ReactElement => {

    const [purchaseInfo, setPurchaseInfo] = useState(() => new PurchaseInfo());
    const [missingInfo, setMissingInfo] = useState(false);
    const [numberOfClients, setNumberOfClients] = useState(0);
    const [numberOfGuarantors, setNumberOfGuarantors] = useState(0);

    const [currentPage, setCurrentPage] = useState<
        'GET_PURCHASERS' | 'PROPERTY_INFO' | 'CONFIRM_SUBMIT' | 'SUBMITTING' | 'SUBMIT_RESULT' | 'SUBMIT_ERROR'
    >('GET_PURCHASERS');

    const [sendResult, setSendResult] = useState(-1);

    const submitPurchaseForm = async () => {

        setCurrentPage('SUBMITTING');
        setSendResult(-1);
        setTimeout(async () => {
            const result = await sendEmail('Purchase submission', getOutput(purchaseInfo));
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
        const tempClients = [...purchaseInfo.clientsInfo];
        if (numberOfClients > tempClients.length) {
            do {
                tempClients.push(
                    new ClientInfo()
                );
            } while (numberOfClients > tempClients.length);
        }
        else if (numberOfClients < tempClients.length) {
            do {
                tempClients.pop();
            } while (numberOfClients < tempClients.length);
        }

        setPurchaseInfo({ ...purchaseInfo, clientsInfo: tempClients });

        // eslint-disable-next-line
    }, [numberOfClients]);

    useEffect(() => {
        const tempGuarantors = [...purchaseInfo.guarantorsInfo];
        if (numberOfGuarantors > tempGuarantors.length) {
            do {
                tempGuarantors.push(
                    new GuarantorInfo()
                );
            } while (numberOfGuarantors > tempGuarantors.length);
        }
        else if (numberOfGuarantors < tempGuarantors.length) {
            do {
                tempGuarantors.pop();
            } while (numberOfGuarantors < tempGuarantors.length);
        }

        setPurchaseInfo({ ...purchaseInfo, guarantorsInfo: tempGuarantors });

        // eslint-disable-next-line
    }, [numberOfGuarantors]);

    // useEffect(() => {
    //     if (purchaseInfo.forCompany) {
    //         setNumberOfClients(1);
    //     }
    //     else {
    //         setNumberOfClients(0);
    //     }

    // }, [purchaseInfo.forCompany]);

    useEffect(() => {
        if (currentPage === 'PROPERTY_INFO') {
            const top = document.querySelector('.top-second-page');
            if (top) {
                top.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }
    }, [currentPage]);

    return (

        <div className='modal fade' id='formModal' tabIndex={-1} aria-labelledby='formModalLabel' aria-hidden='true'
            data-bs-backdrop='static' data-bs-keyboard='false'>
            <div className={`modal-dialog modal-lg ${currentPage === 'PROPERTY_INFO' || (currentPage === 'GET_PURCHASERS' && purchaseInfo.clientsInfo.length !== 0) ? 'modal-dialog-centered' : 'modal-near-top'} modal-dialog-scrollable`}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h1 className='modal-title fs-5' id='exampleModalLabel'>
                            <House />

                            {
                                currentPage === 'GET_PURCHASERS' &&
                                <span>PURCHASE - Purchaser Information</span>
                            }

                            {
                                currentPage === 'PROPERTY_INFO' &&
                                <span>PURCHASE - Property Details</span>
                            }

                            {
                                currentPage === 'CONFIRM_SUBMIT' &&
                                <span>PURCHASE - Ready to Submit</span>
                            }

                            {
                                currentPage === 'SUBMITTING' &&
                                <span>PURCHASE - Please Wait</span>
                            }

                            {
                                currentPage === 'SUBMIT_RESULT' &&
                                <span>PURCHASE - Success!</span>
                            }

                            {
                                currentPage === 'SUBMIT_ERROR' &&
                                <span>PURCHASE - Error!</span>
                            }


                        </h1>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className='modal-body'>
                        {
                            <div className='container'>
                                <div className='container'>
                                    {
                                        currentPage === 'GET_PURCHASERS' &&
                                        <>
                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <h6>
                                                        Purchaser Information
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row align-items-center'>
                                                <div className='col col-5 mb-3'>
                                                    <h6>
                                                        How many purchasers are there?
                                                    </h6>
                                                </div>

                                                <div className='col col-7 mb-3'>
                                                    <select className='form-select p-3' aria-label='Purchasers'
                                                        value={numberOfClients}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                            if (e && e.target && e.target.value) {
                                                                setNumberOfClients(parseInt(e.target.value));
                                                            }
                                                        }}>
                                                        <option value='0'>Please choose</option>
                                                        <option value='1'>1</option>
                                                        <option value='2'>2</option>
                                                        <option value='3'>3</option>
                                                        <option value='4'>4</option>
                                                        <option value='5'>5</option>
                                                        <option value='6'>6</option>
                                                    </select>
                                                    <div className='d-flex flex-nowrap pt-2'>
                                                        <input type='checkbox' id='iscompany' checked={purchaseInfo.forCompany}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, forCompany: e.target.checked });

                                                                if (e.target.checked) {
                                                                    setNumberOfClients(1);
                                                                }
                                                                else {
                                                                    setNumberOfClients(0);
                                                                }
                                                            }} />
                                                        <label htmlFor='iscompany' className='ps-2'>
                                                            This is for a company
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {
                                                purchaseInfo.forCompany &&
                                                <>
                                                    <div className='row'>
                                                        <div className='col mb-1 mt-4'>
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


                                                    <div className='row'>

                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='companyname' placeholder='Company name'
                                                                    value={purchaseInfo.companyName}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, companyName: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='companyname'>
                                                                    Company name (required)
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='incorporationnumber' placeholder='Incorporation #'
                                                                    value={purchaseInfo.incorporationNumber}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, incorporationNumber: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    Incorporation # (required)
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            }

                                            {
                                                numberOfClients > 0 &&
                                                <>
                                                    {
                                                        purchaseInfo.clientsInfo.map((c, i) => {
                                                            return (
                                                                <Client text={purchaseInfo.forCompany ? 'Signatory' : 'Purchaser'}
                                                                    num={i}
                                                                    key={i}
                                                                    clientInfo={purchaseInfo.clientsInfo[i]}
                                                                    client1Info={purchaseInfo.clientsInfo.length > 1 ? purchaseInfo.clientsInfo[0] : null}
                                                                    company={purchaseInfo.forCompany}
                                                                    updated={(c: ClientInfo, idx: number) => {
                                                                        const tempClients: ClientInfo[] = [];
                                                                        for (let t = 0; t < purchaseInfo.clientsInfo.length; t++) {
                                                                            if (t === idx) {
                                                                                tempClients.push(c);
                                                                            }
                                                                            else {
                                                                                tempClients.push(purchaseInfo.clientsInfo[t]);
                                                                            }
                                                                        }
                                                                        setPurchaseInfo({ ...purchaseInfo, clientsInfo: tempClients });
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
                                        currentPage === 'PROPERTY_INFO' &&
                                        <>
                                            <div className='row'>
                                                <div className='col mb-1 mt-2 top-second-page'>
                                                    &nbsp;
                                                </div>
                                            </div>
                                            <div className='row'>

                                                <div className='col mb-1'>
                                                    <h6>
                                                        <CircleBullet />
                                                        Purchase and Property Information
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>

                                                        <DateInput
                                                            className='form-control'
                                                            id={`completiondate`}
                                                            value={purchaseInfo.completionDateTBD ? null : purchaseInfo.completionDate}
                                                            min={new Date((new Date()).setFullYear(new Date().getFullYear() - 5))}
                                                            label='Completion date'
                                                            onChange={(e) => {
                                                                if (e) {
                                                                    setPurchaseInfo({ ...purchaseInfo, completionDate: e });
                                                                }

                                                            }} />

                                                    </div>
                                                    <div className='mt-1'>
                                                        <input type='checkbox' id='chkdatetbd' checked={purchaseInfo.completionDateTBD}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, completionDateTBD: e.target.checked });
                                                            }} />
                                                        <label htmlFor='chkdatetbd' className='me-1 ms-1'>
                                                            Date still to be determined
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='number' className='form-control is-required' id='purchaseprice' placeholder='Purchase price'
                                                            value={purchaseInfo.purchasePrice}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target) {
                                                                    setPurchaseInfo({
                                                                        ...purchaseInfo,
                                                                        purchasePrice: e.target.value ? parseFloat(e.target.value).toString() : '',
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                        <div className="invalid-feedback">
                                                            Please enter this field
                                                        </div>

                                                        <label htmlFor='floatingInput'>
                                                            Purchase price (CAD)
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div className='col mb-1 mt-4'>
                                                    <h6>
                                                        <CircleBullet />
                                                        Address of purchased property
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control is-required' id='purchasestreet1' placeholder='Street address line 1'
                                                            value={purchaseInfo.street1}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, street1: e.target.value });
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

                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='purchasestreet2' placeholder='Street address line 2'
                                                            value={purchaseInfo.street2}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, street2: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Street address line 2
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control is-required' id='purchasecity' placeholder='City'
                                                            value={purchaseInfo.city}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, city: e.target.value });
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
                                                <div className='col mb-3'>
                                                    <select className='form-select p-3 is-required' aria-label='Province or territory'
                                                        value={purchaseInfo.provinceTerritory}
                                                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                            setPurchaseInfo({ ...purchaseInfo, provinceTerritory: e.target.value });
                                                        }}
                                                    >
                                                        <option value='0'>Province or territory</option>
                                                        <option value='Alberta'>Alberta</option>
                                                        <option value='British Columbia'>British Columbia</option>
                                                        <option value='Manitoba'>Manitoba</option>
                                                        <option value='New Brunswick'>New Brunswick</option>
                                                        <option value='Newfoundland and Labrador'>Newfoundland and Labrador</option>
                                                        <option value='Northwest Territories'>Northwest Territories</option>
                                                        <option value='Nova Scotia'>Nova Scotia</option>
                                                        <option value='Nunavut'>Nunavut</option>
                                                        <option value='Ontario'>Ontario</option>
                                                        <option value='Prince Edward Island'>Prince Edward Island</option>
                                                        <option value='Quebec'>Québec</option>
                                                        <option value='Saskatchewan'>Saskatchewan</option>
                                                        <option value='Yukon'>Yukon</option>
                                                    </select>
                                                    <div className="invalid-feedback">
                                                        Please enter this field
                                                    </div>

                                                </div>
                                            </div>
                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control is-required' id='purchasepostalcode' placeholder='Postal code'
                                                            value={purchaseInfo.postalCode}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, postalCode: e.target.value });
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

                                            {
                                                purchaseInfo.clientsInfo.length > 1 &&
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
                                                                    checked={purchaseInfo.joinType === 'JOINT_TENANTS'}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        if (e.target.checked) {
                                                                            const tempClients = [];
                                                                            for (const client of purchaseInfo.clientsInfo) {
                                                                                client.tenantInCommonPercent = 0;
                                                                                tempClients.push(client);
                                                                            }

                                                                            setPurchaseInfo({ ...purchaseInfo, joinType: 'JOINT_TENANTS', clientsInfo: tempClients, });
                                                                        }
                                                                    }}
                                                                />
                                                                <label className='form-check-label' htmlFor='jointtenants'>
                                                                    Joint Tenants
                                                                </label>
                                                            </div>

                                                            <div className='form-check'>
                                                                <input className='form-check-input' type='radio' name='ownertype' id='tenantsincommon'
                                                                    checked={purchaseInfo.joinType === 'TENANTS_IN_COMMON'}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        if (e.target.checked) {
                                                                            const tempClients = [];
                                                                            for (const client of purchaseInfo.clientsInfo) {
                                                                                client.tenantInCommonPercent = 0;
                                                                                tempClients.push(client);
                                                                            }

                                                                            setPurchaseInfo({ ...purchaseInfo, joinType: 'TENANTS_IN_COMMON', clientsInfo: tempClients, });
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

                                                            <a href='https://www.dbmrealestatelaw.com/joint-tenancy-vs-tenancy-common/' target='_blank' rel='noreferrer'>
                                                                https://www.dbmrealestatelaw.com/joint-tenancy-vs-tenancy-common/
                                                            </a>
                                                        </div>

                                                    </div>
                                                </>
                                            }

                                            {
                                                purchaseInfo.joinType === 'TENANTS_IN_COMMON' &&
                                                <>
                                                    <div className='row'>
                                                        <div className='col mb-1 mt-4 newused'>
                                                            <h6>
                                                                <CircleBullet />
                                                                Tenants-In-Common Percentages (leave at zero if unknown)
                                                            </h6>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col'>
                                                            <div style={{
                                                                display: 'grid',
                                                                gridTemplateColumns: 'auto 1fr',
                                                                columnGap: '20px',
                                                                rowGap: '10px',
                                                            }}>
                                                                {purchaseInfo.clientsInfo.map((c, idx) => {
                                                                    return (
                                                                        <Fragment key={idx}>
                                                                            <div >
                                                                                <span>
                                                                                    {c.fullLegalName}
                                                                                </span>
                                                                            </div>

                                                                            <div key={idx}>
                                                                                <input type='number' min={0} max={100}
                                                                                    className='tenantscommonpercentage'
                                                                                    value={c.tenantInCommonPercent}
                                                                                    onChange={((e) => {
                                                                                        const temp = [];

                                                                                        for (const t of purchaseInfo.clientsInfo) {
                                                                                            if (t.fullLegalName === c.fullLegalName) {
                                                                                                t.tenantInCommonPercent = parseFloat(e.target.value);
                                                                                            }

                                                                                            temp.push(t);
                                                                                        }

                                                                                        setPurchaseInfo({ ...purchaseInfo, clientsInfo: temp });
                                                                                    })}
                                                                                />
                                                                            </div>
                                                                        </Fragment>
                                                                    );
                                                                })}
                                                                <div>

                                                                </div>
                                                                <div className='tenantscommonerror' style={{
                                                                    display: 'none',
                                                                    color: 'red',
                                                                }}>
                                                                    These must either all be zero or add to 100
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            }

                                            <div className='row'>
                                                <div className='col mb-1 mt-4 newused'>
                                                    <h6>
                                                        <CircleBullet />
                                                        Is this a NEW or USED building? (required)
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name='neworused' id='neworused-yes'
                                                            checked={purchaseInfo.buildingNewUsed === 'NEW'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setPurchaseInfo({ ...purchaseInfo, buildingNewUsed: 'NEW' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor='neworused-yes'>
                                                            New
                                                        </label>
                                                    </div>

                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name='neworused' id='neworused-no'
                                                            checked={purchaseInfo.buildingNewUsed === 'USED'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setPurchaseInfo({ ...purchaseInfo, buildingNewUsed: 'USED' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor='neworused-no'>
                                                            Used
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-1 mt-4'>
                                                    <h6>
                                                        <CircleBullet />
                                                        Your realtor information (if applicable)
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='realtorname' placeholder='Realtor name'
                                                            value={purchaseInfo.realtorName}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, realtorName: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Realtor name
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='tel' className='form-control' id='realtorphone' placeholder='Phone number'
                                                            value={purchaseInfo.realtorPhone}
                                                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, realtorPhone: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Phone number - format: 123-456-7890
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div className='col mb-1 mt-4'>
                                                    <h6>
                                                        <CircleBullet />
                                                        If you are getting a mortgage, Bank or Mortgage Lender information (if applicable)
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='lendername' placeholder='Lender name'
                                                            value={purchaseInfo.lenderName}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, lenderName: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Lender name
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row'>

                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='brokerbankername' placeholder='Broker/Banker name'
                                                            value={purchaseInfo.brokerBankerName}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, brokerBankerName: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Broker/Banker name
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='tel' className='form-control' id='lenderphone' placeholder='Phone number'
                                                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' value={purchaseInfo.brokerBankerPhone}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, brokerBankerPhone: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Phone number - format: 123-456-7890
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div className='col mb-1 mt-4'>
                                                    <h6>
                                                        <CircleBullet />
                                                        If this is a strata, please enter the following information (if applicable)
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='strataname' placeholder='Strata name'
                                                            value={purchaseInfo.strataName}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, strataName: e.target.value });
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
                                                        If applicable, the parking stall number(s) and storage locker number(s):
                                                    </h6>
                                                </div>
                                            </div>


                                            <div className='row'>

                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='parkingstalls' placeholder='Parking stalls'
                                                            value={purchaseInfo.parkingStallNumbers}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, parkingStallNumbers: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Parking stall(s)
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='storagelockers' placeholder='Storage lockers'
                                                            value={purchaseInfo.storageLockerNumbers}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, storageLockerNumbers: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Storage locker(s)
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div className='col mb-1 mt-4'>
                                                    <h6>
                                                        <CircleBullet />
                                                        Your house insurance information (if applicable)
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='text' className='form-control' id='insurancename' placeholder='Agent name'
                                                            value={purchaseInfo.insuranceAgentName}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, insuranceAgentName: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Agent name
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className='col mb-3'>
                                                    <div className='form-floating mb-0'>
                                                        <input type='tel' className='form-control' id='insurancenumber' placeholder='Agent number'
                                                            value={purchaseInfo.insuranceAgentPhone}
                                                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                setPurchaseInfo({ ...purchaseInfo, insuranceAgentPhone: e.target.value });
                                                            }}
                                                        />
                                                        <label htmlFor='floatingInput'>
                                                            Phone number - format: 123-456-7890
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div className='col mb-1 mt-4'>
                                                    <h6>
                                                        <CircleBullet />
                                                        Will any portion of the property be rented out?
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>
                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name='rented' id='rented-yes'
                                                            checked={purchaseInfo.portionPropertyRentedOut === 'YES'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setPurchaseInfo({ ...purchaseInfo, portionPropertyRentedOut: 'YES' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor='rented-yes'>
                                                            Yes
                                                        </label>
                                                    </div>

                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name='rented' id='rented-no'
                                                            checked={purchaseInfo.portionPropertyRentedOut === 'NO'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setPurchaseInfo({ ...purchaseInfo, portionPropertyRentedOut: 'NO' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor='rented-no'>
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div className='col mb-1 mt-4'>
                                                    <h6>
                                                        <CircleBullet />
                                                        If you will need to bring in funds to complete this transaction, please advise where
                                                        the funds will be coming from (NOTE: required by the B.C. Government)
                                                    </h6>
                                                </div>
                                            </div>


                                            <div className='row'>
                                                <div className='col mb-1'>
                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-notapplicable`}
                                                            checked={purchaseInfo.fundsSource === ''}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setPurchaseInfo({ ...purchaseInfo, fundsSource: '' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor={`fundsource-notapplicable`}>
                                                            Not applicable
                                                        </label>
                                                    </div>

                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-chequing`}
                                                            checked={purchaseInfo.fundsSource === 'CHEQUING_ACCOUNT'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setPurchaseInfo({ ...purchaseInfo, fundsSource: 'CHEQUING_ACCOUNT' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor={`fundsource-chequing`}>
                                                            Chequing Account
                                                        </label>
                                                    </div>

                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-saving`}
                                                            checked={purchaseInfo.fundsSource === 'SAVINGS_ACCOUNT'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setPurchaseInfo({ ...purchaseInfo, fundsSource: 'SAVINGS_ACCOUNT' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor={`fundsource-saving`}>
                                                            Savings Account
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className='col mb-1'>
                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-heloc`}
                                                            checked={purchaseInfo.fundsSource === 'HELOC'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setPurchaseInfo({ ...purchaseInfo, fundsSource: 'HELOC' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor={`fundsource-heloc`}>
                                                            Home Equity Line of Credit
                                                        </label>
                                                    </div>


                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-another`}
                                                            checked={purchaseInfo.fundsSource === 'ANOTHER_INDIVIDUAL'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setPurchaseInfo({ ...purchaseInfo, fundsSource: 'ANOTHER_INDIVIDUAL' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor={`fundsource-another`}>
                                                            Another individual
                                                        </label>
                                                    </div>
                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-other`}
                                                            checked={purchaseInfo.fundsSource === 'OTHER'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    setPurchaseInfo({ ...purchaseInfo, fundsSource: 'OTHER' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor={`fundsource-other`}>
                                                            Other
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className='col mb-1 mt-4'>

                                                </div>
                                            </div>

                                            {
                                                (purchaseInfo.fundsSource && (purchaseInfo.fundsSource === 'CHEQUING_ACCOUNT' || purchaseInfo.fundsSource === 'SAVINGS_ACCOUNT')) &&
                                                <>
                                                    <div className='row'>
                                                        <div className='col mb-1 mt-4'>
                                                            <h6>
                                                                <CircleBullet />
                                                                If coming from your savings or chequing account, where was the funds come from
                                                                (i.e. savings, sale of property, gift, etc)
                                                            </h6>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='fundschequingsource' placeholder='Funds source'
                                                                    value={purchaseInfo.fundsChequingSavingsSource}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, fundsChequingSavingsSource: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    Savings, sale of property, gift, etc
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            }

                                            {
                                                purchaseInfo.fundsSource === 'ANOTHER_INDIVIDUAL' &&
                                                <>
                                                    <div className='row'>
                                                        <div className='col mb-1 mt-4'>
                                                            <h6>
                                                                <CircleBullet />
                                                                If the funds came from someone else who is not a purchaser, please provide the
                                                                name, phone number, address and occupation, and relationship of that payer
                                                            </h6>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='othername' placeholder='Name'
                                                                    value={purchaseInfo.nonPurchaserName}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserName: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    Name
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='tel' className='form-control' id='otherphone' placeholder='Phone number'
                                                                    value={purchaseInfo.nonPurchaserPhone}
                                                                    pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserPhone: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    Phone number - format: 123-456-7890
                                                                </label>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row'>
                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='otheroccupation' placeholder='Occupation'
                                                                    value={purchaseInfo.nonPurchaserOccupation}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserOccupation: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    Occupation
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='otheroccupation' placeholder='Relationship'
                                                                    value={purchaseInfo.nonPurchaserRelationship}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserRelationship: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    Relationship to you
                                                                </label>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className='row'>
                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='otherstreet1' placeholder='Street address line 1'
                                                                    value={purchaseInfo.nonPurchaserStreet1}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserStreet1: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    Street address line 1
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='otherstreet2' placeholder='Street address line 2'
                                                                    value={purchaseInfo.nonPurchaserStreet2}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserStreet2: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    Street address line 2
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='othercity' placeholder='City'
                                                                    value={purchaseInfo.nonPurchaserCity}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserCity: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    City
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className='col mb-3'>
                                                            <select className='form-select p-3' aria-label='Province or territory'
                                                                value={purchaseInfo.nonPurchaserProvinceTerritory}
                                                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                                                    setPurchaseInfo({ ...purchaseInfo, nonPurchaserProvinceTerritory: e.target.value });
                                                                }}
                                                            >
                                                                <option value='0'>Province or territory</option>
                                                                <option value='Alberta'>Alberta</option>
                                                                <option value='British Columbia'>British Columbia</option>
                                                                <option value='Manitoba'>Manitoba</option>
                                                                <option value='New Brunswick'>New Brunswick</option>
                                                                <option value='Newfoundland and Labrador'>Newfoundland and Labrador</option>
                                                                <option value='Northwest Territories'>Northwest Territories</option>
                                                                <option value='Nova Scotia'>Nova Scotia</option>
                                                                <option value='Nunavut'>Nunavut</option>
                                                                <option value='Ontario'>Ontario</option>
                                                                <option value='Prince Edward Island'>Prince Edward Island</option>
                                                                <option value='Quebec'>Québec</option>
                                                                <option value='Saskatchewan'>Saskatchewan</option>
                                                                <option value='Yukon'>Yukon</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col mb-3'>
                                                            <div className='form-floating mb-0'>
                                                                <input type='text' className='form-control' id='otherpostalcode' placeholder='Postal code'
                                                                    value={purchaseInfo.postalCode}
                                                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserPostalCode: e.target.value });
                                                                    }}
                                                                />
                                                                <label htmlFor='floatingInput'>
                                                                    Postal code
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className='col mb-3'>

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
                                                        value={purchaseInfo.guarantorsInfo.length}
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
                                                        purchaseInfo.guarantorsInfo.map((c, i) => {
                                                            return (
                                                                <Guarantor text={'Guarantor/Co-signer'}
                                                                    num={i}
                                                                    key={i}
                                                                    numberOfPurchasers={purchaseInfo.clientsInfo.length}
                                                                    guarantorInfo={purchaseInfo.guarantorsInfo[i]}
                                                                    updated={(c: GuarantorInfo, idx: number) => {
                                                                        const tempGuarantors: GuarantorInfo[] = [];
                                                                        for (let t = 0; t < purchaseInfo.guarantorsInfo.length; t++) {
                                                                            if (t === idx) {
                                                                                tempGuarantors.push(c);
                                                                            }
                                                                            else {
                                                                                tempGuarantors.push(purchaseInfo.guarantorsInfo[t]);
                                                                            }
                                                                        }
                                                                        setPurchaseInfo({ ...purchaseInfo, guarantorsInfo: tempGuarantors });
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
                                                        Do you have an appointment location preference?
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className='row'>
                                                <div className='col mb-3'>

                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name='apptlocation' id='apptlocation-coquitlam'
                                                            checked={purchaseInfo.apptLocationPreference === 'COQUITLAM'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setPurchaseInfo({ ...purchaseInfo, apptLocationPreference: 'COQUITLAM' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor='apptlocation-coquitlam'>
                                                            Coquitlam
                                                        </label>
                                                    </div>

                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name='apptlocation' id='apptlocation-vancouver'
                                                            checked={purchaseInfo.apptLocationPreference === 'VANCOUVER'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setPurchaseInfo({ ...purchaseInfo, apptLocationPreference: 'VANCOUVER' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor='apptlocation-vancouver'>
                                                            Vancouver
                                                        </label>
                                                    </div>

                                                    <div className='form-check'>
                                                        <input className='form-check-input' type='radio' name='apptlocation' id='apptlocation-langley'
                                                            checked={purchaseInfo.apptLocationPreference === 'LANGLEY'}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                                                    setPurchaseInfo({ ...purchaseInfo, apptLocationPreference: 'LANGLEY' });
                                                                }
                                                            }} />
                                                        <label className='form-check-label' htmlFor='apptlocation-langley'>
                                                            Langley
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

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
                                                        value={purchaseInfo.additionalComments}
                                                        rows={6}
                                                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                                            setPurchaseInfo({ ...purchaseInfo, additionalComments: e.target.value });
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
                                        <SubmitError onClick={() => submitPurchaseForm()} />
                                    }

                                    {
                                        currentPage === 'CONFIRM_SUBMIT' &&
                                        <SubmitConfirm
                                            text='Submit your purchase information to Drysdale Bacon McStravick?'
                                        />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className='modal-footer'>
                        {
                            (currentPage === 'GET_PURCHASERS' && (purchaseInfo.forCompany || numberOfClients !== 0)) &&
                            <>
                                <div className='row'>
                                    <div className='col mb-3 mt-4 text-danger fw-semibold error-label'>
                                        {
                                            missingInfo &&
                                            <h6>
                                                Please fill in all required information
                                            </h6>
                                        }
                                    </div>
                                    <div className='col mb-3 mt-4' style={{
                                        textAlign: 'right',
                                    }}>
                                        <input type='submit' value='Next' className='btn btn-primary form-button'
                                            onClick={() => {
                                                if (checkInputs()) {
                                                    setCurrentPage('PROPERTY_INFO');
                                                    setMissingInfo(false);
                                                }
                                                else {
                                                    setMissingInfo(true);
                                                }
                                            }} />
                                    </div>
                                </div>

                            </>
                        }

                        {
                            currentPage === 'PROPERTY_INFO' &&
                            <>
                                <div className='row gy-3'>
                                    <div className='col col-auto mb-3 mt-4 text-danger fw-semibold error-label'>
                                        <h6 style={{
                                            visibility: missingInfo ? 'visible' : 'hidden',
                                        }}>
                                            Please fill in all required information
                                        </h6>
                                    </div>

                                    <div className='col text-end'>
                                        <input type='button' value='Back to Purchasers' className='btn btn-secondary form-button me-2'
                                            onClick={() => setCurrentPage('GET_PURCHASERS')} />
                                    </div>

                                    <div className='col text-end'>

                                        <input type='button' value='Submit' className='btn btn-primary form-button'
                                            onClick={() => {
                                                if (checkInputs()) {
                                                    setCurrentPage('CONFIRM_SUBMIT');
                                                    setMissingInfo(false);
                                                }
                                                else {
                                                    setMissingInfo(true);
                                                }

                                            }} />
                                    </div>
                                </div>
                            </>
                        }

                        {
                            currentPage === 'CONFIRM_SUBMIT' &&
                            <>
                                <div className='row'>
                                    <div className='col mb-3 mt-4' style={{
                                        textAlign: 'right',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        <input type='button' value='Go back' className='btn btn-secondary form-button me-2'
                                            onClick={() => setCurrentPage('PROPERTY_INFO')} />

                                        <input type='button' value='Submit to DBM' className='btn btn-primary form-button'
                                            onClick={() => {
                                                setCurrentPage('SUBMITTING');
                                                submitPurchaseForm();
                                            }} />
                                    </div>
                                </div>
                            </>
                        }

                        {
                            currentPage === 'SUBMIT_RESULT' &&
                            <>
                                <div className='row'>
                                    <div className='col mb-3 mt-4' style={{
                                        textAlign: 'right',
                                        whiteSpace: 'nowrap',
                                    }}>
                                        <input
                                            type='button' value='Finish' className='btn btn-primary form-button'
                                            data-bs-dismiss='modal' aria-label='Close'
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

const getOutput = (purchaseInfo: PurchaseInfo): string => {

    const output: string[] = [];

    output.push('<html><b>PURCHASE</b><br />');
    output.push('<table>');

    if (purchaseInfo.forCompany) {
        output.push(getEntry('Company', purchaseInfo.companyName));
        output.push(getEntry('Incorporation Number', purchaseInfo.incorporationNumber));

        output.push(getEntry('Signatory Full Legal Name', purchaseInfo.clientsInfo[0].fullLegalName));


        output.push(getEntry('Phone Number', purchaseInfo.clientsInfo[0].phoneNumber));
        output.push(getEntry('Email', purchaseInfo.clientsInfo[0].emailAddress));
        output.push(getEntry('Street 1', purchaseInfo.clientsInfo[0].mailingStreet1));
        output.push(getEntry('Street 2', purchaseInfo.clientsInfo[0].mailingStreet2));
        output.push(getEntry('Province or Territory', purchaseInfo.clientsInfo[0].mailingProvinceTerritory));
        output.push(getEntry('Postal Code', purchaseInfo.clientsInfo[0].mailingPostalCode, true));
    }
    else {
        for (let i = 0; i < purchaseInfo.clientsInfo.length; i++) {

            const client = purchaseInfo.clientsInfo[i];

            output.push(getHeader(`PURCHASER ${(i + 1).toString()}`));
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

            output.push(getEntry('Citizenship', citizenShip, true));

            output.push(getEntry('BC Resident 1 yr+', client.hasBeenBCResidentForAYear));
            output.push(getEntry('First Time Home Buyer', client.isFirstTimeHomeBuyer));
            output.push(getEntry('Will live in property within 3 months', client.willBeLivingInPropertyWithinThreeMonths));
            output.push(getEntry('Has owned principal residence elsewhere', client.hasOwnedPrincipalResidenceSomewhere, true));
        }
    }

    // property details

    output.push(getHeader('PROPERTY DETAILS'));

    //output.push(getEntry('Completion Date', purchaseInfo.completionDate.toISOString().split('T')[0]));
    output.push(getEntry('Completion Date', purchaseInfo.completionDateTBD ? 'TBD' : purchaseInfo.completionDate ? purchaseInfo.completionDate.toISOString().split('T')[0] : ''));
    output.push(getEntry('Purchase Price (CAD)', purchaseInfo.purchasePrice.toString()));
    output.push(getEntry('Street 1', purchaseInfo.street1));
    output.push(getEntry('Street 2', purchaseInfo.street2));
    output.push(getEntry('City', purchaseInfo.city));
    output.push(getEntry('Postal Code', purchaseInfo.postalCode, true));

    let joinType = '';
    if (purchaseInfo.clientsInfo.length === 1) {
        joinType = 'NOT APPLICABLE AS ONLY ONE PURCHASER';
    }
    else {
        switch (purchaseInfo.joinType) {
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

    output.push(getEntry('Tenancy', joinType, purchaseInfo.joinType !== 'TENANTS_IN_COMMON'));

    if (purchaseInfo.joinType === 'TENANTS_IN_COMMON') {
        for (const client of purchaseInfo.clientsInfo) {
            output.push(getEntry(`${client.fullLegalName}`, `${client.tenantInCommonPercent}%`));
        }
        output.push(getEntry('', '', true));
    }

    output.push(getEntry('Building New or Used', purchaseInfo.buildingNewUsed, true));

    output.push(getEntry('Realtor Name', purchaseInfo.realtorName));
    output.push(getEntry('Realtor Phone Number', purchaseInfo.realtorPhone, true));

    output.push(getEntry('Lender Name', purchaseInfo.lenderName));
    output.push(getEntry('Broker or Banker Name', purchaseInfo.brokerBankerName));
    output.push(getEntry('Broker or Banker Phone Number', purchaseInfo.brokerBankerPhone, true));

    output.push(getEntry('Strata Mgmt Company', purchaseInfo.strataName, true));

    output.push(getEntry('Parking Stall(s)', purchaseInfo.parkingStallNumbers));
    output.push(getEntry('Storage Locker(s)', purchaseInfo.storageLockerNumbers, true));

    output.push(getEntry('House Insurance Agent Name', purchaseInfo.insuranceAgentName));
    output.push(getEntry('House Insurance Agent Phone Number', purchaseInfo.insuranceAgentPhone, true));

    output.push(getEntry('Portion of Property to be Rented Out', purchaseInfo.portionPropertyRentedOut, true));

    let fundsSource = '';
    switch (purchaseInfo.fundsSource) {
        case 'ANOTHER_INDIVIDUAL':
            fundsSource = 'Another Individual';
            break;

        case 'CHEQUING_ACCOUNT':
            fundsSource = 'Chequing Account';
            break;

        case 'HELOC':
            fundsSource = 'Home Equity Line of Credit';
            break;

        case 'OTHER':
            fundsSource = 'Other';
            break;

        case 'SAVINGS_ACCOUNT':
            fundsSource = 'Savings Account';
            break;
    }

    output.push(getEntry('Funds Brought In Source', fundsSource, true));

    if (purchaseInfo.fundsSource === 'ANOTHER_INDIVIDUAL') {

        output.push(getEntry('Other Funder Name', purchaseInfo.nonPurchaserName));
        output.push(getEntry('Other Funder Phone Number', purchaseInfo.nonPurchaserPhone));
        output.push(getEntry('Other Funder Relationship', purchaseInfo.nonPurchaserRelationship));
        output.push(getEntry('Other Funder Occupation', purchaseInfo.nonPurchaserOccupation));
        output.push(getEntry('Other Funder Street 1', purchaseInfo.nonPurchaserStreet1));
        output.push(getEntry('Other Funder Street 2', purchaseInfo.nonPurchaserStreet2));
        output.push(getEntry('Other Funder City', purchaseInfo.nonPurchaserCity));
        output.push(getEntry('Other Funder Province or Territory', purchaseInfo.nonPurchaserProvinceTerritory));
        output.push(getEntry('Other Funder Postal Code', purchaseInfo.nonPurchaserPostalCode, true));
    }
    else if (purchaseInfo.fundsSource === 'CHEQUING_ACCOUNT' || purchaseInfo.fundsSource === 'SAVINGS_ACCOUNT') {
        output.push(getEntry('Chequing/Savings Source', purchaseInfo.fundsChequingSavingsSource, true));
    }

    for (let i = 0; i < purchaseInfo.guarantorsInfo.length; i++) {

        const guarantor = purchaseInfo.guarantorsInfo[i];

        output.push(getEntry(`GUARANTOR ${(i + 1).toString()}`, ''));
        output.push(getEntry('Full Legal Name', guarantor.fullLegalName));
        output.push(getEntry('Phone Number', guarantor.phoneNumber));
        output.push(getEntry('Email', guarantor.emailAddress));
        output.push(getEntry('Relationship', guarantor.relationship, true));
    }

    output.push(getEntry('Appointment Location Preference', purchaseInfo.apptLocationPreference, true));

    output.push(getEntry('Additional Comments', ''));
    output.push(getEntry(purchaseInfo.additionalComments, '', true));

    output.push('</table></html>');

    return output.join('');
}


export default PurchaseForm;