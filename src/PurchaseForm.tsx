import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import Client from './Client';
import { ClientInfo } from './Interfaces';

const PurchaseForm = (): ReactElement => {

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
                                    <input type='date' className='form-control' id='completiondate' placeholder='Completion date' />
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
                                                setPurchasePrice(parseFloat(e.target.value));
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
                                    <input type='text' className='form-control' id='purchasestreet1' placeholder='Street address line 1' />
                                    <label htmlFor='floatingInput'>
                                        Street address line 1
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='text' className='form-control' id='purchasestreet2' placeholder='Street address line 2' />
                                    <label htmlFor='floatingInput'>
                                        Street address line 2
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='text' className='form-control' id='purchasecity' placeholder='City' />
                                    <label htmlFor='floatingInput'>
                                        City
                                    </label>
                                </div>
                            </div>
                            <div className="col mb-3">
                                <div className='form-floating mb-0'>
                                    <input type='text' className='form-control' id='purchasepostalcode' placeholder='Postal code' />
                                    <label htmlFor='floatingInput'>
                                        Postal code
                                    </label>
                                </div>
                            </div>
                        </div>


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
                                    <input className="form-check-input" type="radio" name="ownertype" id="jointtenants" />
                                    <label className="form-check-label" htmlFor="jointtenants">
                                        Joint Tenants
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="ownertype" id="tenantsincommon" />
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

                                <a href='http://www.dbmrealestatelaw.com/joint-tenancy-vs-tenancy-common/' target='_blank'>
                                    http://www.dbmrealestatelaw.com/joint-tenancy-vs-tenancy-common/
                                </a>
                            </div>

                        </div>



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
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e && e.target && e.target.value && e.target.value === 'on') {
                                                setNewBuild(true);
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="neworused-yes">
                                        New
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="neworused" id="neworused-no"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e && e.target && e.target.value && e.target.value === 'on') {
                                                setNewBuild(false);
                                            }
                                        }} />
                                    <label className="form-check-label" htmlFor="neworused-no">
                                        Used
                                    </label>
                                </div>
                            </div>
                        </div>

                        {
                            (newBuild && purchasePrice < 800000) &&
                            <>
                                <div className="row">
                                    <div className="col mb-1 mt-4">
                                        <h6>
                                            Will you be moving into the property within three (3) months?
                                        </h6>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="movethreemonths" id="movethreemonths-yes"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if (e && e.target && e.target.value && e.target.value === 'on') {
                                                        setMoveThreeMonths(true);
                                                    }
                                                }} />
                                            <label className="form-check-label" htmlFor="movethreemonths-yes">
                                                Yes
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="movethreemonths" id="movethreemonths-no"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if (e && e.target && e.target.value && e.target.value === 'on') {
                                                        setMoveThreeMonths(false);
                                                    }
                                                }} />
                                            <label className="form-check-label" htmlFor="movethreemonths-no">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }

                        {
                            newBuild &&
                            <>
                                <div className="row">
                                    <div className="col mb-1 mt-4">
                                        <h6>
                                            Will you be moving into the property within three (3) months?
                                        </h6>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="movethreemonths" id="movethreemonths-yes"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if (e && e.target && e.target.value && e.target.value === 'on') {
                                                        setMoveThreeMonths(true);
                                                    }
                                                }} />
                                            <label className="form-check-label" htmlFor="movethreemonths-yes">
                                                Yes
                                            </label>
                                        </div>

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="movethreemonths" id="movethreemonths-no"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    if (e && e.target && e.target.value && e.target.value === 'on') {
                                                        setMoveThreeMonths(false);
                                                    }
                                                }} />
                                            <label className="form-check-label" htmlFor="movethreemonths-no">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }


                        <div className="row">
                            <div className="col mb-3" style={{
                                textAlign: 'right',
                            }}>
                                <input type='button' value='Previous' className='btn btn-primary form-button me-5'
                                    onClick={() => setCurrentPage(0)} />

                                <input type='button' value='Next' className='btn btn-primary form-button'
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