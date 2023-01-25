import React, { ReactElement, useEffect, useState } from 'react';
import { ClientInfo, SaleInfo } from '../../ClassesInterfaces';

import { checkInputs, FormProps, getEntry, getHeader, sendEmail } from '../../Helpers';
import { SubmitConfirm, SubmitDone, SubmitError, Submitting } from '../../controls/SubmitForms';
import House from '../../controls/House';
import ModalBottomButtons from '../../controls/ModalBottomButtons';
import SalesGetSellers from './1-SalesGetSellers';
import SalesGetSaleDetails from './2-SalesGetSaleDetails';

declare var bootstrap: any;

export interface SalesChildProps {
    saleInfo: SaleInfo;
    setSaleInfo: (info: SaleInfo) => void;
}

const SaleForm = (props: FormProps): ReactElement => {

    const [saleInfo, setSaleInfo] = useState(() => new SaleInfo());
    const [missingInfo, setMissingInfo] = useState(false);
    //const [numberOfSellers, setNumberOfSellers] = useState(0);
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

    // useEffect(() => {
    //     const tempSellers = [...saleInfo.clientsInfo];
    //     if (numberOfSellers > tempSellers.length) {
    //         do {
    //             tempSellers.push(
    //                 new ClientInfo()
    //             );
    //         } while (numberOfSellers > tempSellers.length);
    //     }
    //     else if (numberOfSellers < tempSellers.length) {
    //         do {
    //             tempSellers.pop();
    //         } while (numberOfSellers < tempSellers.length);
    //     }

    //     setSaleInfo({ ...saleInfo, clientsInfo: tempSellers });

    //     // eslint-disable-next-line
    // }, [numberOfSellers]);

    useEffect(() => {
        if (saleInfo.forCompany) {
            const temp: ClientInfo[] = [];
            temp.push(new ClientInfo());
            setSaleInfo({ ...saleInfo, clientsInfo: temp });
            //setNumberOfSellers(1);
        }
        else {
            setSaleInfo({ ...saleInfo, clientsInfo: [] });
            //setNumberOfSellers(0);
        }

        // eslint-disable-next-line
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
                                        <SalesGetSellers
                                            saleInfo={saleInfo}
                                            setSaleInfo={(info) => setSaleInfo(info)}
                                        />
                                    }

                                    {
                                        currentPage === 'GET_SALE_DETAILS' &&
                                        <SalesGetSaleDetails
                                            saleInfo={saleInfo}
                                            setSaleInfo={(info) => setSaleInfo(info)}
                                        />
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
                            (currentPage === 'GET_SELLERS' && (saleInfo.forCompany || saleInfo.clientsInfo.length !== 0)) &&

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