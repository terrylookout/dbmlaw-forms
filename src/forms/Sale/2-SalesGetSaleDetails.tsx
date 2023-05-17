import { ChangeEvent, ReactElement } from "react";
import CircleBullet from "../../controls/CircleBullet";
import DateInput from "../../controls/DateInput";
import { SalesChildProps } from ".";
import NumericInput from "../../controls/NumericInput";

const SalesGetSaleDetails = (props: SalesChildProps): ReactElement => {

    return (
        <>
            <div className="row">
                <div className="col mb-1 mt-2 top-second-page">
                    &nbsp;
                </div>
            </div>
            <div className="row">

                <div className="col mb-1">
                    <h6>
                        <CircleBullet />
                        Sale and Property Information
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <DateInput
                            className='form-control'
                            id={`closingdate`}
                            value={props.saleInfo.closingDateTBD ? null : props.saleInfo.closingDate}
                            min={new Date((new Date()).setFullYear(new Date().getFullYear() - 5))}
                            label='Closing date'
                            onChange={(e) => {
                                if (e) {
                                    props.setSaleInfo({ ...props.saleInfo, closingDate: e });
                                }
                            }} />
                    </div>
                    <div className='d-flex flex-nowrap pt-2'>
                        <input type='checkbox' id='chkclosingdatetbd' checked={props.saleInfo.closingDateTBD}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setSaleInfo({ ...props.saleInfo, closingDateTBD: e.target.checked });
                            }} />
                        <label htmlFor='chkclosingdatetbd' className='ms-1'>
                            Date still to be determined
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <NumericInput id='saleprice' placeholder='Sale price' disabled={false}
                            value={props.saleInfo.sellingPrice}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target) {
                                    props.setSaleInfo({
                                        ...props.saleInfo, sellingPrice: e.target.value ?
                                            e.target.value : ''
                                    });
                                }
                            }}
                        />
                        <label htmlFor='saleprice'>
                            Sale price (CAD) if known
                        </label>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Address of sale property
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control is-required' id='sellingstreet1' placeholder='Street address line 1'
                            value={props.saleInfo.street1}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setSaleInfo({ ...props.saleInfo, street1: e.target.value });
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

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='sellingstreet2' placeholder='Street address line 2'
                            value={props.saleInfo.street2}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setSaleInfo({ ...props.saleInfo, street2: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            Street address line 2
                        </label>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control is-required' id='sellingcity' placeholder='City'
                            value={props.saleInfo.city}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setSaleInfo({ ...props.saleInfo, city: e.target.value });
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
                <div className="col mb-3">
                    <select className="form-select p-3 is-required" aria-label="Province or territory"
                        value={props.saleInfo.provinceTerritory}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            props.setSaleInfo({ ...props.saleInfo, provinceTerritory: e.target.value });
                        }}
                    >
                        <option value='0'>Province or territory</option>
                        <option value="Alberta">Alberta</option>
                        <option value="British Columbia">British Columbia</option>
                        <option value="Manitoba">Manitoba</option>
                        <option value="New Brunswick">New Brunswick</option>
                        <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
                        <option value="Northwest Territories">Northwest Territories</option>
                        <option value="Nova Scotia">Nova Scotia</option>
                        <option value="Nunavut">Nunavut</option>
                        <option value="Ontario">Ontario</option>
                        <option value="Prince Edward Island">Prince Edward Island</option>
                        <option value="Quebec">Québec</option>
                        <option value="Saskatchewan">Saskatchewan</option>
                        <option value="Yukon">Yukon</option>
                    </select>
                    <div className="invalid-feedback">
                        Please enter this field
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control is-required' id='sellingpostalcode' placeholder='Postal code'
                            value={props.saleInfo.postalCode}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setSaleInfo({ ...props.saleInfo, postalCode: e.target.value });
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

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Your realtor information (if applicable)
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='realtornameseller' placeholder='Realtor name'
                            value={props.saleInfo.realtorName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setSaleInfo({ ...props.saleInfo, realtorName: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            Realtor name
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='tel' className='form-control' id='realtorphoneselling' placeholder='Phone number'
                            value={props.saleInfo.realtorPhone}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setSaleInfo({ ...props.saleInfo, realtorPhone: e.target.value });
                            }}
                        />
                        <label htmlFor='floatingInput'>
                            Phone number - format: 123-456-7890
                        </label>
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Is there a mortgage or line of credit on title?
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="mortgageselling" id="mortgageselling-yes"
                            checked={props.saleInfo.mortgageOrLoCOnTitle === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    props.setSaleInfo({ ...props.saleInfo, mortgageOrLoCOnTitle: 'YES' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor="mortgageselling-yes">
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="mortgageselling" id="mortgageselling-no"
                            checked={props.saleInfo.mortgageOrLoCOnTitle === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    props.setSaleInfo({ ...props.saleInfo, mortgageOrLoCOnTitle: 'NO' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor="mortgageselling-no">
                            No
                        </label>
                    </div>
                </div>
            </div>

            {
                props.saleInfo.mortgageOrLoCOnTitle === 'YES' &&
                <>
                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='referencenumber' placeholder='Reference number'
                                    value={props.saleInfo.mortgageOrLoCOnTitleReferenceNumber}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setSaleInfo({ ...props.saleInfo, mortgageOrLoCOnTitleReferenceNumber: e.target.value });
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
                                    value={props.saleInfo.mortgageOrLoCOnTitleBankBranch}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setSaleInfo({ ...props.saleInfo, mortgageOrLoCOnTitleBankBranch: e.target.value });
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
                        Does this involve a separation or divorce?
                    </h6>
                </div>
            </div>
            <div className="row">
                <div className="col mb-1">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`separation`} id={`separation-yes`}
                            checked={props.saleInfo.involvesSeparationDivorce === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setSaleInfo({ ...props.saleInfo, involvesSeparationDivorce: 'YES' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`separation-yes`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`separation`} id={`separation-no`}
                            checked={props.saleInfo.involvesSeparationDivorce === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setSaleInfo({ ...props.saleInfo, involvesSeparationDivorce: 'NO' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`separation-no`}>
                            No
                        </label>
                    </div>

                </div>
            </div>


            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Have you paid the property taxes for the current applicable year?
                    </h6>
                </div>
            </div>
            <div className="row">
                <div className="col mb-1">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`propertytaxes`} id={`propertytaxes-yes`}
                            checked={props.saleInfo.paidPropertyTaxes === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setSaleInfo({ ...props.saleInfo, paidPropertyTaxes: 'YES' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`propertytaxes-yes`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`propertytaxes`} id={`propertytaxes-no`}
                            checked={props.saleInfo.paidPropertyTaxes === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setSaleInfo({ ...props.saleInfo, paidPropertyTaxes: 'NO' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`propertytaxes-no`}>
                            No
                        </label>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Have you claimed the Home Owner&apos;s Grant for the current applicable year?
                    </h6>
                </div>
            </div>
            <div className="row">
                <div className="col mb-1">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`homeownersgrant`} id={`homeownersgrant-yes`}
                            checked={props.saleInfo.claimedHownOwnersGrant === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setSaleInfo({ ...props.saleInfo, claimedHownOwnersGrant: 'YES' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`homeownersgrant-yes`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`homeownersgrant`} id={`homeownersgrant-no`}
                            checked={props.saleInfo.claimedHownOwnersGrant === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setSaleInfo({ ...props.saleInfo, claimedHownOwnersGrant: 'NO' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`homeownersgrant-no`}>
                            No
                        </label>
                    </div>

                </div>
            </div>

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        If applicable, have you filed your Empty Homes Declaration (Vancouver property)?
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-1">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`emptyhome`} id={`emptyhome-occupied`}
                            checked={props.saleInfo.emptyHomesDeclaration === 'OCCUPIED'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setSaleInfo({ ...props.saleInfo, emptyHomesDeclaration: 'OCCUPIED' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`emptyhome-occupied`}>
                            Occupied
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`emptyhome`} id={`emptyhome-vacant`}
                            checked={props.saleInfo.emptyHomesDeclaration === 'VACANT'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setSaleInfo({ ...props.saleInfo, emptyHomesDeclaration: 'VACANT' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`emptyhome-vacant`}>
                            Vacant
                        </label>
                    </div>
                </div>

                <div className="col mb-1">

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`emptyhome`} id={`emptyhome-notfiled`}
                            checked={props.saleInfo.emptyHomesDeclaration === 'NOT_COMPLETED'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setSaleInfo({ ...props.saleInfo, emptyHomesDeclaration: 'NOT_COMPLETED' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`emptyhome-notfiled`}>
                            Not completed/filed
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`emptyhome`} id={`emptyhome-notapplicable`}
                            checked={props.saleInfo.emptyHomesDeclaration === 'NOT_APPLICABLE'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    props.setSaleInfo({ ...props.saleInfo, emptyHomesDeclaration: 'NOT_APPLICABLE' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`emptyhome-notapplicable`}>
                            Not applicable
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Do you have any additional details, questions, or concerns?
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">

                    <textarea
                        className='dbm-textarea'
                        style={{
                            width: '100%',
                        }}
                        value={props.saleInfo.additionalComments}
                        rows={6}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                            props.setSaleInfo({ ...props.saleInfo, additionalComments: e.target.value });
                        }}>
                    </textarea>

                </div>
            </div>
        </>
    )
};

export default SalesGetSaleDetails;