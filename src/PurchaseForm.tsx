import React, { ReactElement, useState } from 'react';
import Client from './Client';


const PurchaseForm = (): ReactElement => {

    const [clients, setClients] = useState('');

    const [currentPage, setCurrentPage] = useState(0);


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

                        <Client
                            text='Purchaser'
                        />

                        <div className="row">
                            <div className="col mb-3" style={{
                                textAlign: 'right',
                            }}>
                                <input type='button' value='Next' className='btn btn-primary form-button'
                                    onClick={() => setCurrentPage(1)} />
                            </div>
                        </div>

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
                                    <input type='number' className='form-control' id='purchaseprice' placeholder='Purchase price' />
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
                            <div className="col mb-3">

                            </div>
                        </div>




                        <div className="row">
                            <div className="col mb-3" style={{
                                textAlign: 'right',
                            }}>
                                <input type='button' value='Previous' className='btn btn-primary form-button me-5'
                                    onClick={() => setCurrentPage(1)} />

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