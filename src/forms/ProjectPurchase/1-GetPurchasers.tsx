import { ChangeEvent } from "react";
import { ProjectPurchaseProps } from ".";
import Client from "../../controls/Client";
import { ClientInfo } from "../../ClassesInterfaces";


const GetPurchasers = ({
    numberOfClients,
    purchaseInfo,
    setNumberOfClients,
    setPurchaseInfo,
}: ProjectPurchaseProps) => {
    return (
        <>
            <div className='row'>
                <div className='col mb-3'>
                    <h6>
                        Purchaser Information
                    </h6>
                </div>
            </div>

            <div className='row align-items-center'>
                <div className='col col-5 mb-3'>
                    <h6>
                        How many Purchasers are there?
                    </h6>
                </div>

                <div className='col col-7 mb-3'>
                    <select className='form-select p-3' aria-label='Purchasers'
                        value={numberOfClients}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            if (e && e.target && e.target.value) {
                                setNumberOfClients(parseInt(e.target.value));
                            }
                        }}>
                        <option value='0'>Please choose</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                    </select>
                    <div className='d-flex flex-nowrap pt-2'>
                        <input type='checkbox' id='iscompany' checked={purchaseInfo.forCompany}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setPurchaseInfo({ ...purchaseInfo, forCompany: e.target.checked });

                                if (e.target.checked) {
                                    setNumberOfClients(1);
                                }
                                else {
                                    setNumberOfClients(0);
                                }
                            }} />
                        <label htmlFor='iscompany' className='ps-2'>
                            This is for a company
                        </label>
                    </div>
                </div>
            </div>

            {
                purchaseInfo.forCompany &&
                <>
                    <div className='row'>
                        <div className='col mb-1 mt-3'>
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

                    <div className='row'>

                        <div className='col mb-3'>
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

                        <div className='col mb-3'>
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

                    <p>
                        <b>****THE PERSON(S) LISTED MUST BE THE
                            SAME PERSON(S) ON YOUR CONTRACT OF PURCHASE AND
                            SALE</b>
                    </p>

                    <p>
                        <b>****If the person(s) you list are different from the person(s) on
                            your contract, please contact the sales office immediately</b> to execute
                        the appropriate assignment documents and forward our offices
                        copies upon execution; If the lawyers have to be involved in the
                        assignment, please be advised that extra fees will apply
                    </p>

                    <p>
                        Having the
                        right to add/remove person(s) to a contract is NOT sufficient—you
                        will still need to get an assignment done
                    </p>

                    {
                        purchaseInfo.clientsInfo.map((c, i) => {
                            return (
                                <Client text={purchaseInfo.forCompany ? 'Signatory' : 'Purchaser'}
                                    num={i}
                                    key={c.id}
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