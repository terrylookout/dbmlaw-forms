import React, { ReactElement, useEffect, useState } from 'react';
import { ClientInfo, PurchaseInfo } from '../../ClassesInterfaces';
import { checkInputs, FormProps, getEntry, getHeader, sendEmail } from '../../Helpers';
import { SubmitConfirm, SubmitDone, SubmitError, Submitting } from '../../controls/SubmitForms';
import House from '../../controls/House';
import ModalBottomButtons from '../../controls/ModalBottomButtons';
import GetPurchasers from './1-GetPurchasers';
import PropertyInfo from './2-PropertyInfo';

declare var bootstrap: any;

export interface ProjectPurchaseProps {
    numberOfClients: number;
    setNumberOfClients: (info: number) => void;
    purchaseInfo: PurchaseInfo;
    setPurchaseInfo: (info: PurchaseInfo) => void;
}

const ProjectPurchaseForm = (props: FormProps): ReactElement => {

    const [purchaseInfo, setPurchaseInfo] = useState(() => new PurchaseInfo());
    const [missingInfo, setMissingInfo] = useState(false);
    const [numberOfClients, setNumberOfClients] = useState(0);
    const [submitOk, setSubmitOk] = useState(false);

    const [currentPage, setCurrentPage] = useState<
        'GET_PURCHASERS' | 'PROPERTY_INFO' | 'CONFIRM_SUBMIT' | 'SUBMITTING' | 'SUBMIT_RESULT' |
        'SUBMIT_ERROR'
    >('GET_PURCHASERS');

    const [sendResult, setSendResult] = useState(-1);

    const submitPurchaseForm = async () => {

        //        console.log(getOutput(purchaseInfo));

        setCurrentPage('SUBMITTING');
        setSendResult(-1);
        setTimeout(async () => {
            const result = await sendEmail('Project Purchase submission', getOutput(purchaseInfo));
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
        //
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
                                <span>PROJECT PURCHASE - Purchaser Information</span>
                            }

                            {
                                currentPage === 'PROPERTY_INFO' &&
                                <span>PROJECT PURCHASE - Property Details</span>
                            }

                            {
                                currentPage === 'CONFIRM_SUBMIT' &&
                                <span>PROJECT PURCHASE - Ready to Submit</span>
                            }

                            {
                                currentPage === 'SUBMITTING' &&
                                <span>PROJECT PURCHASE - Please Wait</span>
                            }

                            {
                                currentPage === 'SUBMIT_RESULT' &&
                                <span>PROJECT PURCHASE - Success!</span>
                            }

                            {
                                currentPage === 'SUBMIT_ERROR' &&
                                <span>PROJECT PURCHASE - Error!</span>
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
                                            numberOfClients={numberOfClients}
                                            purchaseInfo={purchaseInfo}
                                            setNumberOfClients={setNumberOfClients}
                                            setPurchaseInfo={setPurchaseInfo}
                                        />
                                    }

                                    {
                                        currentPage === 'PROPERTY_INFO' &&
                                        <PropertyInfo
                                            numberOfClients={numberOfClients}
                                            purchaseInfo={purchaseInfo}
                                            setNumberOfClients={setNumberOfClients}
                                            setPurchaseInfo={setPurchaseInfo}
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
                                            submitOk={(e) => {
                                                setSubmitOk(e);
                                            }}
                                        />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className='modal-footer'>

                        {
                            (currentPage === 'GET_PURCHASERS' && (purchaseInfo.forCompany || numberOfClients !== 0)) &&

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
                                rightButtonText='Next'
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
                                    setTimeout(() => {
                                        submitPurchaseForm();
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
        </div >
    )

};

const getOutput = (purchaseInfo: PurchaseInfo): string => {

    const output: string[] = [];

    output.push('<html><b>PROJECT PURCHASE</b><br />');
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

            output.push(getEntry('Employment', client.employment, true));

            if (client.employment === 'EMPLOYED') {
                output.push(getEntry('Occupation', client.occupation));
                output.push(getEntry('Employer Name', client.employerName));
                output.push(getEntry('Employer Phone Number', client.employerPhone));
                output.push(getEntry('Employer Street 1', client.employerStreet1));
                output.push(getEntry('Employer Street 2', client.employerStreet2));
                output.push(getEntry('Employer City', client.employerCity));
                output.push(getEntry('Employer Province or Territory', client.employerProvinceTerritory));
                output.push(getEntry('Employer Postal Code', client.employerPostalCode, true));
            }
            else if (client.employment === 'RETIRED') {
                output.push(getEntry('Previous Occupation', client.retiredPreviousOccupation, true));
            }
            else if (client.employment === 'OTHER') {
                output.push(getEntry('Previous Occupation', client.retiredPreviousOccupation, true));
                output.push(getEntry('Details', client.occupationOther));
                output.push(getEntry('', '', true));
            }

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
    output.push(getEntry('Purchase Price (CAD)', purchaseInfo.purchasePrice));
    output.push(getEntry('Deposit Paid To Developer (CAD)', purchaseInfo.depositPaid, true));

    output.push(getEntry('Unit #', purchaseInfo.unitNumber));
    output.push(getEntry('Strata Lot', purchaseInfo.strataLot));
    output.push(getEntry('Street 1', purchaseInfo.street1));
    output.push(getEntry('Street 2', purchaseInfo.street2));
    output.push(getEntry('City', purchaseInfo.city));
    output.push(getEntry('Postal Code', purchaseInfo.postalCode, true));

    output.push(getEntry('Upgrades or Extras', purchaseInfo.upgradesOrExtras));

    if (purchaseInfo.upgradesOrExtras === 'YES') {
        output.push(getEntry('Amount', purchaseInfo.upgradesOrExtrasAmount));
        output.push(getEntry('Details', purchaseInfo.upgradesOrExtrasDetais));
    }

    output.push(getEntry('', '', true));

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

    if (purchaseInfo.relativeLivingInstead === 'YES') {
        output.push(getEntry('Other Relative Residing Instead', purchaseInfo.relativeLivingInsteadName));
        output.push(getEntry('Other Relative', purchaseInfo.relativeLivingInsteadRelationship, true));
    }

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

    let fundsSource = '';
    switch (purchaseInfo.fundsSource) {
        case 'ANOTHER_INDIVIDUAL':
            fundsSource = 'Another Individual';
            break;

        case 'CHEQUING_SAVINGS_ACCOUNT':
            fundsSource = 'Chequing/Saving Account';
            break;

        case 'HELOC':
            fundsSource = 'Home Equity Line of Credit';
            break;

        case 'OTHER':
            fundsSource = 'Other';
            break;

        case 'INVESTMENT_FUNDS':
            fundsSource = 'Investment funds';
            break;

        case 'SALE_PREVIOUS_PROPERTY':
            fundsSource = 'Sale of previous home';
            break;
    }

    output.push(getEntry('Funds Brought In Source', fundsSource, true));

    if (purchaseInfo.fundsSource === 'ANOTHER_INDIVIDUAL') {

        output.push(getEntry('Other Funder Name', purchaseInfo.nonPurchaserName));
        output.push(getEntry('Other Funder Relationship', purchaseInfo.nonPurchaserRelationship));
    }
    else if (purchaseInfo.fundsSource === 'CHEQUING_SAVINGS_ACCOUNT') {
        output.push(getEntry('Chequing/Savings Source', purchaseInfo.fundsChequingSavingsSource, true));
    }

    output.push(getEntry('Buying Through Assignment', purchaseInfo.buyingThroughAssignment));

    if (purchaseInfo.buyingThroughAssignment === 'YES') {
        output.push(getEntry('Assignor is Canadian Resident', purchaseInfo.assignorResidentCanada));
        output.push(getEntry('Assignor Generating Profit', purchaseInfo.assignorGeneratingProfit));
        output.push(getEntry('Moneys Disbursed By', purchaseInfo.moneysDisbursed,
            purchaseInfo.moneysDisbursed !== 'LAWYERS' ? true : false));
        if (purchaseInfo.moneysDisbursed === 'LAWYERS') {
            output.push(getEntry('Lawyer for Assignor', purchaseInfo.lawyerForAssignor, true));
        }
    }

    output.push(getEntry('Appointment Location Preference', purchaseInfo.apptLocationPreference, true));

    output.push(getEntry('Additional Comments', ''));
    output.push(getEntry(purchaseInfo.additionalComments, '', true));

    output.push('</table>');

    return output.join('');
}


export default ProjectPurchaseForm;