import { ChangeEvent, Fragment } from "react";
import { PurchaseFormChildProps } from ".";
import CircleBullet from "../../controls/CircleBullet";
import DateInput from "../../controls/DateInput";
import { GuarantorInfo } from "../../ClassesInterfaces";
import Guarantor from "../../Guarantor";
import RadioGroup from "../../controls/RadioGroup";
import NumericInput from "../../controls/NumericInput";

interface PurchaseGetPropertyInfoDetailsProps extends PurchaseFormChildProps {
    numberOfGuarantors: number;
    setNumberOfGuarantors: (info: number) => void;

}

const GetPropertyInfo = ({
    purchaseInfo,
    setPurchaseInfo,
    numberOfGuarantors,
    setNumberOfGuarantors,
}: PurchaseGetPropertyInfoDetailsProps) => {

    return (
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
                            disabled={purchaseInfo.completionDateTBD}
                            isRequired={!purchaseInfo.completionDateTBD}
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
                        <label htmlFor='chkdatetbd' className='ps-2'>
                            Date still to be determined
                        </label>
                    </div>
                </div>
                <div className='col mb-3'>
                    <div className='form-floating mb-0'>
                        <NumericInput
                            id='purchaseprice' placeholder='Purchase price'
                            required={true}
                            disabled={false}
                            value={purchaseInfo.purchasePrice}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target) {
                                    setPurchaseInfo({
                                        ...purchaseInfo,
                                        purchasePrice: e.target.value ? e.target.value : '',
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
                        Purchase property
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
                        <input type='text' className='form-control' id='purchasepostalcode' placeholder='Postal code'
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
                        <RadioGroup groupName="jointype">
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


                                <div className='d-flex flex-nowrap pt-4'>
                                    <input type='checkbox' id={`chkmoredetails`} checked={purchaseInfo.joinTypeDetails === 'YES'}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setPurchaseInfo({ ...purchaseInfo, joinTypeDetails: e.target.checked ? 'YES' : 'NO' })
                                        }} />
                                    <label htmlFor={`chkmoredetails`} className='ps-2'>
                                        Call me for details
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
                        </RadioGroup>
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
                                {purchaseInfo.clientsInfo.map((c) => {
                                    return (
                                        <Fragment key={c.id}>
                                            <div >
                                                <span>
                                                    {c.fullLegalName}
                                                </span>
                                            </div>

                                            <div key={c.id}>
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
                <RadioGroup groupName="newused">
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
                </RadioGroup>
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
                        Mortgage / Secured Line of Credit
                    </h6>
                </div>
            </div>

            <div className='row'>
                <RadioGroup groupName="mortgage">
                    <div className='col mb-3'>

                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='gettingmortgagesloc' id='gettingmortgagesloc-no'
                                checked={purchaseInfo.gettingMortgageOrSLOC === 'NO'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e && e.target && e.target.value && e.target.value === 'on') {
                                        setPurchaseInfo({ ...purchaseInfo, gettingMortgageOrSLOC: 'NO' });
                                    }
                                }} />
                            <label className='form-check-label' htmlFor='gettingmortgagesloc-no'>
                                No
                            </label>
                        </div>

                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='gettingmortgagesloc' id='gettingmortgagesloc-yes'
                                checked={purchaseInfo.gettingMortgageOrSLOC === 'YES'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e && e.target && e.target.value && e.target.value === 'on') {
                                        setPurchaseInfo({ ...purchaseInfo, gettingMortgageOrSLOC: 'YES' });
                                    }
                                }} />
                            <label className='form-check-label' htmlFor='gettingmortgagesloc-yes'>
                                Yes (enter info below)
                            </label>
                        </div>

                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name='gettingmortgagesloc' id='gettingmortgagesloc-yestbd'
                                checked={purchaseInfo.gettingMortgageOrSLOC === 'YES_NOT_DETERMINED'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e && e.target && e.target.value && e.target.value === 'on') {
                                        setPurchaseInfo({ ...purchaseInfo, gettingMortgageOrSLOC: 'YES_NOT_DETERMINED' });
                                    }
                                }} />
                            <label className='form-check-label' htmlFor='gettingmortgagesloc-yestbd'>
                                Yes, but still to be determined
                            </label>
                        </div>
                    </div>
                </RadioGroup>
            </div>

            {
                (purchaseInfo.gettingMortgageOrSLOC === 'YES') &&
                <>
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

                </>
            }
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

            <div className="row mb-4">
                <span>
                    NOTE: On a house purchase, if obtaining a Mortgage / Secured Line of Credit, your insurance will need to be in place prior to closing
                </span>
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
                <RadioGroup groupName="rentedout">
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
                </RadioGroup>
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
                <RadioGroup groupName="fundssource">
                    <div className='col mb-1'>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-notapplicable`}
                                checked={purchaseInfo.fundsSource === 'SALE_PREVIOUS_PROPERTY'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.checked) {
                                        setPurchaseInfo({ ...purchaseInfo, fundsSource: 'SALE_PREVIOUS_PROPERTY' });
                                    }
                                }} />
                            <label className='form-check-label' htmlFor={`fundsource-notapplicable`}>
                                Sale of previous home
                            </label>
                        </div>

                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-invest`}
                                checked={purchaseInfo.fundsSource === 'INVESTMENT_FUNDS'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.checked) {
                                        setPurchaseInfo({ ...purchaseInfo, fundsSource: 'INVESTMENT_FUNDS' });
                                    }
                                }} />
                            <label className='form-check-label' htmlFor={`fundsource-invest`}>
                                Investment funds
                            </label>
                        </div>

                        <div className='form-check'>
                            <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-chequingsaving`}
                                checked={purchaseInfo.fundsSource === 'CHEQUING_SAVINGS_ACCOUNT'}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.checked) {
                                        setPurchaseInfo({ ...purchaseInfo, fundsSource: 'CHEQUING_SAVINGS_ACCOUNT' });
                                    }
                                }} />
                            <label className='form-check-label' htmlFor={`fundsource-chequingsaving`}>
                                Chequing/Savings Account
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
                                Other or not applicable
                            </label>
                        </div>
                    </div>

                </RadioGroup>
                <div className='col mb-1 mt-4'>

                </div>
            </div>

            {
                (purchaseInfo.fundsSource && (purchaseInfo.fundsSource === 'CHEQUING_SAVINGS_ACCOUNT')) &&
                <>
                    <div className='row'>
                        <div className='col mb-1 mt-4'>
                            <h6>
                                <CircleBullet />
                                If coming from your savings or chequing account, where have the funds come from
                                (i.e. gift, etc)
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
                                    Gift, etc
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
                                <div>Are there any guarantors/co-signers on your mortgage?</div>
                                <div>&nbsp;</div>
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
                                    key={c.id}
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
                <RadioGroup groupName="location">
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

                    </div>
                </RadioGroup>
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
    );
}

export default GetPropertyInfo;