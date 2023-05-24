import React, { ReactElement, useEffect, useState } from 'react';
import { ClientInfo, GuarantorInfo, RefinanceInfo } from '../../ClassesInterfaces';

import { checkInputs, FormProps, getEntry, getHeader, sendEmail } from '../../Helpers';
import { SubmitConfirm, SubmitDone, SubmitError, Submitting } from '../../controls/SubmitForms';
import House from '../../controls/House';
import ModalBottomButtons from '../../controls/ModalBottomButtons';
import GetPropertyDetails from './1-GetPropertyDetails';
import GetOwners from './2-GetOwners';
import GetTransferInformation from './3-GetTransferInformation';
import GetMortgateDetails from './4-GetMortgageDetails';

declare var bootstrap: any;

export interface RefinanceProps {
    refinanceInfo: RefinanceInfo;
    setRefinanceInfo: (info: RefinanceInfo) => void;
    numberOfOwners: number;
    setNumberOfOwners: (info: number) => void;
    numberOfAdded: number;
    setNumberOfAdded: (info: number) => void;
    numberOfGuarantors: number;
    setNumberOfGuarantors: (info: number) => void;
}

const RefinanceForm = (props: FormProps): ReactElement => {

    const [refinanceInfo, setRefinanceInfo] = useState<RefinanceInfo>(() => new RefinanceInfo());
    const [missingInfo, setMissingInfo] = useState(false);
    const [numberOfOwners, setNumberOfOwners] = useState(0);
    const [numberOfGuarantors, setNumberOfGuarantors] = useState(0);
    const [numberOfAdded, setNumberOfAdded] = useState(0);

    const [currentPage, setCurrentPage] = useState<
        'GET_PROPERTY_DETAILS' | 'GET_OWNERS' | 'GET_TRANSFER_INFORMATION' | 'GET_MORTGAGE_DETAILS' |
        'CONFIRM_SUBMIT' | 'SUBMITTING' | 'SUBMIT_RESULT' | 'SUBMIT_ERROR'
    >('GET_PROPERTY_DETAILS');

    const [sendResult, setSendResult] = useState(-1);
    const [submitOk, setSubmitOk] = useState(false);

    const submitSaleForm = async () => {

        setCurrentPage('SUBMITTING');
        setSendResult(-1);
        setTimeout(async () => {
            const result = await sendEmail('Refinance submission', getOutput(refinanceInfo));
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
        const tempOwners = [...refinanceInfo.clientsInfo];
        if (numberOfOwners > tempOwners.length) {
            do {
                tempOwners.push(
                    new ClientInfo()
                );
            } while (numberOfOwners > tempOwners.length);
        }
        else if (numberOfOwners < tempOwners.length) {
            do {
                tempOwners.pop();
            } while (numberOfOwners < tempOwners.length);
        }

        setRefinanceInfo({ ...refinanceInfo, clientsInfo: tempOwners });

        // eslint-disable-next-line
    }, [numberOfOwners,]);

    useEffect(() => {
        const temp = [...refinanceInfo.guarantorsInfo];
        if (numberOfGuarantors > temp.length) {
            do {
                temp.push(
                    new GuarantorInfo(),
                );
            } while (numberOfGuarantors > temp.length);
        }
        else if (numberOfGuarantors < temp.length) {
            do {
                temp.pop();
            } while (numberOfGuarantors < temp.length);
        }

        setRefinanceInfo({ ...refinanceInfo, guarantorsInfo: temp });

        // eslint-disable-next-line
    }, [numberOfGuarantors]);

    useEffect(() => {
        const tempOwners = [...refinanceInfo.clientsAddedInfo];
        if (numberOfAdded > tempOwners.length) {
            do {
                tempOwners.push(
                    new ClientInfo()
                );
            } while (numberOfAdded > tempOwners.length);
        }
        else if (numberOfAdded < tempOwners.length) {
            do {
                tempOwners.pop();
            } while (numberOfAdded < tempOwners.length);
        }

        setRefinanceInfo({ ...refinanceInfo, clientsAddedInfo: tempOwners });

        // eslint-disable-next-line
    }, [numberOfAdded]);

    // useEffect(() => {

    //     setNumberOfOwners(refinanceInfo.forCompany ? 1 : 0);

    // }, [refinanceInfo.forCompany]);

    useEffect(() => {
        //if (currentPage !== 'PROPERTY_INFO') {
        //
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
            <div className={`modal-dialog modal-lg ${((currentPage === 'GET_OWNERS' && refinanceInfo.clientsInfo.length !== 0)) ||
                (currentPage === 'GET_PROPERTY_DETAILS')
                ? 'modal-dialog-centered' : 'modal-near-top'} modal-dialog-scrollable`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            <House />
                            {
                                currentPage === 'GET_OWNERS' &&
                                <span>REFINANCE - Owner Information</span>
                            }

                            {
                                currentPage === 'GET_TRANSFER_INFORMATION' &&
                                <span>REFINANCE - Transfer Information</span>
                            }

                            {
                                currentPage === 'GET_PROPERTY_DETAILS' &&
                                <span>REFINANCE - Property Details</span>
                            }

                            {
                                currentPage === 'GET_MORTGAGE_DETAILS' &&
                                <span>REFINANCE - Mortgage Details</span>
                            }

                            {
                                currentPage === 'CONFIRM_SUBMIT' &&
                                <span>REFINANCE - Ready to Submit</span>
                            }

                            {
                                currentPage === 'SUBMITTING' &&
                                <span>REFINANCE - Please Wait</span>
                            }

                            {
                                currentPage === 'SUBMIT_ERROR' &&
                                <span>REFINANCE - Error!</span>
                            }

                            {
                                currentPage === 'SUBMIT_RESULT' &&
                                <span>REFINANCE - Success!</span>
                            }

                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                            <div className='container'>
                                <div className="container">

                                    {
                                        currentPage === 'GET_PROPERTY_DETAILS' &&
                                        <GetPropertyDetails
                                            refinanceInfo={refinanceInfo}
                                            setRefinanceInfo={setRefinanceInfo}
                                            numberOfOwners={numberOfOwners}
                                            setNumberOfOwners={setNumberOfOwners}
                                            numberOfAdded={numberOfAdded}
                                            setNumberOfAdded={setNumberOfAdded}
                                            numberOfGuarantors={numberOfAdded}
                                            setNumberOfGuarantors={setNumberOfGuarantors}
                                        />
                                    }


                                    {
                                        currentPage === 'GET_OWNERS' &&
                                        <GetOwners
                                            refinanceInfo={refinanceInfo}
                                            setRefinanceInfo={setRefinanceInfo}
                                            numberOfOwners={numberOfOwners}
                                            setNumberOfOwners={setNumberOfOwners}
                                            numberOfAdded={numberOfAdded}
                                            setNumberOfAdded={setNumberOfAdded}
                                            numberOfGuarantors={numberOfAdded}
                                            setNumberOfGuarantors={setNumberOfGuarantors}
                                        />
                                    }

                                    {
                                        currentPage === 'GET_TRANSFER_INFORMATION' &&
                                        <GetTransferInformation
                                            refinanceInfo={refinanceInfo}
                                            setRefinanceInfo={setRefinanceInfo}
                                            numberOfOwners={numberOfOwners}
                                            setNumberOfOwners={setNumberOfOwners}
                                            numberOfAdded={numberOfAdded}
                                            setNumberOfAdded={setNumberOfAdded}
                                            numberOfGuarantors={numberOfAdded}
                                            setNumberOfGuarantors={setNumberOfGuarantors}
                                        />
                                    }


                                    {
                                        currentPage === 'GET_MORTGAGE_DETAILS' &&
                                        <GetMortgateDetails
                                            refinanceInfo={refinanceInfo}
                                            setRefinanceInfo={setRefinanceInfo}
                                            numberOfOwners={numberOfOwners}
                                            setNumberOfOwners={setNumberOfOwners}
                                            numberOfAdded={numberOfAdded}
                                            setNumberOfAdded={setNumberOfAdded}
                                            numberOfGuarantors={numberOfGuarantors}
                                            setNumberOfGuarantors={setNumberOfGuarantors}
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
                                            text='Submit your refinance information to Drysdale Bacon McStravick?'
                                            submitOk={(e) => setSubmitOk(e)}
                                        />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className="modal-footer">

                        {
                            currentPage === 'GET_PROPERTY_DETAILS' &&

                            <ModalBottomButtons
                                showError={missingInfo}
                                rightButtonText='Next'
                                rightButtonClicked={() => {
                                    if (checkInputs()) {
                                        setMissingInfo(false);
                                        setCurrentPage('GET_OWNERS');
                                    }
                                    else {
                                        setMissingInfo(true);
                                    }
                                }} />
                        }

                        {
                            currentPage === 'GET_OWNERS' &&

                            <ModalBottomButtons
                                showError={missingInfo}
                                leftButtonText='Back to Property Details'
                                leftButtonClicked={() => setCurrentPage('GET_PROPERTY_DETAILS')}
                                rightButtonText='Next'
                                rightButtonClicked={() => {
                                    if (checkInputs()) {
                                        setMissingInfo(false);
                                        setCurrentPage('GET_TRANSFER_INFORMATION');
                                    }
                                    else {
                                        setMissingInfo(true);
                                    }
                                }} />
                        }

                        {
                            currentPage === 'GET_TRANSFER_INFORMATION' &&

                            <ModalBottomButtons
                                showError={missingInfo}
                                leftButtonText='Back to Owners'
                                leftButtonClicked={() => setCurrentPage('GET_OWNERS')}
                                rightButtonText='Next'
                                rightButtonClicked={() => {
                                    if (checkInputs()) {
                                        setMissingInfo(false);
                                        setCurrentPage('GET_MORTGAGE_DETAILS');
                                    }
                                    else {
                                        setMissingInfo(true);
                                    }
                                }} />

                        }

                        {
                            currentPage === 'GET_MORTGAGE_DETAILS' &&

                            <ModalBottomButtons
                                showError={missingInfo}
                                leftButtonText='Back to Transfer Information'
                                leftButtonClicked={() => setCurrentPage('GET_TRANSFER_INFORMATION')}
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
                                leftButtonText='Back to Mortgage Information'
                                leftButtonClicked={() => setCurrentPage('GET_MORTGAGE_DETAILS')}
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

const getOutput = (refinanceInfo: RefinanceInfo): string => {

    const output: string[] = [];

    output.push('<html><b>REFINANCE</b><br /><br />');

    output.push('<table>');
    output.push(getHeader('MORTGAGE-SUBJECT PROPERTY'));
    output.push(getEntry('Street Address 1', refinanceInfo.street1));
    output.push(getEntry('Street Address 2', refinanceInfo.street2));
    output.push(getEntry('City', refinanceInfo.city));
    output.push(getEntry('Province or Territory', refinanceInfo.provinceTerritory));
    output.push(getEntry('Postal Code', refinanceInfo.postalCode, true));

    output.push(getEntry('Strata Company', refinanceInfo.strataName, true));

    output.push(getEntry('House Insurance Agent', refinanceInfo.insuranceAgentName));
    output.push(getEntry('House Insurance Phone', refinanceInfo.insuranceAgentPhone, true));

    output.push('</table><table>');

    for (let i = 0; i < refinanceInfo.clientsInfo.length; i++) {

        const client = refinanceInfo.clientsInfo[i];

        output.push(getHeader(`OWNER ${(i + 1).toString()}`));
        output.push(getEntry('Full Legal Name', client.fullLegalName));
        output.push(getEntry('Phone Number', client.phoneNumber));
        output.push(getEntry('Email', client.emailAddress));
        // output.push(getEntry('Date of Birth', client.dateOfBirth.toDateString() === (new Date()).toDateString()
        //     ? ''
        //     : client.dateOfBirth.toISOString().split('T')[0]));
        // output.push(getEntry('SIN', client.sinViaPhone ? 'TO BE PROVIDED BY PHONE' : client.socialInsNumber));

        output.push(getHeader('Current Address'))

        if (client.addressSameAsProperty === 'NO') {
            output.push(getEntry('Street 1', client.mailingStreet1));
            output.push(getEntry('Street 2', client.mailingStreet2));
            output.push(getEntry('City', client.mailingCity));
            output.push(getEntry('Province or Territory', client.mailingProvinceTerritory));
            output.push(getEntry('Postal Code', client.mailingPostalCode));
            output.push(getEntry('Country', client.mailingCountry, true));
        }
        else if (client.addressSameAsProperty === 'YES') {
            output.push(getEntry('Address', 'SAME AS MORTGAGE PROPERTY', true));
            output.push(getEntry('Time Living At Property', client.timeLivingAtProperty, true));
        }
        else {
            output.push(getEntry('Address', 'NOT SPECIFIED', true));
        }


        //output.push(getEntry('Resident of Canada at completion', client.residentOfCanada, true));
    }

    output.push(getHeader('TO BE REMOVED FROM TITLE'));

    if (refinanceInfo.removedFromTitle.length === 0) {
        output.push(getEntry('Remove', 'NONE', true));
    }
    else {
        for (let i = 0; i < refinanceInfo.removedFromTitle.length; i++) {
            output.push(getEntry('Remove', refinanceInfo.removedFromTitle[i], i === refinanceInfo.removedFromTitle.length - 1 ? true : false));
        }
    }

    output.push(getHeader('TO BE ADDED TO TITLE'));

    if (refinanceInfo.clientsAddedInfo.length === 0) {
        output.push('NONE');
    }
    else {
        for (let i = 0; i < refinanceInfo.clientsAddedInfo.length; i++) {
            const client = refinanceInfo.clientsAddedInfo[i];

            output.push(getHeader(`TRANSFER ${(i + 1).toString()}`));
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
            output.push(getEntry('Postal Code', client.mailingPostalCode));
            output.push(getEntry('Country', client.mailingCountry, true));

            output.push(getEntry('Relationship', client.relationship));

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

            output.push(getEntry('Citizenship', citizenShip));

            output.push(getEntry('Time Living At Property', client.timeLivingAtProperty, true));

        }
    }

    output.push(getHeader('MORTGAGE INFORMATION'));

    output.push(getEntry('Mortgage Lender Name', refinanceInfo.mortgageLenderName));

    output.push(getEntry('Need To Pay Out Mortgage / LOC', refinanceInfo.mortgageOrLoCOnTitle));

    if (refinanceInfo.mortgageOrLoCOnTitle === 'YES') {
        output.push(getEntry('Reference Number', refinanceInfo.mortgageOrLoCOnTitleReferenceNumber));
        output.push(getEntry('Bank And Branch', refinanceInfo.mortgageOrLoCOnTitleBankBranch, true));
    }

    output.push(getEntry('Lender Requires Debts To Be Paid', refinanceInfo.mortgageLenderRequiresOtherDebtsPaid));
    if (refinanceInfo.mortgageLenderRequiresOtherDebtsPaid === 'YES') {
        output.push(getEntry('Debt Details', refinanceInfo.mortgageLenderRequiresOtherDebtsPaidDetails, true));
    }

    output.push(getEntry('Separation or Divorce Involved', refinanceInfo.involvesSeparationDivorce, true));

    let joinType = '';
    if ((refinanceInfo.clientsInfo.length + refinanceInfo.clientsAddedInfo.length) < 2) {
        joinType = 'NOT APPLICABLE AS ONLY ONE OWNER';
    }
    else {
        switch (refinanceInfo.joinType) {
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

    output.push(getEntry('Tenancy', joinType, refinanceInfo.joinType !== 'TENANTS_IN_COMMON'));

    if (refinanceInfo.joinType === 'TENANTS_IN_COMMON') {
        for (const client of refinanceInfo.clientsInfo) {
            output.push(getEntry(`${client.fullLegalName}`, `${client.tenantInCommonPercent}%`));
        }
        for (const client of refinanceInfo.clientsAddedInfo) {
            output.push(getEntry(`${client.fullLegalName}`, `${client.tenantInCommonPercent}%`));
        }
        output.push(getEntry('', '', true));
    }

    if (joinType.indexOf('NOT A') > -1) {
        output.push(getEntry('Call for more details', refinanceInfo.joinTypeDetails, true));
    }

    for (let i = 0; i < refinanceInfo.guarantorsInfo.length; i++) {

        const guarantor = refinanceInfo.guarantorsInfo[i];

        output.push(getEntry(`GUARANTOR ${(i + 1).toString()}`, ''));
        output.push(getEntry('Full Legal Name', guarantor.fullLegalName));
        output.push(getEntry('Phone Number', guarantor.phoneNumber));
        output.push(getEntry('Email', guarantor.emailAddress));
        output.push(getEntry('Relationship', guarantor.relationship, true));
    }

    output.push('</table><table>');

    output.push(getEntry('Additional Comments', ''));
    output.push(getEntry(refinanceInfo.additionalComments, '', true));

    output.push('</table>');

    return output.join('');


}

export default RefinanceForm;