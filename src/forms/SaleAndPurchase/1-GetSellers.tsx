import { ChangeEvent } from "react";
import { SaleAndPurchaseProps } from ".";
import Seller from "../../controls/Seller";
import { ClientInfo } from "../../ClassesInterfaces";


const GetSellers = ({
    saleInfo,
    setSaleInfo,
    numberOfSellers,
    setNumberOfSellers,
}: SaleAndPurchaseProps) => {
    return (
        <>
            <div className="row">
                <div className="col mb-3">
                    <h6>
                        Seller Information
                    </h6>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col mb-3">
                    <h6>
                        How many people on title for the property being sold?
                    </h6>
                </div>

                <div className="col col-7 mb-3">
                    <select className="form-select p-3" aria-label="Sellers"
                        value={numberOfSellers}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            if (e && e.target && e.target.value) {
                                setNumberOfSellers(parseInt(e.target.value));
                            }
                        }}>
                        <option value='0'>Please choose...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    <div className='d-flex flex-nowrap pt-2'>
                        <input type='checkbox' id='iscompanyseller' checked={saleInfo.forCompany}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setSaleInfo({ ...saleInfo, forCompany: e.target.checked });
                            }} />
                        <label htmlFor='iscompanyseller' className='ps-2'>
                            This is for a company
                        </label>
                    </div>
                </div>
            </div>

            {
                saleInfo.forCompany &&
                <>
                    <div className="row">
                        <div className="col mb-1 mt-4">
                            <h6>
                                Please fill in company name, incorporation number, and signatory. Note that you will be contacted
                                for additional information such as minutes books and company share registry.
                            </h6>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control is-required' id='companynameseller' placeholder='Company name'
                                    value={saleInfo.companyName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setSaleInfo({ ...saleInfo, companyName: e.target.value });
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Please enter this field
                                </div>
                                <label htmlFor='companynameseller'>
                                    Company name (required)
                                </label>
                            </div>
                        </div>

                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control is-required' id='incorporationnumberseller' placeholder='Incorporation #'
                                    value={saleInfo.incorporationNumber}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setSaleInfo({ ...saleInfo, incorporationNumber: e.target.value });
                                    }}
                                />
                                <div className="invalid-feedback">
                                    Please enter this field
                                </div>
                                <label htmlFor='incorporationnumberseller'>
                                    Incorporation # (required)
                                </label>
                            </div>
                        </div>
                    </div>

                </>
            }

            {
                numberOfSellers > 0 &&
                <>
                    {
                        saleInfo.clientsInfo.map((c, i) => {
                            return (
                                <Seller text={saleInfo.forCompany ? 'Signatory' : 'Seller'}
                                    num={i}
                                    key={c.id}
                                    clientInfo={saleInfo.clientsInfo[i]}
                                    client1Info={saleInfo.clientsInfo.length > 1 ? saleInfo.clientsInfo[0] : null}
                                    company={saleInfo.forCompany}
                                    updated={(c: ClientInfo, idx: number) => {
                                        const tempClients: ClientInfo[] = [];
                                        for (let t = 0; t < saleInfo.clientsInfo.length; t++) {
                                            if (t === idx) {
                                                tempClients.push(c);
                                            }
                                            else {
                                                tempClients.push(saleInfo.clientsInfo[t]);
                                            }
                                        }
                                        setSaleInfo({ ...saleInfo, clientsInfo: tempClients });
                                    }}
                                />
                            );
                        })
                    }

                </>
            }
        </>
    );
};

export default GetSellers;