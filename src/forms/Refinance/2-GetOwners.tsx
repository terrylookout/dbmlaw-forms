import { ChangeEvent } from "react";
import { RefinanceProps } from ".";
import Owner from "../../controls/Owner";
import { ClientInfo } from "../../ClassesInterfaces";


const GetOwners = ({
    numberOfOwners,
    setNumberOfOwners,
    refinanceInfo,
    setRefinanceInfo
}: RefinanceProps) => {
    return (
        <>
            <div className="row">
                <div className="col mb-3 top-second-page">
                    <h6>
                        Owners
                    </h6>
                </div>
            </div>

            <div className="row align-items-center">
                <div className="col mb-3">
                    <h6>
                        How many people on title?
                    </h6>
                </div>

                <div className="col col-7 mb-3">
                    <select className="form-select p-3" aria-label="Sellers"
                        value={numberOfOwners}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            if (e && e.target && e.target.value) {
                                setNumberOfOwners(parseInt(e.target.value));
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

                </div>
            </div>

            {
                refinanceInfo.forCompany &&
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
                                <input type='text' className='form-control' id='companynameseller' placeholder='Company name'
                                    value={refinanceInfo.companyName}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setRefinanceInfo({ ...refinanceInfo, companyName: e.target.value });
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
                                    value={refinanceInfo.incorporationNumber}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setRefinanceInfo({ ...refinanceInfo, incorporationNumber: e.target.value });
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
                numberOfOwners > 0 &&
                <>
                    {
                        refinanceInfo.clientsInfo.map((c, i) => {
                            return (
                                <Owner text={refinanceInfo.forCompany ? 'Signatory' : 'Owner'}
                                    num={i}
                                    key={c.id}
                                    clientInfo={refinanceInfo.clientsInfo[i]}
                                    client1Info={refinanceInfo.clientsInfo.length > 1 ? refinanceInfo.clientsInfo[0] : null}
                                    company={refinanceInfo.forCompany}
                                    updated={(c: ClientInfo, idx: number) => {
                                        const tempClients: ClientInfo[] = [];
                                        for (let t = 0; t < refinanceInfo.clientsInfo.length; t++) {
                                            if (t === idx) {
                                                tempClients.push(c);
                                            }
                                            else {
                                                tempClients.push(refinanceInfo.clientsInfo[t]);
                                            }
                                        }
                                        setRefinanceInfo({ ...refinanceInfo, clientsInfo: tempClients });
                                    }}
                                />
                            );
                        })
                    }

                </>
            }
        </>);
};

export default GetOwners;