import { ChangeEvent, Fragment } from "react";
import CircleBullet from "../../controls/CircleBullet";
import { RefinanceProps } from ".";
import Guarantor from "../../Guarantor";
import { GuarantorInfo } from "../../ClassesInterfaces";
import IsRequired from "../../controls/IsRequired";

const GetMortgateDetails = ({
    refinanceInfo,
    setRefinanceInfo,
    numberOfGuarantors,
    setNumberOfGuarantors,
}: RefinanceProps) => {

    return (
        <>

            <div className="row">
                <div className="col mb-1 mt-4 top-second-page">
                    <h6>
                        <CircleBullet />
                        Name of Mortgage Lender?
                    </h6>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control is-required' id='mortgagelendername' placeholder='Mortgage Lender name'
                            value={refinanceInfo.mortgageLenderName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRefinanceInfo({ ...refinanceInfo, mortgageLenderName: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please enter this field
                        </div>

                        <label htmlFor='mortgagelendername'>
                            Mortgage Lender name
                            <IsRequired />
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Is there currently a mortgage or line of credit on title that will need to be paid out and discharged?
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="mortgageselling" id="mortgageselling-yes"
                            checked={refinanceInfo.mortgageOrLoCOnTitle === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setRefinanceInfo({ ...refinanceInfo, mortgageOrLoCOnTitle: 'YES' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor="mortgageselling-yes">
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="mortgageselling" id="mortgageselling-no"
                            checked={refinanceInfo.mortgageOrLoCOnTitle === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setRefinanceInfo({ ...refinanceInfo, mortgageOrLoCOnTitle: 'NO' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor="mortgageselling-no">
                            No
                        </label>
                    </div>
                </div>
            </div>

            {
                refinanceInfo.mortgageOrLoCOnTitle === 'YES' &&
                <>
                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='referencenumber' placeholder='Reference number'
                                    value={refinanceInfo.mortgageOrLoCOnTitleReferenceNumber}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setRefinanceInfo({ ...refinanceInfo, mortgageOrLoCOnTitleReferenceNumber: e.target.value });
                                    }}
                                />
                                <label htmlFor='referencenumber'>
                                    Reference number
                                </label>
                            </div>
                        </div>

                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='bankbranch' placeholder='Bank and Brank'
                                    value={refinanceInfo.mortgageOrLoCOnTitleBankBranch}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setRefinanceInfo({ ...refinanceInfo, mortgageOrLoCOnTitleBankBranch: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Bank and Branch
                                </label>
                            </div>
                        </div>
                    </div>
                </>
            }

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Does Mortgage Lender require other debts to be paid?
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="mortgagedebt" id="mortgagedebts-yes"
                            checked={refinanceInfo.mortgageLenderRequiresOtherDebtsPaid === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setRefinanceInfo({ ...refinanceInfo, mortgageLenderRequiresOtherDebtsPaid: 'YES' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor="mortgagedebts-yes">
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="mortgagedebts" id="mortgagedebts-no"
                            checked={refinanceInfo.mortgageLenderRequiresOtherDebtsPaid === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setRefinanceInfo({ ...refinanceInfo, mortgageLenderRequiresOtherDebtsPaid: 'NO' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor="mortgagedebts-no">
                            No
                        </label>
                    </div>
                </div>
            </div>

            {
                refinanceInfo.mortgageLenderRequiresOtherDebtsPaid === 'YES' &&
                <div className="row">
                    <div className="col mb-3">
                        <div className='form-floating mb-0'>
                            <input type='text' className='form-control' id='mortgagelenderotherdebts' placeholder='Mortgage Lender Other Debts'
                                value={refinanceInfo.mortgageLenderRequiresOtherDebtsPaidDetails}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setRefinanceInfo({ ...refinanceInfo, mortgageLenderRequiresOtherDebtsPaidDetails: e.target.value });
                                }}
                            />
                            <label htmlFor='mortgagelendername'>
                                Enter details ie. Credit card, student loans, etc.
                            </label>
                        </div>
                    </div>
                </div>


            }

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Does this involve a separation or divorce?
                    </h6>
                </div>
            </div>
            <div className="row">
                <div className="col mb-1">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`separation`} id={`separation-yes`}
                            checked={refinanceInfo.involvesSeparationDivorce === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setRefinanceInfo({ ...refinanceInfo, involvesSeparationDivorce: 'YES' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`separation-yes`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`separation`} id={`separation-no`}
                            checked={refinanceInfo.involvesSeparationDivorce === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setRefinanceInfo({ ...refinanceInfo, involvesSeparationDivorce: 'NO' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`separation-no`}>
                            No
                        </label>
                    </div>

                </div>
            </div>

            {
                refinanceInfo.clientsInfo.length > 1 &&
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
                                    checked={refinanceInfo.joinType === 'JOINT_TENANTS'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.checked) {
                                            const tempClients = [];
                                            for (const client of refinanceInfo.clientsInfo) {
                                                client.tenantInCommonPercent = 0;
                                                tempClients.push(client);
                                            }

                                            const tempAddedClients = [];
                                            for (const client of refinanceInfo.clientsAddedInfo) {
                                                client.tenantInCommonPercent = 0;
                                                tempAddedClients.push(client);
                                            }

                                            setRefinanceInfo({
                                                ...refinanceInfo, joinType: 'JOINT_TENANTS',
                                                clientsInfo: tempClients, clientsAddedInfo: tempAddedClients
                                            });
                                        }
                                    }}
                                />
                                <label className='form-check-label' htmlFor='jointtenants'>
                                    Joint Tenants
                                </label>
                            </div>

                            <div className='form-check'>
                                <input className='form-check-input' type='radio' name='ownertype' id='tenantsincommon'
                                    checked={refinanceInfo.joinType === 'TENANTS_IN_COMMON'}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        if (e.target.checked) {
                                            const tempClients = [];
                                            for (const client of refinanceInfo.clientsInfo) {
                                                client.tenantInCommonPercent = 0;
                                                tempClients.push(client);
                                            }

                                            const tempAddedClients = [];
                                            for (const client of refinanceInfo.clientsAddedInfo) {
                                                client.tenantInCommonPercent = 0;
                                                tempAddedClients.push(client);
                                            }

                                            setRefinanceInfo({
                                                ...refinanceInfo, joinType: 'TENANTS_IN_COMMON',
                                                clientsInfo: tempClients, clientsAddedInfo: tempAddedClients
                                            });
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
                refinanceInfo.joinType === 'TENANTS_IN_COMMON' &&
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
                                {refinanceInfo.clientsInfo.map((c) => {
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

                                                        for (const t of refinanceInfo.clientsInfo) {
                                                            if (t.fullLegalName === c.fullLegalName) {
                                                                t.tenantInCommonPercent = parseFloat(e.target.value);
                                                            }

                                                            temp.push(t);
                                                        }

                                                        setRefinanceInfo({ ...refinanceInfo, clientsInfo: temp });
                                                    })}
                                                />
                                            </div>
                                        </Fragment>
                                    );
                                })}

                                {refinanceInfo.clientsAddedInfo.map((c) => {
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

                                                        for (const t of refinanceInfo.clientsAddedInfo) {
                                                            if (t.fullLegalName === c.fullLegalName) {
                                                                t.tenantInCommonPercent = parseFloat(e.target.value);
                                                            }

                                                            temp.push(t);
                                                        }

                                                        setRefinanceInfo({ ...refinanceInfo, clientsAddedInfo: temp });
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
                        value={refinanceInfo.guarantorsInfo.length}
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
                        refinanceInfo.guarantorsInfo.map((c, i) => {
                            return (
                                <Guarantor text={'Guarantor/Co-signer'}
                                    num={i}
                                    key={c.id}
                                    numberOfPurchasers={refinanceInfo.clientsInfo.length}
                                    guarantorInfo={refinanceInfo.guarantorsInfo[i]}
                                    updated={(c: GuarantorInfo, idx: number) => {
                                        const tempGuarantors: GuarantorInfo[] = [];
                                        for (let t = 0; t < refinanceInfo.guarantorsInfo.length; t++) {
                                            if (t === idx) {
                                                tempGuarantors.push(c);
                                            }
                                            else {
                                                tempGuarantors.push(refinanceInfo.guarantorsInfo[t]);
                                            }
                                        }
                                        setRefinanceInfo({ ...refinanceInfo, guarantorsInfo: tempGuarantors });
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
                        value={refinanceInfo.additionalComments}
                        rows={6}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            setRefinanceInfo({ ...refinanceInfo, additionalComments: e.target.value });
                        }}>
                    </textarea>

                </div>
            </div>

        </>
    );
};

export default GetMortgateDetails;