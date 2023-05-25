import { ChangeEvent } from "react";
import CircleBullet from "../../controls/CircleBullet";
import { RefinanceProps } from ".";
import IsRequired from "../../controls/IsRequired";
import PhoneNumber from "../../controls/PhoneNumber";


const GetPropertyDetails = ({
    refinanceInfo,
    setRefinanceInfo,
}: RefinanceProps) => {

    return (
        <>
            <div className="row">
                <div className="col mb-1 mt-2 top-second-page">
                    &nbsp;
                </div>
            </div>


            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Address of mortgage/subject property
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control is-required' id='sellingstreet1' placeholder='Street address line 1'
                            value={refinanceInfo.street1}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRefinanceInfo({ ...refinanceInfo, street1: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please choose a street.
                        </div>
                        <label htmlFor='floatingInput'>
                            Street address line 1
                            <IsRequired />
                        </label>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='sellingstreet2' placeholder='Street address line 2'
                            value={refinanceInfo.street2}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRefinanceInfo({ ...refinanceInfo, street2: e.target.value });
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
                            value={refinanceInfo.city}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRefinanceInfo({ ...refinanceInfo, city: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please choose a city.
                        </div>
                        <label htmlFor='floatingInput'>
                            City
                            <IsRequired />
                        </label>
                    </div>
                </div>
                <div className="col mb-3">
                    <select className="form-select p-3 is-required" aria-label="Province or territory"
                        value={refinanceInfo.provinceTerritory}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            setRefinanceInfo({ ...refinanceInfo, provinceTerritory: e.target.value });
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
                        Please choose a Province or Territory.
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control is-required' id='sellingpostalcode' placeholder='Postal code'
                            value={refinanceInfo.postalCode}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRefinanceInfo({ ...refinanceInfo, postalCode: e.target.value });
                            }}
                        />
                        <div className="invalid-feedback">
                            Please choose a Postal Code.
                        </div>
                        <label htmlFor='floatingInput'>
                            Postal code
                            <IsRequired />
                        </label>
                    </div>
                </div>

                <div className='col'></div>
            </div>

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        If this is a strata, please enter the following information (if applicable)
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='strataname' placeholder='Strata name'
                            value={refinanceInfo.strataName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRefinanceInfo({ ...refinanceInfo, strataName: e.target.value });
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
                        Your house insurance information
                    </h6>
                </div>
            </div>

            <div className='row'>
                <div className='col mb-3'>
                    <div className='form-floating mb-0'>
                        <input type='text' className='form-control' id='insurancename' placeholder='Agent name'
                            value={refinanceInfo.insuranceAgentName}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setRefinanceInfo({ ...refinanceInfo, insuranceAgentName: e.target.value });
                            }}
                        />
                        <label htmlFor='insurancename'>
                            Agent name
                        </label>
                    </div>
                </div>
                <div className='col mb-3'>

                    <PhoneNumber
                        onChange={(e: string) => {
                            setRefinanceInfo({ ...refinanceInfo, insuranceAgentPhone: e });
                        }}
                        value={refinanceInfo.insuranceAgentPhone}
                        placeholder="Agent phone number"
                    />

                </div>
            </div>
        </>
    );
};

export default GetPropertyDetails;