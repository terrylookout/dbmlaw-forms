import React, { ReactElement, useEffect, useState } from 'react';
import { ClientInfo, GuarantorInfo, PurchaseInfo, SaleInfo } from '../../ClassesInterfaces';
import { checkInputs, FormProps, getEntry, getHeader, sendEmail } from '../../Helpers';
import { SubmitConfirm, SubmitDone, SubmitError, Submitting } from '../../controls/SubmitForms';
import House from '../../controls/House';
import ModalBottomButtons from '../../controls/ModalBottomButtons';
import GetSellers from './1-GetSellers';
import GetSaleDetails from './2-GetSaleDetails';
import GetPurchasers from './3-GetPurchasers';
import PropertyInfo from './4-PropertyInfo';

declare var bootstrap: any;

export interface SaleAndPurchaseProps {
    purchaseInfo: PurchaseInfo;
    setPurchaseInfo: (info: PurchaseInfo) => void;
    saleInfo: SaleInfo;
    setSaleInfo: (info: SaleInfo) => void;
    numberOfSellers: number;
    setNumberOfSellers: (info: number) => void;
    numberOfClients: number;
    setNumberOfClients: (info: number) => void;
    sellersArePurchasers: boolean;
    setSellersArePurchasers: (info: boolean) => void;
    numberOfGuarantors: number;
    setNumberOfGuarantors: (info: number) => void;
}

const SaleAndPurchaseForm = (props: FormProps): ReactElement => {

    const [purchaseInfo, setPurchaseInfo] = useState(() => new PurchaseInfo());
    const [saleInfo, setSaleInfo] = useState(() => new SaleInfo());

    const [missingInfo, setMissingInfo] = useState(false);

    const [numberOfSellers, setNumberOfSellers] = useState(0);
    const [numberOfClients, setNumberOfClients] = useState(0);
    const [numberOfGuarantors, setNumberOfGuarantors] = useState(0);

    const [sellersArePurchasers, setSellersArePurchasers] = useState(false);

    const [currentPage, setCurrentPage] = useState<
        'GET_SELLERS' | 'GET_SALE_DETAILS' |
        'GET_PURCHASERS' | 'PROPERTY_INFO' | 'CONFIRM_SUBMIT' | 'SUBMITTING' | 'SUBMIT_RESULT' |
        'SUBMIT_ERROR'
    >('GET_SELLERS');

    const [sendResult, setSendResult] = useState(-1);
    const [submitOk, setSubmitOk] = useState(false);

    const submitSaleAndPurchaseForm = async () => {

        setCurrentPage('SUBMITTING');
        setSendResult(-1);
        setTimeout(async () => {
            const result = await sendEmail('Sale and Purchase submission', getOutput(purchaseInfo, saleInfo));
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
            const bootModal = new bootstrap.Modal('#formModal');
            bootModal.show();

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
        if (sellersArePurchasers) {
            setNumberOfClients(saleInfo.clientsInfo.length);
        }
        // eslint-disable-next-line
    }, [sellersArePurchasers]);


    useEffect(() => {
        if (sellersArePurchasers && saleInfo.clientsInfo.length <= purchaseInfo.clientsInfo.length) {
            for (let i = 0; i < saleInfo.clientsInfo.length; i++) {
                purchaseInfo.clientsInfo[i] = { ...saleInfo.clientsInfo[i] };
            }
            setSellersArePurchasers(false);
        }
        // eslint-disable-next-line
    }, [purchaseInfo.clientsInfo]);

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

        if (sellersArePurchasers && saleInfo.clientsInfo.length <= tempClients.length) {
            for (let i = 0; i < saleInfo.clientsInfo.length; i++) {
                tempClients[i] = { ...saleInfo.clientsInfo[i] };
            }
        }

        setPurchaseInfo({ ...purchaseInfo, clientsInfo: tempClients });

        // eslint-disable-next-line
    }, [numberOfClients]);

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

    useEffect(() => {
        if (purchaseInfo.forCompany) {
            setNumberOfClients(1);
        }
        else {
            setNumberOfClients(0);
        }

    }, [purchaseInfo.forCompany]);

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
            <div className={`modal-dialog modal-lg ${currentPage === 'PROPERTY_INFO' ||
                currentPage === 'GET_SALE_DETAILS' ||
                (currentPage === 'GET_SELLERS' && saleInfo.clientsInfo.length !== 0) ||
                (currentPage === 'GET_PURCHASERS' && purchaseInfo.clientsInfo.length !== 0) ? 'modal-dialog-centered' : 'modal-near-top'} modal-dialog-scrollable`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            <House />
                            {
                                currentPage === 'GET_SELLERS' &&
                                <span>SALE &amp; PURCHASE - Your Sale Information</span>
                            }
                            {
                                currentPage === 'GET_SALE_DETAILS' &&
                                <span>SALE &amp; PURCHASE - Sale Details</span>
                            }

                            {
                                currentPage === 'GET_PURCHASERS' &&
                                <span>SALE &amp; PURCHASE - Your Purchase Information</span>
                            }

                            {
                                currentPage === 'PROPERTY_INFO' &&
                                <span>SALE &amp; PURCHASE - Property Details</span>
                            }

                            {
                                currentPage === 'CONFIRM_SUBMIT' &&
                                <span>SALE &amp; PURCHASE - Ready to Submit</span>
                            }

                            {
                                currentPage === 'SUBMITTING' &&
                                <span>SALE &amp; PURCHASE - Please Wait</span>
                            }

                            {
                                currentPage === 'SUBMIT_ERROR' &&
                                <span>SALE &amp; PURCHASE - Error!</span>
                            }

                            {
                                currentPage === 'SUBMIT_RESULT' &&
                                <span>SALE &amp; PURCHASE - Success!</span>
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
                                        <GetSellers
                                            numberOfSellers={numberOfSellers}
                                            purchaseInfo={purchaseInfo}
                                            saleInfo={saleInfo}
                                            setNumberOfSellers={setNumberOfSellers}
                                            setPurchaseInfo={setPurchaseInfo}
                                            setSaleInfo={setSaleInfo}
                                            numberOfClients={numberOfClients}
                                            sellersArePurchasers={sellersArePurchasers}
                                            setNumberOfClients={setNumberOfClients}
                                            setSellersArePurchasers={setSellersArePurchasers}
                                            numberOfGuarantors={numberOfGuarantors}
                                            setNumberOfGuarantors={setNumberOfGuarantors}
                                        />

                                    }

                                    {
                                        currentPage === 'GET_SALE_DETAILS' &&
                                        <GetSaleDetails
                                            numberOfSellers={numberOfSellers}
                                            purchaseInfo={purchaseInfo}
                                            saleInfo={saleInfo}
                                            setNumberOfSellers={setNumberOfSellers}
                                            setPurchaseInfo={setPurchaseInfo}
                                            setSaleInfo={setSaleInfo}
                                            numberOfClients={numberOfClients}
                                            sellersArePurchasers={sellersArePurchasers}
                                            setNumberOfClients={setNumberOfClients}
                                            setSellersArePurchasers={setSellersArePurchasers}
                                            numberOfGuarantors={numberOfGuarantors}
                                            setNumberOfGuarantors={setNumberOfGuarantors}
                                        />
                                    }

                                    {
                                        currentPage === 'GET_PURCHASERS' &&
                                        <GetPurchasers
                                            numberOfSellers={numberOfSellers}
                                            purchaseInfo={purchaseInfo}
                                            saleInfo={saleInfo}
                                            setNumberOfSellers={setNumberOfSellers}
                                            setPurchaseInfo={setPurchaseInfo}
                                            setSaleInfo={setSaleInfo}
                                            numberOfClients={numberOfClients}
                                            sellersArePurchasers={sellersArePurchasers}
                                            setNumberOfClients={setNumberOfClients}
                                            setSellersArePurchasers={setSellersArePurchasers}
                                            numberOfGuarantors={numberOfGuarantors}
                                            setNumberOfGuarantors={setNumberOfGuarantors}
                                        />
                                    }

                                    {
                                        currentPage === 'PROPERTY_INFO' &&
                                        <PropertyInfo
                                            numberOfSellers={numberOfSellers}
                                            purchaseInfo={purchaseInfo}
                                            saleInfo={saleInfo}
                                            setNumberOfSellers={setNumberOfSellers}
                                            setPurchaseInfo={setPurchaseInfo}
                                            setSaleInfo={setSaleInfo}
                                            numberOfClients={numberOfClients}
                                            sellersArePurchasers={sellersArePurchasers}
                                            setNumberOfClients={setNumberOfClients}
                                            setSellersArePurchasers={setSellersArePurchasers}
                                            numberOfGuarantors={numberOfGuarantors}
                                            setNumberOfGuarantors={setNumberOfGuarantors}
                                        />

                                    }

                                    {
                                        currentPage === 'SUBMITTING' &&
                                        <Submitting />
                                    }

                                    {
                                        currentPage === 'SUBMIT_ERROR' &&
                                        <SubmitError onClick={() => submitSaleAndPurchaseForm()} />
                                    }

                                    {
                                        currentPage === 'SUBMIT_RESULT' &&
                                        <SubmitDone />
                                    }

                                    {
                                        currentPage === 'CONFIRM_SUBMIT' &&
                                        <SubmitConfirm
                                            text='Submit your sale and purchase information to Drysdale Bacon McStravick?'
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
                                leftButtonText='Back to Seller'
                                leftButtonClicked={() => setCurrentPage('GET_SELLERS')}
                                rightButtonText='Next'
                                rightButtonClicked={() => {
                                    if (checkInputs()) {
                                        setMissingInfo(false);
                                        setCurrentPage('GET_PURCHASERS');
                                    }
                                    else {
                                        setMissingInfo(true);
                                    }
                                }}
                            />

                        }

                        {
                            (currentPage === 'GET_PURCHASERS') &&

                            <ModalBottomButtons
                                showError={missingInfo}
                                leftButtonText='Back to Sale Details'
                                leftButtonClicked={() => setCurrentPage('GET_SALE_DETAILS')}
                                rightButtonText='Next'
                                rightButtonClicked={() => {
                                    if (checkInputs()) {
                                        setMissingInfo(false);
                                        setCurrentPage('PROPERTY_INFO');
                                    }
                                    else {
                                        setMissingInfo(true);
                                    }
                                }} />
                        }

                        {
                            currentPage === 'PROPERTY_INFO' &&

                            <ModalBottomButtons
                                showError={missingInfo}
                                leftButtonText='Back to Purchasers'
                                leftButtonClicked={() => setCurrentPage('GET_PURCHASERS')}
                                rightButtonText='Submit'
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
                                leftButtonClicked={() => setCurrentPage('PROPERTY_INFO')}
                                rightButtonText='Submit to DBM'
                                rightButtonDisabled={!submitOk}
                                rightButtonClicked={() => {
                                    setCurrentPage('SUBMITTING');
                                    setTimeout(() => {
                                        submitSaleAndPurchaseForm();
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

const getOutput = (purchaseInfo: PurchaseInfo, saleInfo: SaleInfo): string => {

    const output: string[] = [];

    output.push('<html><b>SALE AND PURCHASE</b><br /><br />');

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

    output.push('</table>');

    output.push('<br /><b>PURCHASERS</b><br />');

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
            output.push(getEntry('Date of Birth', !client.dateOfBirth
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

    output.push(getHeader('PURCHASE PROPERTY DETAILS'));

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

    if (joinType.indexOf('NOT A') > -1) {
        output.push(getEntry('Call for more details', purchaseInfo.joinTypeDetails, true));
    }

    output.push(getEntry('Building New or Used', purchaseInfo.buildingNewUsed, true));

    output.push(getEntry('Realtor Name', purchaseInfo.realtorName));
    output.push(getEntry('Realtor Phone Number', purchaseInfo.realtorPhone, true));

    output.push(getEntry('Mortgage/Secured Line of Credit', purchaseInfo.gettingMortgageOrSLOC));

    if (purchaseInfo.gettingMortgageOrSLOC !== 'NO') {
        output.push(getEntry('Lender name', purchaseInfo.gettingMortgageOrSLOC === 'YES_NOT_DETERMINED' ? 'TBD' : purchaseInfo.lenderName));
        output.push(getEntry('Broker/Banker name', purchaseInfo.gettingMortgageOrSLOC === 'YES_NOT_DETERMINED' ? 'TBD' : purchaseInfo.brokerBankerName));
        output.push(getEntry('Broker/Banker phone', purchaseInfo.gettingMortgageOrSLOC === 'YES_NOT_DETERMINED' ? 'TBD' : purchaseInfo.brokerBankerPhone));
    }
    output.push(getEntry('', '', true));

    output.push(getEntry('Guarantors', purchaseInfo.guarantorsInfo.length === 0 ? 'None' : purchaseInfo.guarantorsInfo.length.toString(), true));

    for (let i = 0; i < purchaseInfo.guarantorsInfo.length; i++) {

        const guarantor = purchaseInfo.guarantorsInfo[i];

        output.push(getEntry(`GUARANTOR ${(i + 1).toString()}`, ''));
        output.push(getEntry('Full Legal Name', guarantor.fullLegalName));
        output.push(getEntry('Phone Number', guarantor.phoneNumber));
        output.push(getEntry('Email', guarantor.emailAddress));
        output.push(getEntry('Relationship', guarantor.relationship, true));
    }

    output.push(getEntry('Strata Mgmt Company', purchaseInfo.strataName, true));

    output.push(getEntry('Parking Stall(s)', purchaseInfo.parkingStallNumbers));
    output.push(getEntry('Storage Locker(s)', purchaseInfo.storageLockerNumbers, true));

    output.push(getEntry('House Insurance Agent Name', purchaseInfo.insuranceAgentName));
    output.push(getEntry('House Insurance Agent Phone Number', purchaseInfo.insuranceAgentPhone, true));

    output.push(getEntry('Portion of Property to be Rented Out', purchaseInfo.portionPropertyRentedOut, true));

    // let fundsSource = '';
    // switch (purchaseInfo.fundsSource) {
    //     case 'ANOTHER_INDIVIDUAL':
    //         fundsSource = 'Another Individual';
    //         break;

    //     case 'CHEQUING_SAVINGS_ACCOUNT':
    //         fundsSource = 'Chequing/Saving Account';
    //         break;

    //     case 'HELOC':
    //         fundsSource = 'Home Equity Line of Credit';
    //         break;

    //     case 'OTHER':
    //         fundsSource = 'Other';
    //         break;

    //     case 'INVESTMENT_FUNDS':
    //         fundsSource = 'Investment funds';
    //         break;

    //     case 'SALE_PREVIOUS_PROPERTY':
    //         fundsSource = 'Sale of previous home';
    //         break;

    // }

    // output.push(getEntry('Funds Brought In Source', fundsSource, true));

    // if (purchaseInfo.fundsSource === 'ANOTHER_INDIVIDUAL') {

    //     output.push(getEntry('Other Funder Name', purchaseInfo.nonPurchaserName));
    //     output.push(getEntry('Other Funder Relationship', purchaseInfo.nonPurchaserRelationship));
    // }
    // else if (purchaseInfo.fundsSource === 'CHEQUING_SAVINGS_ACCOUNT') {
    //     output.push(getEntry('Chequing/Savings Source', purchaseInfo.fundsChequingSavingsSource, true));
    // }

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

    output.push('</table>');

    return output.join('');
}


export default SaleAndPurchaseForm;