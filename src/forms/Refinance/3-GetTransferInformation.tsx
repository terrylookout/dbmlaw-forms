import { ChangeEvent } from "react";
import CircleBullet from "../../controls/CircleBullet";
import { RefinanceProps } from ".";
import TransferAdded from "../../controls/TransferAdded";
import { ClientInfo } from "../../ClassesInterfaces";


const GetTransferInformation = ({
    numberOfOwners,
    setNumberOfOwners,
    refinanceInfo,
    setRefinanceInfo,
    numberOfAdded,
    setNumberOfAdded,
}: RefinanceProps) => {
    return (
        <>
            <div className="row">
                <div className="col mb-1 mt-2 top-second-page">
                    &nbsp;
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <h6>
                        Title changes
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-1 mt-4">
                    <h6>
                        <CircleBullet />
                        Is anyone going to be removed from the title?
                    </h6>
                </div>
            </div>

            <div className="row">
                <div className="col mb-3">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`removeowners`} id={`removeowners-yes`}
                            checked={refinanceInfo.ownersToBeRemoved === 'YES'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setRefinanceInfo({ ...refinanceInfo, ownersToBeRemoved: 'YES' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor={`removeowners-yes`}>
                            Yes
                        </label>
                    </div>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name={`removeowners`} id={`removeowners-no`}
                            checked={refinanceInfo.ownersToBeRemoved === 'NO'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                if (e && e.target && e.target.value && e.target.value === 'on') {
                                    setRefinanceInfo({ ...refinanceInfo, ownersToBeRemoved: 'NO' });
                                }
                            }} />
                        <label className="form-check-label" htmlFor={`removeowners-no`}>
                            No
                        </label>
                    </div>
                </div>
            </div>

            {
                refinanceInfo.ownersToBeRemoved === 'YES' &&
                <>
                    <div className="row">
                        <div className="col mb-1 mt-4">
                            <h6>
                                <CircleBullet />
                                Place a checkmark beside the owner{refinanceInfo.clientsInfo.length !== 1 ? 's' : ''} you want to remove from title
                            </h6>
                        </div>
                    </div>

                    {
                        refinanceInfo.clientsInfo.map((owner) => {
                            return (
                                <div className='row mb-1' key={owner.id}>

                                    <div className='col col-1' style={{
                                        whiteSpace: 'nowrap',
                                    }}>
                                        <span>
                                            <input type='checkbox' className='btn btn-secondary'
                                                id={`removecheck${owner.id}`}
                                                value='Remove from title'
                                                checked={refinanceInfo.removedFromTitle.indexOf(owner.fullLegalName) > -1}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                                                    let temp = refinanceInfo.removedFromTitle;
                                                    if (e.target.checked) {
                                                        temp.push(owner.fullLegalName);
                                                    } else {
                                                        temp = temp.filter((s) => s !== owner.fullLegalName);
                                                    }
                                                    setRefinanceInfo({ ...refinanceInfo, removedFromTitle: temp });
                                                }

                                                }
                                            />
                                        </span>
                                    </div>

                                    <div className='col'>
                                        <span style={{
                                            textDecoration: refinanceInfo.removedFromTitle.indexOf(owner.fullLegalName) > -1 ? 'line-through' : '',
                                        }}>
                                            {owner.fullLegalName}
                                        </span>
                                    </div>

                                    <div className='col'>
                                        <span>
                                            {

                                            }
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }

                </>
            }

            {
                (refinanceInfo.ownersToBeRemoved !== '' || refinanceInfo.ownersToBeAdded !== '') &&
                <>

                    <div className='row align-items-center mt-5'>
                        <div className="col mb-3">
                            <h6>
                                <CircleBullet />
                                Will anyone be ADDED to title? If so, please specify the number of people here
                            </h6>
                        </div>

                        <div className="col col-6 mb-3">
                            <select className="form-select p-3" aria-label="Added"
                                value={numberOfAdded}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    if (e && e.target && e.target.value) {
                                        setNumberOfAdded(parseInt(e.target.value));
                                    }
                                }}>
                                <option value='0'>None</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>

                        </div>
                    </div>
                </>
            }


            {
                numberOfAdded > 0 &&
                <>
                    {
                        refinanceInfo.clientsAddedInfo.map((c, i) => {
                            return (
                                <TransferAdded text={refinanceInfo.forCompany ? 'Signatory' : 'Added Owner'}
                                    num={i}
                                    key={c.id}
                                    refinanceInfo={refinanceInfo}
                                    updated={(c: ClientInfo, idx: number) => {
                                        const tempClients: ClientInfo[] = [];
                                        for (let t = 0; t < refinanceInfo.clientsAddedInfo.length; t++) {
                                            if (t === idx) {
                                                tempClients.push(c);
                                            }
                                            else {
                                                tempClients.push(refinanceInfo.clientsAddedInfo[t]);
                                            }
                                        }
                                        setRefinanceInfo({ ...refinanceInfo, clientsAddedInfo: tempClients });
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

export default GetTransferInformation;