import { ChangeEvent, useState } from "react";
import { SaleAndPurchaseProps } from ".";
import Client from "../../controls/Client";
import { ClientInfo } from "../../ClassesInterfaces";


const GetPurchasers = ({
    numberOfClients,
    setNumberOfClients,
    purchaseInfo,
    setPurchaseInfo,
    sellersArePurchasers,
    setSellersArePurchasers,

}: SaleAndPurchaseProps) => {

    const [showFTHB, setShowFTHB] = useState(true);

    return (
        <>
            <div className="row">
                <div className="col mb-3">
                    <h6>
                        Your Purchase Information
                    </h6>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col mb-3">
                    <h6>
                        How many purchasers are there?
                    </h6>
                </div>

                <div className="col mb-3">
                    <select className="form-select p-3" aria-label="Province or territory"
                        value={numberOfClients}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            if (e && e.target && e.target.value) {
                                setShowFTHB(true);
                                setNumberOfClients(parseInt(e.target.value));
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
                    <div>
                        <input type='checkbox' id='iscompany' checked={purchaseInfo.forCompany}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPurchaseInfo({ ...purchaseInfo, forCompany: e.target.checked });
                            }} />
                        <label htmlFor='iscompany' className='pt-2 ps-1'>
                            This is for a company
                        </label>
                    </div>
                    <div className='mt-5'>
                        OR
                    </div>
                    <div className='mt-5'>
                        <input type='button' value='Sellers are also the Purchasers'
                            className='btn btn-primary'
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                setSellersArePurchasers(!sellersArePurchasers);
                                setShowFTHB(false);
                            }}
                        />
                    </div>
                </div>
            </div>

            {
                purchaseInfo.forCompany &&
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
                                <input type='text' className='form-control' id='companyname' placeholder='Company name'
                                    value={purchaseInfo.companyName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, companyName: e.target.value });
                                    }}
                                />
                                <label htmlFor='companyname'>
                                    Company name (required)
                                </label>
                            </div>
                        </div>

                        <div className="col mb-3">
                            <div className='form-floating mb-0'>
                                <input type='text' className='form-control' id='incorporationnumber' placeholder='Incorporation #'
                                    value={purchaseInfo.incorporationNumber}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setPurchaseInfo({ ...purchaseInfo, incorporationNumber: e.target.value });
                                    }}
                                />
                                <label htmlFor='floatingInput'>
                                    Incorporation # (required)
                                </label>
                            </div>
                        </div>
                    </div>

                </>
            }

            {
                numberOfClients > 0 &&
                <>
                    {
                        purchaseInfo.clientsInfo.map((c, i) => {
                            return (
                                <Client text={purchaseInfo.forCompany ? 'Signatory' : 'Purchaser'}
                                    num={i}
                                    key={c.id}
                                    showFTHB={showFTHB}
                                    clientInfo={purchaseInfo.clientsInfo[i]}
                                    client1Info={purchaseInfo.clientsInfo.length > 1 ? purchaseInfo.clientsInfo[0] : null}
                                    company={purchaseInfo.forCompany}
                                    updated={(c: ClientInfo, idx: number) => {
                                        const tempClients: ClientInfo[] = [];
                                        for (let t = 0; t < purchaseInfo.clientsInfo.length; t++) {
                                            if (t === idx) {
                                                tempClients.push(c);
                                            }
                                            else {
                                                tempClients.push(purchaseInfo.clientsInfo[t]);
                                            }
                                        }

                                        setPurchaseInfo({ ...purchaseInfo, clientsInfo: tempClients });
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

export default GetPurchasers;