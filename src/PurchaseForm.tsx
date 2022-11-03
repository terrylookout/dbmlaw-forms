import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import Client from './Client';
import { ClientInfo, PurchaseInfo } from './ClassesInterfaces';

const PurchaseForm = (): ReactElement => {

    const [purchaseInfo, setPurchaseInfo] = useState(() => new PurchaseInfo());

    const [numberOfClients, setNumberOfClients] = useState(0);

    const [clients, setClients] = useState<ClientInfo[]>([]);

    const [currentPage, setCurrentPage] = useState(0);

    const [newBuild, setNewBuild] = useState(false);

    const [purchasePrice, setPurchasePrice] = useState(0);

    const [belowNewLimit, setBelowNewLimit] = useState(false);

    const [moveThreeMonths, setMoveThreeMonths] = useState(false);

    useEffect(() => {
        const tempClients = [...clients];
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

        setClients(tempClients);

        // eslint-disable-next-line
    }, [numberOfClients]);

    return (
        <div className='container'>
            <div className="container">
                {
                    currentPage === 0 &&
                    <>
                        <div className="row">
                            <div className="col mb-3">
                                <h6>
                                    Purchaser Information
                                </h6>
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col mb-3">
                                <h6>
                                    How many purchasers are there?
                                </h6>
                            </div>

                            <div className="col mb-3">
                                <select className="form-select p-3" aria-label="Province or territory"
                                    value={numberOfClients}
                                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                        if (e && e.target && e.target.value) {
                                            setNumberOfClients(parseInt(e.target.value));
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
                            numberOfClients > 0 &&
                            <>
                                {
                                    clients.map((c, i) => {
                                        return (
                                            <Client text='Purchaser' num={i}
                                                key={i}
                                                clientInfo={clients[i]}
                                                updated={(c: ClientInfo, idx: number) => {
                                                    const tempClients: ClientInfo[] = [];
                                                    for (let t = 0; t < clients.length; t++) {
                                                        if (t === idx) {
                                                            tempClients.push(c);
                                                        }
                                                        else {
                                                            tempClients.push(clients[t]);
                                                        }
                                                    }
                                                    setClients(tempClients);
                                                }}
                                            />
                                        );
                                    })
                                }

                                <div className="row">
                                    <div className="col mb-3 mt-4" style={{
                                        textAlign: 'right',
                                    }}>
                                        <input type='button' value='Next' className='btn btn-primary form-button'
                                            onClick={() => setCurrentPage(1)} />
                                    </div>
                                </div>
                            </>
                        }
                    </>
                }

                {
                    currentPage === 1 &&
                    <>
                        <div className="row">
                            <div className="col mb-3">
                                <h6>
                                    Purchase and Property Information
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='date' className='form-control' id='completiondate' placeholder='Completion date'
                                        value={purchaseInfo.completionDate.toISOString().split('T')[0]}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setPurchaseInfo({ ...purchaseInfo, completionDate: new Date(e.target.value) });
                                        }}
                                    />
                                    <label htmlFor='floatingInput'>
                                        Completion date
                                    </label>
                                </div>
                            </div>
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='number' className='form-control' id='purchaseprice' placeholder='Purchase price'
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e && e.target && e.target.value) {
                                                setPurchaseInfo({ ...purchaseInfo, purchasePrice: parseFloat(e.target.value) });
                                            }
                                        }}
                                    />
                                    <label htmlFor='floatingInput'>
                                        Purchase price
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    Address of purchased property
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='text' className='form-control' id='purchasestreet1' placeholder='Street address line 1'
                                        value={purchaseInfo.street1}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setPurchaseInfo({ ...purchaseInfo, street1: e.target.value });
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


                        <div className="row">
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='text' className='form-control' id='purchasecity' placeholder='City'
                                        value={purchaseInfo.city}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setPurchaseInfo({ ...purchaseInfo, city: e.target.value });
                                        }}
                                    />
                                    <label htmlFor='floatingInput'>
                                        City
                                    </label>
                                </div>
                            </div>
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='text' className='form-control' id='purchasepostalcode' placeholder='Postal code'
                                        value={purchaseInfo.postalCode}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setPurchaseInfo({ ...purchaseInfo, postalCode: e.target.value });
                                        }}
                                    />
                                    <label htmlFor='floatingInput'>
                                        Postal code
                                    </label>
                                </div>
                            </div>
                        </div>

                        {
                            clients.length > 1 &&
                            <>
                                <div className="row">
                                    <div className="col mb-1 mt-4">
                                        <h6>
                                            Do you want to own the property as Joint Tenants and or as Tenants-In-Common?
                                        </h6>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col mb-3">

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="ownertype" id="jointtenants"
                                                checked={purchaseInfo.joinType === 'JOINT_TENANTS'}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if (e.target.checked) {
                                                        setPurchaseInfo({ ...purchaseInfo, joinType: 'JOINT_TENANTS' });
                                                    }
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor="jointtenants">
                                                Joint Tenants
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="ownertype" id="tenantsincommon"
                                                checked={purchaseInfo.joinType === 'TENANTS_IN_COMMON'}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if (e.target.checked) {
                                                        setPurchaseInfo({ ...purchaseInfo, joinType: 'TENANTS_IN_COMMON' });
                                                    }
                                                }}

                                            />
                                            <label className="form-check-label" htmlFor="tenantsincommon">
                                                Tenants-In-Common
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="ownertype" id="notapplicable" />
                                            <label className="form-check-label" htmlFor="notapplicable">
                                                Not applicable
                                            </label>
                                        </div>

                                    </div>

                                    <div className="col-7 mb-3">

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


                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    Is this a NEW or USED building?
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="neworused" id="neworused-yes"
                                        checked={purchaseInfo.buildingNewUsed === 'NEW'}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e && e.target && e.target.value && e.target.value === 'on') {
                                                setPurchaseInfo({ ...purchaseInfo, buildingNewUsed: 'NEW' });
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="neworused-yes">
                                        New
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="neworused" id="neworused-no"
                                        checked={purchaseInfo.buildingNewUsed === 'USED'}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e && e.target && e.target.value && e.target.value === 'on') {
                                                setPurchaseInfo({ ...purchaseInfo, buildingNewUsed: 'USED' });
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="neworused-no">
                                        Used
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    Your realtor information
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
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
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='tel' className='form-control' id='realtorphone' placeholder='Phone number'
                                        value={purchaseInfo.realtorPhone}
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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


                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    If you are getting a mortgage, Bank or Mortgage Lender information
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
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

                        <div className="row">

                            <div className="col mb-3">
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

                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='tel' className='form-control' id='lenderphone' placeholder='Phone number'
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={purchaseInfo.brokerBankerPhone}
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


                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    If this is a strata, please enter the following information
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
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



                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    If applicable, the parking stall number(s) and storage locker number(s):
                                </h6>
                            </div>
                        </div>


                        <div className="row">

                            <div className="col mb-3">
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

                            <div className="col mb-3">
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


                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    Your house insurance information
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
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
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='tel' className='form-control' id='insurancenumber' placeholder='Agent number'
                                        value={purchaseInfo.insuranceAgentPhone}
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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


                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    Will any portion of the property be rented out?
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="rented" id="rented-yes"
                                        checked={purchaseInfo.portionPropertyRentedOut === 'YES'}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e && e.target && e.target.value && e.target.value === 'on') {
                                                setPurchaseInfo({ ...purchaseInfo, portionPropertyRentedOut: 'YES' });
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="rented-yes">
                                        Yes
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="rented" id="rented-no"
                                        checked={purchaseInfo.portionPropertyRentedOut === 'NO'}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e && e.target && e.target.value && e.target.value === 'on') {
                                                setPurchaseInfo({ ...purchaseInfo, portionPropertyRentedOut: 'NO' });
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="rented-no">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    If you will need to bring in funds to complete this transaction, please advise where
                                    the funds will be coming from (i.e. savings account, chequing account, Home Equity Line
                                    of Credit, etc)
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='text' className='form-control' id='fundssource' placeholder='Funds source'
                                        value={purchaseInfo.fundsSource}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setPurchaseInfo({ ...purchaseInfo, fundsSource: e.target.value });
                                        }}
                                    />
                                    <label htmlFor='floatingInput'>
                                        Funds source
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    If coming from your savings or chequing account, where was the funds come from
                                    (i.e. savings, sale of property, gift, etc)
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='text' className='form-control' id='fundschequingsource' placeholder='Funds source'
                                        value={purchaseInfo.fundsSource}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setPurchaseInfo({ ...purchaseInfo, fundsSource: e.target.value });
                                        }}
                                    />
                                    <label htmlFor='floatingInput'>
                                        Savings, sale of property, gift, etc
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    If the funds came from someone else who is not a purchaser, please provide the
                                    name, phone number, address and occupation, and relationship of that payer
                                </h6>
                            </div>
                        </div>




                        <div className="row">
                            <div className="col mb-1 mt-4">
                                <h6>
                                    Do you have an appointment location preference?
                                </h6>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="apptlocation" id="apptlocation-coquitlam"
                                        checked={purchaseInfo.apptLocationPreference === 'COQUITLAM'}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e && e.target && e.target.value && e.target.value === 'on') {
                                                setPurchaseInfo({ ...purchaseInfo, apptLocationPreference: 'COQUITLAM' });
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="apptlocation-coquitlam">
                                        Coquitlam
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="apptlocation" id="apptlocation-vancouver"
                                        checked={purchaseInfo.apptLocationPreference === 'VANCOUVER'}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e && e.target && e.target.value && e.target.value === 'on') {
                                                setPurchaseInfo({ ...purchaseInfo, apptLocationPreference: 'VANCOUVER' });
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="apptlocation-vancouver">
                                        Vancouver
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="apptlocation" id="apptlocation-langley"
                                        checked={purchaseInfo.apptLocationPreference === 'LANGLEY'}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e && e.target && e.target.value && e.target.value === 'on') {
                                                setPurchaseInfo({ ...purchaseInfo, apptLocationPreference: 'LANGLEY' });
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="apptlocation-langley">
                                        Langley
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col mb-3" style={{
                                textAlign: 'right',
                            }}>
                                <input type='button' value='Back to Purchasers' className='btn btn-primary form-button me-5'
                                    onClick={() => setCurrentPage(0)} />

                                <input type='button' value='Submit' className='btn btn-primary form-button'
                                    onClick={() => setCurrentPage(1)} />
                            </div>
                        </div>

                    </>
                }

            </div>


        </div>
    )

};

export default PurchaseForm;