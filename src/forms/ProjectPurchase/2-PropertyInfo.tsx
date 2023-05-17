import { ChangeEvent, Fragment } from "react";
import { ProjectPurchaseProps } from ".";
import CircleBullet from "../../controls/CircleBullet";
import DateInput from "../../controls/DateInput";
import NumericInput from "../../controls/NumericInput";


const PropertyInfo = ({
    purchaseInfo,
    setPurchaseInfo,
}: ProjectPurchaseProps) => {
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
                <div className='col'>
                    <div className='form-floating mb-0'>

                        <DateInput
                            className='form-control'
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
                </div>

                <div className='col'>
                    <div className='form-floating mb-0'>
                        <NumericInput type='number' className='form-control' id='purchaseprice' placeholder='Purchase price'
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

                        <label htmlFor='floatingInput'>
                            Purchase price (CAD)
                        </label>
                    </div>
                </div>

            </div>

            <div className='row'>
                <div className='col'>
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

                <div className='col mt-3'>
                    <div className='form-floating mb-0'>
                        <NumericInput type='number' className='form-control' id='depositpaid' placeholder='Deposit Paid'
                            value={purchaseInfo.depositPaid}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target) {
                                    setPurchaseInfo({
                                        ...purchaseInfo,
                                        depositPaid: e.target.value ? e.target.value : '',
                                    });
                                }
                            }}
                        />

                        <label htmlFor='floatingInput'>
                            Deposit Paid to Developer (CAD)
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
                <div className='col'>
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control is-required' id='purchaseunitnumber' placeholder='Unit Number'
                            value={purchaseInfo.unitNumber}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPurchaseInfo({ ...purchaseInfo, unitNumber: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please enter this field
                        </div>

                        <label htmlFor='floatingInput'>
                            Unit Number
                        </label>
                    </div>
                </div>

                <div className='col mb-3'>
                    <div className='col'>
                        <div className='form-floating mb-0'>
                            <input type='text' className='form-control' id='purchasestratalot' placeholder='Strata Lot'
                                value={purchaseInfo.strataLot}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setPurchaseInfo({ ...purchaseInfo, strataLot: e.target.value });
                                }}
                            />

                            <label htmlFor='floatingInput'>
                                Strata Lot (if known)
                            </label>
                        </div>
                    </div>
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
                        Did you purchase any upgrades or extras?
                    </h6>
                </div>
            </div>

            <div className='row'>
                <div className='col mb-3'>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='upgradesextras' id='upgradesextras-yes'
                            checked={purchaseInfo.upgradesOrExtras === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setPurchaseInfo({ ...purchaseInfo, upgradesOrExtras: 'YES' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor='upgradesextras-yes'>
                            Yes
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='upgradesextras' id='upgradesextras-no'
                            checked={purchaseInfo.upgradesOrExtras === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setPurchaseInfo({ ...purchaseInfo, upgradesOrExtras: 'NO' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor='upgradesextras-no'>
                            No
                        </label>
                    </div>
                </div>
            </div>

            {
                purchaseInfo.upgradesOrExtras === 'YES' &&
                <div className='row'>
                    <div className='col'>
                        <p>
                            IMPORTANT: Please ensure the proper addendums are included in the contract you forward to us.
                        </p>

                    </div>

                </div>
            }

            {
                (purchaseInfo.clientsInfo.some((g) => g.willBeLivingInPropertyWithinThreeMonths !== 'YES')) &&
                <>
                    <div className='row'>
                        <div className='col mb-1 mt-4 newused'>
                            <h6>
                                <CircleBullet />
                                You&apos;ve indicated that no purchasers will be living in the property -
                                will there be another family member who will?
                            </h6>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col mb-3'>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='familyother' id='familyother-yes'
                                    checked={purchaseInfo.relativeLivingInstead === 'YES'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, relativeLivingInstead: 'YES' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='familyother-yes'>
                                    Yes
                                </label>
                            </div>

                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='familyother' id='familyother-no'
                                    checked={purchaseInfo.relativeLivingInstead === 'NO'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, relativeLivingInstead: 'NO' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='familyother-no'>
                                    No
                                </label>
                            </div>
                        </div>
                    </div>
                </>
            }

            {
                purchaseInfo.relativeLivingInstead === 'YES' &&
                <>
                    <div className='row'>
                        <div className='col mb-1 mt-4'>
                            <h6>
                                <CircleBullet />
                                Please provide the name and relationship of the family member
                            </h6>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col mb-3'>
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='familymembername' placeholder='Family Member Name'
                                    value={purchaseInfo.relativeLivingInsteadName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, relativeLivingInsteadName: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Family Member Name
                                </label>
                            </div>
                        </div>
                        <div className='col mb-3'>
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='familymemberrelationship' placeholder='Relationship'
                                    value={purchaseInfo.relativeLivingInsteadRelationship}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, relativeLivingInsteadRelationship: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Relationship
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
                        If you are getting a mortgage, Bank or Mortgage Lender information (if applicable)
                    </h6>
                </div>
            </div>

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
                            checked={purchaseInfo.fundsSource === ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setPurchaseInfo({ ...purchaseInfo, fundsSource: '' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor={`fundsource-notapplicable`}>
                            Not applicable
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-chequing`}
                            checked={purchaseInfo.fundsSource === 'CHEQUING_ACCOUNT'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setPurchaseInfo({ ...purchaseInfo, fundsSource: 'CHEQUING_ACCOUNT' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor={`fundsource-chequing`}>
                            Chequing Account
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name={`fundsource`} id={`fundsource-saving`}
                            checked={purchaseInfo.fundsSource === 'SAVINGS_ACCOUNT'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setPurchaseInfo({ ...purchaseInfo, fundsSource: 'SAVINGS_ACCOUNT' });
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
                            Other
                        </label>
                    </div>
                </div>

                <div className='col mb-1 mt-4'>

                </div>
            </div>

            {
                (purchaseInfo.fundsSource && (purchaseInfo.fundsSource === 'CHEQUING_ACCOUNT' || purchaseInfo.fundsSource === 'SAVINGS_ACCOUNT')) &&
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
                                    value={purchaseInfo.fundsChequingSavingsSource}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, fundsChequingSavingsSource: e.target.value });
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
                                <input type='tel' className='form-control' id='otherphone' placeholder='Phone number'
                                    value={purchaseInfo.nonPurchaserPhone}
                                    pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserPhone: e.target.value });
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
                                    value={purchaseInfo.nonPurchaserOccupation}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserOccupation: e.target.value });
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

                    <div className='row'>
                        <div className='col mb-3'>
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='otherstreet1' placeholder='Street address line 1'
                                    value={purchaseInfo.nonPurchaserStreet1}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserStreet1: e.target.value });
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
                                    value={purchaseInfo.nonPurchaserStreet2}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserStreet2: e.target.value });
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
                                    value={purchaseInfo.nonPurchaserCity}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserCity: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    City
                                </label>
                            </div>
                        </div>

                        <div className='col mb-3'>
                            <select className='form-select p-3' aria-label='Province or territory'
                                value={purchaseInfo.nonPurchaserProvinceTerritory}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    setPurchaseInfo({ ...purchaseInfo, nonPurchaserProvinceTerritory: e.target.value });
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
                                    value={purchaseInfo.nonPurchaserPostalCode}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, nonPurchaserPostalCode: e.target.value });
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

            <div className='row'>
                <div className='col mb-1 mt-4 newused'>
                    <h6>
                        <CircleBullet />
                        Are you buying this unit through an assignment?
                    </h6>
                </div>
            </div>

            <div className='row'>
                <div className='col mb-3'>
                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='assignment' id='assignment-yes'
                            checked={purchaseInfo.buyingThroughAssignment === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setPurchaseInfo({ ...purchaseInfo, buyingThroughAssignment: 'YES' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor='assignment-yes'>
                            Yes
                        </label>
                    </div>

                    <div className='form-check'>
                        <input className='form-check-input' type='radio' name='assignment' id='assignment-no'
                            checked={purchaseInfo.buyingThroughAssignment === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setPurchaseInfo({ ...purchaseInfo, buyingThroughAssignment: 'NO' });
                                }
                            }} />
                        <label className='form-check-label' htmlFor='assignment-no'>
                            No
                        </label>
                    </div>
                </div>
            </div>

            {
                purchaseInfo.buyingThroughAssignment === 'YES' &&
                <>

                    <div className='row'>
                        <div className='col mb-1 mt-4 newused'>
                            <h6>
                                <CircleBullet />
                                Is assignor a resident of Canada?
                            </h6>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col mb-3'>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='assignorResidentCanada' id='assignorResidentCanada-yes'
                                    checked={purchaseInfo.assignorResidentCanada === 'YES'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, assignorResidentCanada: 'YES' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='assignorResidentCanada-yes'>
                                    Yes
                                </label>
                            </div>

                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='assignorResidentCanada' id='assignorResidentCanada-no'
                                    checked={purchaseInfo.assignorResidentCanada === 'NO'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, assignorResidentCanada: 'NO' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='assignorResidentCanada-no'>
                                    No
                                </label>
                            </div>

                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='assignorResidentCanada' id='assignorResidentCanada-unknown'
                                    checked={purchaseInfo.assignorResidentCanada === 'UNKNOWN'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, assignorResidentCanada: 'UNKNOWN' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='assignorResidentCanada-no'>
                                    Unknown
                                </label>
                            </div>
                        </div>
                    </div>

                    {
                        purchaseInfo.assignorResidentCanada === 'NO' &&
                        <p>
                            Assignor will require a clearance certificate at time of completion
                        </p>
                    }

                    <div className='row'>
                        <div className='col mb-1 mt-4'>
                            <h6>
                                <CircleBullet />
                                Is the assignor generating a profit from the assignment?
                            </h6>
                        </div>

                        <div className='col mb-1 mt-4'>
                            <h6>
                                <CircleBullet />
                                Will the moneys be disbursed by the realtors or the lawyers?
                            </h6>
                        </div>

                    </div>


                    <div className='row'>
                        <div className='col mb-3'>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='assignorGeneratingProfit' id='assignorGeneratingProfit-yes'
                                    checked={purchaseInfo.assignorGeneratingProfit === 'YES'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, assignorGeneratingProfit: 'YES' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='assignorGeneratingProfit-yes'>
                                    Yes
                                </label>
                            </div>

                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='assignorGeneratingProfit' id='assignorGeneratingProfit-no'
                                    checked={purchaseInfo.assignorGeneratingProfit === 'NO'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, assignorGeneratingProfit: 'NO' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='assignorGeneratingProfit-no'>
                                    No
                                </label>
                            </div>

                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='assignorGeneratingProfit' id='assignorGeneratingProfit-unknown'
                                    checked={purchaseInfo.assignorGeneratingProfit === 'UNKNOWN'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, assignorGeneratingProfit: 'UNKNOWN' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='assignorGeneratingProfit-unknown'>
                                    Unknown
                                </label>
                            </div>
                        </div>


                        <div className='col mb-3'>
                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='moneysDisbursed' id='moneysDisbursed-yes'
                                    checked={purchaseInfo.moneysDisbursed === 'REALTORS'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, moneysDisbursed: 'REALTORS' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='moneysDisbursed-yes'>
                                    Realtors
                                </label>
                            </div>

                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='moneysDisbursed' id='moneysDisbursed-no'
                                    checked={purchaseInfo.moneysDisbursed === 'LAWYERS'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, moneysDisbursed: 'LAWYERS' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='moneysDisbursed-no'>
                                    Lawyers (additional fees will apply)
                                </label>
                            </div>

                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='moneysDisbursed' id='moneysDisbursed-unknown'
                                    checked={purchaseInfo.moneysDisbursed === 'UNKNOWN'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e && e.target && e.target.value && e.target.value === 'on') {
                                            setPurchaseInfo({ ...purchaseInfo, moneysDisbursed: 'UNKNOWN' });
                                        }
                                    }} />
                                <label className='form-check-label' htmlFor='moneysDisbursed-unknown'>
                                    Unknown
                                </label>
                            </div>


                        </div>

                    </div>
                </>
            }

            {
                purchaseInfo.moneysDisbursed === 'LAWYERS' &&
                <>
                    <div className='row'>
                        <div className='col mb-1 mt-4'>
                            <h6>
                                <CircleBullet />
                                If you know, please provide the name of the lawyer representing the assignor (or ask your realtor to provide us with the name)
                            </h6>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col mb-3'>
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='lawyerrepresentingassignor' placeholder='Lawyer Representing Assignor'
                                    value={purchaseInfo.lawyerForAssignor}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, lawyerForAssignor: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Lawyer name, if known
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
                        Do you have an appointment location preference?
                    </h6>
                </div>
            </div>

            <div className='row'>
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
                            211-1015 Austin Avenue, Coquitlam
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
                            300-1055 West Hastings Street, Vancouver
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
};

export default PropertyInfo;