import { ChangeEvent, ReactElement } from "react";
import { ClientInfo } from "../../ClassesInterfaces";
import Seller from "../../controls/Seller";
import { SalesChildProps } from "./SaleForm";

const SalesGetSellers = (props: SalesChildProps): ReactElement => {

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
                        disabled={props.saleInfo.forCompany}
                        value={props.saleInfo.clientsInfo.length}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            if (e && e.target && e.target.value) {
                                const num = parseInt(e.target.value);
                                const temp = [...props.saleInfo.clientsInfo];

                                if (num > temp.length - 1) {
                                    while (num > temp.length) {
                                        temp.push(new ClientInfo());
                                    }
                                } else {
                                    while (num < temp.length) {
                                        temp.pop();
                                    }
                                }
                                props.setSaleInfo({ ...props.saleInfo, clientsInfo: temp });
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
                        <input type='checkbox' id='iscompanyseller' checked={props.saleInfo.forCompany}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setSaleInfo({ ...props.saleInfo, forCompany: e.target.checked });
                            }} />
                        <label htmlFor='iscompanyseller' className='ps-2'>
                            This is for a company
                        </label>
                    </div>
                </div>
            </div>

            {
                props.saleInfo.forCompany &&
                <>
                    <div className="row">
                        <div className="col mb-1 mt-4">
                            <p className='mb-4'>
                                If this purchase involves a corporation, a trustee of a trust or a partner of a
                                partnership, please advise our office immediately. Additional fees and disbursements will apply.
                            </p>
                            <h6>
                                Please fill in company name, incorporation number, and signatory. Note that you will be contacted
                                for additional information such as minutes books and company share registry.
                            </h6>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='companynameseller' placeholder='Company name'
                                    value={props.saleInfo.companyName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setSaleInfo({ ...props.saleInfo, companyName: e.target.value });
                                    }}
                                />
                                <label htmlFor='companynameseller'>
                                    Company name (required)
                                </label>
                            </div>
                        </div>

                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='incorporationnumberseller' placeholder='Incorporation #'
                                    value={props.saleInfo.incorporationNumber}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setSaleInfo({ ...props.saleInfo, incorporationNumber: e.target.value });
                                    }}
                                />
                                <label htmlFor='incorporationnumberseller'>
                                    Incorporation # (required)
                                </label>
                            </div>
                        </div>
                    </div>

                </>
            }

            {
                props.saleInfo.clientsInfo.length > 0 &&
                <>
                    {
                        props.saleInfo.clientsInfo.map((c, i) => {
                            return (
                                <Seller text={props.saleInfo.forCompany ? 'Signatory' : 'Seller'}
                                    num={i}
                                    key={c.id}
                                    clientInfo={props.saleInfo.clientsInfo[i]}
                                    client1Info={props.saleInfo.clientsInfo.length > 1 ? props.saleInfo.clientsInfo[0] : null}
                                    company={props.saleInfo.forCompany}
                                    updated={(c: ClientInfo, idx: number) => {
                                        const tempClients: ClientInfo[] = [];
                                        for (let t = 0; t < props.saleInfo.clientsInfo.length; t++) {
                                            if (t === idx) {
                                                tempClients.push(c);
                                            }
                                            else {
                                                tempClients.push(props.saleInfo.clientsInfo[t]);
                                            }
                                        }
                                        props.setSaleInfo({ ...props.saleInfo, clientsInfo: tempClients });
                                    }}
                                />
                            );
                        })
                    }

                </>
            }
        </>
    )
}

export default SalesGetSellers;