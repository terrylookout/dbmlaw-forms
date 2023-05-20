import React, { ReactElement, useEffect, useState } from 'react';
import { ClientInfo, GuarantorInfo, PurchaseInfo } from '../../ClassesInterfaces';
import { checkInputs, FormProps, getEntry, getHeader, sendEmail } from '../../Helpers';
import { SubmitConfirm, SubmitDone, SubmitError, Submitting } from '../../controls/SubmitForms';
import House from '../../controls/House';
import ModalBottomButtons from '../../controls/ModalBottomButtons';
import GetPurchasers from './1-GetPurchasers';
import GetPropertyInfo from './2-GetPropertyInfo';

declare var bootstrap: any;

export interface PurchaseFormChildProps {
    purchaseInfo: PurchaseInfo;
    setPurchaseInfo: (info: PurchaseInfo) => void;
}


const PurchaseForm = (props: FormProps): ReactElement => {

    const [purchaseInfo, setPurchaseInfo] = useState(() => new PurchaseInfo());
    const [missingInfo, setMissingInfo] = useState(false);
    //const [numberOfClients, setNumberOfClients] = useState(0);
    const [numberOfGuarantors, setNumberOfGuarantors] = useState(0);
    const [submitOk, setSubmitOk] = useState(false);

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
        if (purchaseInfo.forCompany) {
            const temp: ClientInfo[] = [];
            temp.push(new ClientInfo());
            setPurchaseInfo({ ...purchaseInfo, clientsInfo: temp });
            //setNumberOfSellers(1);
        }
        else {
            setPurchaseInfo({ ...purchaseInfo, clientsInfo: [] });
            //setNumberOfSellers(0);
        }

        // eslint-disable-next-line
    }, [purchaseInfo.forCompany]);

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
        setSubmitOk(false);
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
                                        <GetPurchasers
                                            purchaseInfo={purchaseInfo}
                                            setPurchaseInfo={(info) => setPurchaseInfo(info)}
                                        />
                                    }

                                    {
                                        currentPage === 'PROPERTY_INFO' &&
                                        <GetPropertyInfo
                                            purchaseInfo={purchaseInfo}
                                            numberOfGuarantors={numberOfGuarantors}
                                            setPurchaseInfo={(info) => setPurchaseInfo(info)}
                                            setNumberOfGuarantors={(info) => setNumberOfGuarantors(info)}
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
                                        <SubmitError onClick={() => submitPurchaseForm()} />
                                    }

                                    {
                                        currentPage === 'CONFIRM_SUBMIT' &&
                                        <SubmitConfirm
                                            text='Submit your purchase information to Drysdale Bacon McStravick?'
                                            submitOk={(e) => setSubmitOk(e)}
                                        />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className='modal-footer'>
                        {
                            (currentPage === 'GET_PURCHASERS' && (purchaseInfo.forCompany || purchaseInfo.clientsInfo.length !== 0)) &&

                            <ModalBottomButtons
                                showError={missingInfo}
                                rightButtonText='Next'
                                rightButtonClicked={() => {
                                    if (checkInputs()) {
                                        setCurrentPage('PROPERTY_INFO');
                                        setMissingInfo(false);
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
                                        setCurrentPage('CONFIRM_SUBMIT');
                                        setMissingInfo(false);
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
                                    submitPurchaseForm();
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
            if (client.employment === 'RETIRED') {
                output.push(getEntry('Previous Occupation', client.retiredPreviousOccupation));
            }
            else if (client.employment === 'OTHER') {
                output.push(getEntry('Other Occupation', client.occupationOther));
            }
            else if (client.employment === 'EMPLOYED') {
                output.push(getEntry('Employer Name', client.employerName));
                output.push(getEntry('Employer Phone Number', client.employerPhone));
                output.push(getEntry('Employer Street 1', client.employerStreet1));
                output.push(getEntry('Employer Street 2', client.employerStreet2));
                output.push(getEntry('Employer City', client.employerCity));
                output.push(getEntry('Employer Province or Territory', client.employerProvinceTerritory));
                output.push(getEntry('Employer Postal Code', client.employerPostalCode));
            }
            output.push(getEntry('', '', true));

            let citizenShip = '';
            switch (client.citizenShip) {
                case 'CANADIAN_CITIZEN':
                    citizenShip = 'Canadian citizen';
                    break;

                case 'PERMANENT_RESIDENT':
                    citizenShip = 'Permanent resident';
                    break;

                case 'RESIDENT_OTHER_COUNTRY':
                    citizenShip = 'Resident of country other than Canada';
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

            if (client.isFirstTimeHomeBuyer === 'YES') {
                output.push(getHeader('Previous Address(es)'));
                for (const prevAddress of client.previousAddresses) {
                    output.push(getEntry('Start Date', !prevAddress.startDate ? '' : prevAddress.startDate.toISOString().split('T')[0]));
                    output.push(getEntry('Street 1', prevAddress.street1));
                    output.push(getEntry('Street 2', prevAddress.street2));
                    output.push(getEntry('City', prevAddress.city));
                    output.push(getEntry('Province or Territory', prevAddress.provinceTerritory));
                    output.push(getEntry('Postal Code', prevAddress.postalCode));
                    output.push(getEntry('Country', prevAddress.country, true));
                }
            }
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

    if (joinType.indexOf('NOT A') > -1) {
        output.push(getEntry('Call for more details', purchaseInfo.joinTypeDetails, true));
    }

    output.push(getEntry('Building New or Used', purchaseInfo.buildingNewUsed, true));

    output.push(getEntry('Realtor Name', purchaseInfo.realtorName));
    output.push(getEntry('Realtor Phone Number', purchaseInfo.realtorPhone, true));

    output.push(getEntry('Mortgage/SLOC', purchaseInfo.gettingMortgageOrSLOC))

    if (purchaseInfo.gettingMortgageOrSLOC === 'YES') {
        output.push(getEntry('Lender Name', purchaseInfo.lenderName));
        output.push(getEntry('Broker or Banker Name', purchaseInfo.brokerBankerName));
        output.push(getEntry('Broker or Banker Phone Number', purchaseInfo.brokerBankerPhone));
    }

    output.push(getEntry('', '', true));

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

        case 'CHEQUING_SAVINGS_ACCOUNT':
            fundsSource = 'Chequing/Savings Account';
            break;

        case 'HELOC':
            fundsSource = 'Home Equity Line of Credit';
            break;

        case 'OTHER':
            fundsSource = 'Other';
            break;

    }

    output.push(getEntry('Funds Brought In Source', fundsSource, true));

    if (purchaseInfo.fundsSource === 'ANOTHER_INDIVIDUAL') {

        output.push(getEntry('Other Funder Name', purchaseInfo.nonPurchaserName));
        //output.push(getEntry('Other Funder Phone Number', purchaseInfo.nonPurchaserPhone));
        output.push(getEntry('Other Funder Relationship', purchaseInfo.nonPurchaserRelationship));
        // output.push(getEntry('Other Funder Occupation', purchaseInfo.nonPurchaserOccupation));
        // output.push(getEntry('Other Funder Street 1', purchaseInfo.nonPurchaserStreet1));
        // output.push(getEntry('Other Funder Street 2', purchaseInfo.nonPurchaserStreet2));
        // output.push(getEntry('Other Funder City', purchaseInfo.nonPurchaserCity));
        // output.push(getEntry('Other Funder Province or Territory', purchaseInfo.nonPurchaserProvinceTerritory));
        // output.push(getEntry('Other Funder Postal Code', purchaseInfo.nonPurchaserPostalCode, true));
    }
    else if (purchaseInfo.fundsSource === 'CHEQUING_SAVINGS_ACCOUNT') {
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

    output.push('</table>');

    return output.join('');
}


export default PurchaseForm;