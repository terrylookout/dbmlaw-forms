import { ChangeEvent, Fragment } from "react";
import { PurchaseFormChildProps } from ".";
import CircleBullet from "../../controls/CircleBullet";
import DateInput from "../../controls/DateInput";
import { GuarantorInfo } from "../../ClassesInterfaces";
import Guarantor from "../../Guarantor";

interface PurchaseGetPropertyInfoDetailsProps extends PurchaseFormChildProps {
    numberOfGuarantors: number;
    setNumberOfGuarantors: (info: number) => void;

}

const GetPropertyInfo = (props: PurchaseGetPropertyInfoDetailsProps) => {

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
                            className='form-control'
                            id={`completiondate`}
                            value={props.purchaseInfo.completionDateTBD ? null : props.purchaseInfo.completionDate}
                            min={new Date((new Date()).setFullYear(new Date().getFullYear() - 5))}
                            label='Completion date'
                            onChange={(e) => {
                                if (e) {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, completionDate: e });
                                }

                            }} />

                    </div>
                    <div className='mt-1'>
                        <input type='checkbox' id='chkdatetbd' checked={props.purchaseInfo.completionDateTBD}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, completionDateTBD: e.target.checked });
                            }} />
                        <label htmlFor='chkdatetbd' className='ps-2'>
                            Date still to be determined
                        </label>
                    </div>
                </div>
                <div className='col mb-3'>
                    <div className='form-floating mb-0'>
                        <input type='number' className='form-control is-required' id='purchaseprice' placeholder='Purchase price'
                            value={props.purchaseInfo.purchasePrice}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target) {
                                    props.setPurchaseInfo({
                                        ...props.purchaseInfo,
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
                            value={props.purchaseInfo.street1}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, street1: e.target.value });
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
                            value={props.purchaseInfo.street2}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, street2: e.target.value });
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
                            value={props.purchaseInfo.city}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, city: e.target.value });
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
                        value={props.purchaseInfo.provinceTerritory}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            props.setPurchaseInfo({ ...props.purchaseInfo, provinceTerritory: e.target.value });
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
                            value={props.purchaseInfo.postalCode}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, postalCode: e.target.value });
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
                props.purchaseInfo.clientsInfo.length > 1 &&
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
                                    checked={props.purchaseInfo.joinType === 'JOINT_TENANTS'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.checked) {
                                            const tempClients = [];
                                            for (const client of props.purchaseInfo.clientsInfo) {
                                                client.tenantInCommonPercent = 0;
                                                tempClients.push(client);
                                            }

                                            props.setPurchaseInfo({ ...props.purchaseInfo, joinType: 'JOINT_TENANTS', clientsInfo: tempClients, });
                                        }
                                    }}
                                />
                                <label className='form-check-label' htmlFor='jointtenants'>
                                    Joint Tenants
                                </label>
                            </div>

                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='ownertype' id='tenantsincommon'
                                    checked={props.purchaseInfo.joinType === 'TENANTS_IN_COMMON'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.checked) {
                                            const tempClients = [];
                                            for (const client of props.purchaseInfo.clientsInfo) {
                                                client.tenantInCommonPercent = 0;
                                                tempClients.push(client);
                                            }

                                            props.setPurchaseInfo({ ...props.purchaseInfo, joinType: 'TENANTS_IN_COMMON', clientsInfo: tempClients, });
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
                props.purchaseInfo.joinType === 'TENANTS_IN_COMMON' &&
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
                                {props.purchaseInfo.clientsInfo.map((c) => {
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

                                                        for (const t of props.purchaseInfo.clientsInfo) {
                                                            if (t.fullLegalName === c.fullLegalName) {
                                                                t.tenantInCommonPercent = parseFloat(e.target.value);
                                                            }

                                                            temp.push(t);
                                                        }

                                                        props.setPurchaseInfo({ ...props.purchaseInfo, clientsInfo: temp });
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
                            checked={props.purchaseInfo.buildingNewUsed === 'NEW'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, buildingNewUsed: 'NEW' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor='neworused-yes'>
                            New
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='neworused' id='neworused-no'
                            checked={props.purchaseInfo.buildingNewUsed === 'USED'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, buildingNewUsed: 'USED' });
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
                            value={props.purchaseInfo.realtorName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, realtorName: e.target.value });
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
                            value={props.purchaseInfo.realtorPhone}
                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, realtorPhone: e.target.value });
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
                            value={props.purchaseInfo.lenderName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, lenderName: e.target.value });
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
                            value={props.purchaseInfo.brokerBankerName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, brokerBankerName: e.target.value });
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
                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' value={props.purchaseInfo.brokerBankerPhone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, brokerBankerPhone: e.target.value });
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
                            value={props.purchaseInfo.strataName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, strataName: e.target.value });
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
                            value={props.purchaseInfo.parkingStallNumbers}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, parkingStallNumbers: e.target.value });
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
                            value={props.purchaseInfo.storageLockerNumbers}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, storageLockerNumbers: e.target.value });
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
                            value={props.purchaseInfo.insuranceAgentName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, insuranceAgentName: e.target.value });
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
                            value={props.purchaseInfo.insuranceAgentPhone}
                            pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, insuranceAgentPhone: e.target.value });
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
                            checked={props.purchaseInfo.portionPropertyRentedOut === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, portionPropertyRentedOut: 'YES' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor='rented-yes'>
                            Yes
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='rented' id='rented-no'
                            checked={props.purchaseInfo.portionPropertyRentedOut === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, portionPropertyRentedOut: 'NO' });
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
                            checked={props.purchaseInfo.fundsSource === ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, fundsSource: '' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor={`fundsource-notapplicable`}>
                            Not applicable
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-chequing`}
                            checked={props.purchaseInfo.fundsSource === 'CHEQUING_ACCOUNT'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, fundsSource: 'CHEQUING_ACCOUNT' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor={`fundsource-chequing`}>
                            Chequing Account
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-saving`}
                            checked={props.purchaseInfo.fundsSource === 'SAVINGS_ACCOUNT'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, fundsSource: 'SAVINGS_ACCOUNT' });
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
                            checked={props.purchaseInfo.fundsSource === 'HELOC'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, fundsSource: 'HELOC' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor={`fundsource-heloc`}>
                            Home Equity Line of Credit
                        </label>
                    </div>


                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-another`}
                            checked={props.purchaseInfo.fundsSource === 'ANOTHER_INDIVIDUAL'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, fundsSource: 'ANOTHER_INDIVIDUAL' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor={`fundsource-another`}>
                            Another individual
                        </label>
                    </div>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-other`}
                            checked={props.purchaseInfo.fundsSource === 'OTHER'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, fundsSource: 'OTHER' });
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
                (props.purchaseInfo.fundsSource && (props.purchaseInfo.fundsSource === 'CHEQUING_ACCOUNT' || props.purchaseInfo.fundsSource === 'SAVINGS_ACCOUNT')) &&
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
                                    value={props.purchaseInfo.fundsChequingSavingsSource}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, fundsChequingSavingsSource: e.target.value });
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
                props.purchaseInfo.fundsSource === 'ANOTHER_INDIVIDUAL' &&
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
                                    value={props.purchaseInfo.nonPurchaserName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, nonPurchaserName: e.target.value });
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
                                    value={props.purchaseInfo.nonPurchaserPhone}
                                    pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, nonPurchaserPhone: e.target.value });
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
                                    value={props.purchaseInfo.nonPurchaserOccupation}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, nonPurchaserOccupation: e.target.value });
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
                                    value={props.purchaseInfo.nonPurchaserRelationship}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, nonPurchaserRelationship: e.target.value });
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
                                    value={props.purchaseInfo.nonPurchaserStreet1}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, nonPurchaserStreet1: e.target.value });
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
                                    value={props.purchaseInfo.nonPurchaserStreet2}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, nonPurchaserStreet2: e.target.value });
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
                                    value={props.purchaseInfo.nonPurchaserCity}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, nonPurchaserCity: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    City
                                </label>
                            </div>
                        </div>

                        <div className='col mb-3'>
                            <select className='form-select p-3' aria-label='Province or territory'
                                value={props.purchaseInfo.nonPurchaserProvinceTerritory}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, nonPurchaserProvinceTerritory: e.target.value });
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
                                    value={props.purchaseInfo.postalCode}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, nonPurchaserPostalCode: e.target.value });
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
                        value={props.purchaseInfo.guarantorsInfo.length}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            if (e && e.target && e.target.value) {
                                props.setNumberOfGuarantors(parseInt(e.target.value));
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
                props.numberOfGuarantors > 0 &&
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
                        props.purchaseInfo.guarantorsInfo.map((c, i) => {
                            return (
                                <Guarantor text={'Guarantor/Co-signer'}
                                    num={i}
                                    key={c.id}
                                    numberOfPurchasers={props.purchaseInfo.clientsInfo.length}
                                    guarantorInfo={props.purchaseInfo.guarantorsInfo[i]}
                                    updated={(c: GuarantorInfo, idx: number) => {
                                        const tempGuarantors: GuarantorInfo[] = [];
                                        for (let t = 0; t < props.purchaseInfo.guarantorsInfo.length; t++) {
                                            if (t === idx) {
                                                tempGuarantors.push(c);
                                            }
                                            else {
                                                tempGuarantors.push(props.purchaseInfo.guarantorsInfo[t]);
                                            }
                                        }
                                        props.setPurchaseInfo({ ...props.purchaseInfo, guarantorsInfo: tempGuarantors });
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
                            checked={props.purchaseInfo.apptLocationPreference === 'COQUITLAM'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, apptLocationPreference: 'COQUITLAM' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor='apptlocation-coquitlam'>
                            Coquitlam
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='apptlocation' id='apptlocation-vancouver'
                            checked={props.purchaseInfo.apptLocationPreference === 'VANCOUVER'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, apptLocationPreference: 'VANCOUVER' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor='apptlocation-vancouver'>
                            Vancouver
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='apptlocation' id='apptlocation-langley'
                            checked={props.purchaseInfo.apptLocationPreference === 'LANGLEY'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    props.setPurchaseInfo({ ...props.purchaseInfo, apptLocationPreference: 'LANGLEY' });
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
                        value={props.purchaseInfo.additionalComments}
                        rows={6}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            props.setPurchaseInfo({ ...props.purchaseInfo, additionalComments: e.target.value });
                        }}>
                    </textarea>

                </div>
            </div>
        </>
    );
}

export default GetPropertyInfo;