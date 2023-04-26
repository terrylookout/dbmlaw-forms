import { ChangeEvent } from "react";
import { SaleAndPurchaseProps } from ".";
import CircleBullet from "../../controls/CircleBullet";
import DateInput from "../../controls/DateInput";


const GetSaleDetails = ({
    saleInfo,
    setSaleInfo,
}: SaleAndPurchaseProps) => {
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
                            value={saleInfo.closingDateTBD ? new Date() : saleInfo.closingDate}
                            min={new Date((new Date()).setFullYear(new Date().getFullYear() - 5))}
                            label='Closing date'
                            onChange={(e) => {
                                if (e) {
                                    setSaleInfo({ ...saleInfo, closingDate: e });
                                }
                            }} />
                    </div>
                    <div className='d-flex flex-nowrap pt-2'>
                        <input type='checkbox' id='chkclosingdatetbd' checked={saleInfo.closingDateTBD}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSaleInfo({ ...saleInfo, closingDateTBD: e.target.checked });
                            }} />
                        <label htmlFor='chkclosingdatetbd' className='ps-2'>
                            Date still to be determined
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='number' className='form-control is-required' id='saleprice' placeholder='Sale price'
                            value={saleInfo.sellingPrice}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value) {
                                    setSaleInfo({
                                        ...saleInfo, sellingPrice: e.target.value ?
                                            parseFloat(e.target.value).toString() : ''
                                    });
                                }
                            }}
                        />
                        <div className="invalid-feedback">
                            Please enter this field
                        </div>

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
                            value={saleInfo.street1}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSaleInfo({ ...saleInfo, street1: e.target.value });
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
                            value={saleInfo.street2}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSaleInfo({ ...saleInfo, street2: e.target.value });
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
                            value={saleInfo.city}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSaleInfo({ ...saleInfo, city: e.target.value });
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
                        value={saleInfo.provinceTerritory}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setSaleInfo({ ...saleInfo, provinceTerritory: e.target.value });
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
                        <input type='text' className='form-control' id='sellingpostalcode' placeholder='Postal code'
                            value={saleInfo.postalCode}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSaleInfo({ ...saleInfo, postalCode: e.target.value });
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
                            value={saleInfo.realtorName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSaleInfo({ ...saleInfo, realtorName: e.target.value });
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
                            value={saleInfo.realtorPhone}
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSaleInfo({ ...saleInfo, realtorPhone: e.target.value });
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
                            checked={saleInfo.mortgageOrLoCOnTitle === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setSaleInfo({ ...saleInfo, mortgageOrLoCOnTitle: 'YES' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor="mortgageselling-yes">
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="mortgageselling" id="mortgageselling-no"
                            checked={saleInfo.mortgageOrLoCOnTitle === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setSaleInfo({ ...saleInfo, mortgageOrLoCOnTitle: 'NO' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor="mortgageselling-no">
                            No
                        </label>
                    </div>
                </div>
            </div>

            {
                saleInfo.mortgageOrLoCOnTitle === 'YES' &&
                <>
                    <div className="row">
                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='referencenumber' placeholder='Reference number'
                                    value={saleInfo.mortgageOrLoCOnTitleReferenceNumber}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setSaleInfo({ ...saleInfo, mortgageOrLoCOnTitleReferenceNumber: e.target.value });
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
                                    value={saleInfo.mortgageOrLoCOnTitleBankBranch}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setSaleInfo({ ...saleInfo, mortgageOrLoCOnTitleBankBranch: e.target.value });
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
                            checked={saleInfo.involvesSeparationDivorce === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setSaleInfo({ ...saleInfo, involvesSeparationDivorce: 'YES' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`separation-yes`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`separation`} id={`separation-no`}
                            checked={saleInfo.involvesSeparationDivorce === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setSaleInfo({ ...saleInfo, involvesSeparationDivorce: 'NO' });
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
                            checked={saleInfo.paidPropertyTaxes === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setSaleInfo({ ...saleInfo, paidPropertyTaxes: 'YES' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`propertytaxes-yes`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`propertytaxes`} id={`propertytaxes-no`}
                            checked={saleInfo.paidPropertyTaxes === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setSaleInfo({ ...saleInfo, paidPropertyTaxes: 'NO' });
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
                            checked={saleInfo.claimedHownOwnersGrant === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setSaleInfo({ ...saleInfo, claimedHownOwnersGrant: 'YES' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`homeownersgrant-yes`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`homeownersgrant`} id={`homeownersgrant-no`}
                            checked={saleInfo.claimedHownOwnersGrant === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setSaleInfo({ ...saleInfo, claimedHownOwnersGrant: 'NO' });
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
                            checked={saleInfo.emptyHomesDeclaration === 'OCCUPIED'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setSaleInfo({ ...saleInfo, emptyHomesDeclaration: 'OCCUPIED' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`emptyhome-occupied`}>
                            Occupied
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`emptyhome`} id={`emptyhome-vacant`}
                            checked={saleInfo.emptyHomesDeclaration === 'VACANT'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setSaleInfo({ ...saleInfo, emptyHomesDeclaration: 'VACANT' });
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
                            checked={saleInfo.emptyHomesDeclaration === 'NOT_COMPLETED'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setSaleInfo({ ...saleInfo, emptyHomesDeclaration: 'NOT_COMPLETED' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`emptyhome-notfiled`}>
                            Not completed/filed
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`emptyhome`} id={`emptyhome-notapplicable`}
                            checked={saleInfo.emptyHomesDeclaration === 'NOT_APPLICABLE'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e.target.checked) {
                                    setSaleInfo({ ...saleInfo, emptyHomesDeclaration: 'NOT_APPLICABLE' });
                                }
                            }} />

                        <label className="form-check-label" htmlFor={`emptyhome-notapplicable`}>
                            Not applicable
                        </label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GetSaleDetails;