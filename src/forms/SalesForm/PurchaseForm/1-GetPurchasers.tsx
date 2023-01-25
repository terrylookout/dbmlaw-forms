import { ChangeEvent, ReactElement } from "react";
import { ClientInfo } from "../../../ClassesInterfaces";
import Client from "../../../controls/Client";
import { PurchaseFormChildProps } from "./PurchaseForm";


const GetPurchasers = (props: PurchaseFormChildProps): ReactElement => {

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
                        How many purchasers are there?
                    </h6>
                </div>

                <div className='col col-7 mb-3'>
                    <select className='form-select p-3' aria-label='Purchasers'
                        value={props.purchaseInfo.clientsInfo.length}
                        disabled={props.purchaseInfo.forCompany}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            if (e && e.target && e.target.value) {

                                const num = parseInt(e.target.value);
                                const temp = [...props.purchaseInfo.clientsInfo];

                                if (num > temp.length - 1) {
                                    while (num > temp.length) {
                                        temp.push(new ClientInfo());
                                    }
                                } else {
                                    while (num < temp.length) {
                                        temp.pop();
                                    }
                                }
                                props.setPurchaseInfo({ ...props.purchaseInfo, clientsInfo: temp });
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
                        <input type='checkbox' id='iscompany' checked={props.purchaseInfo.forCompany}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                props.setPurchaseInfo({ ...props.purchaseInfo, forCompany: e.target.checked });
                            }} />
                        <label htmlFor='iscompany' className='ps-2'>
                            This is for a company
                        </label>
                    </div>
                </div>
            </div>

            {
                props.purchaseInfo.forCompany &&
                <>
                    <div className='row'>
                        <div className='col mb-1 mt-4'>
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
                                    value={props.purchaseInfo.companyName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, companyName: e.target.value });
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
                                    value={props.purchaseInfo.incorporationNumber}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        props.setPurchaseInfo({ ...props.purchaseInfo, incorporationNumber: e.target.value });
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
                props.purchaseInfo.clientsInfo.length > 0 &&
                <>
                    {
                        props.purchaseInfo.clientsInfo.map((c, i) => {
                            return (
                                <Client text={props.purchaseInfo.forCompany ? 'Signatory' : 'Purchaser'}
                                    num={i}
                                    key={c.id}
                                    clientInfo={props.purchaseInfo.clientsInfo[i]}
                                    client1Info={props.purchaseInfo.clientsInfo.length > 1 ? props.purchaseInfo.clientsInfo[0] : null}
                                    company={props.purchaseInfo.forCompany}
                                    updated={(c: ClientInfo, idx: number) => {
                                        const tempClients: ClientInfo[] = [];
                                        for (let t = 0; t < props.purchaseInfo.clientsInfo.length; t++) {
                                            if (t === idx) {
                                                tempClients.push(c);
                                            }
                                            else {
                                                tempClients.push(props.purchaseInfo.clientsInfo[t]);
                                            }
                                        }
                                        props.setPurchaseInfo({ ...props.purchaseInfo, clientsInfo: tempClients });
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