import { ReactElement, useEffect, useState } from "react";
import { FormProps } from "../Helpers";

declare var bootstrap: any;

const IntroForm = (props: FormProps): ReactElement => {

    const [navigating, setNavigating] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line
        if (!document.querySelector('.modal-backdrop')) {
            new bootstrap.Modal('#formModal').show();

            const modal = document.querySelector('#formModal');
            if (modal) {
                modal.addEventListener('hidden.bs.modal', () => {
                    props.dismissed();
                });
            }
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className='modal fade' id='formModal' tabIndex={-1} aria-labelledby='formModalLabel' aria-hidden='true'
            data-bs-backdrop='static' data-bs-keyboard='false'>
            <div className={`modal-dialog modal-lg modal-fullscreen-sm-down modal-near-top modal-dialog-scrollable`}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className="modal-title">Start A New Real Estate File</h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>
                    <div className="modal-body">

                        <div className='row'>
                            <div className='col-auto p-3 ps-5' style={{
                                display: navigating ? 'none' : '',
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        height: '48px',
                                        width: '48px',
                                        fill: '#0d6efd',
                                    }}

                                    className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                                </svg>

                            </div>

                            <div className='col' style={{
                                display: navigating ? 'none' : '',
                            }}>
                                <p>At this time the online file application is for <b>residential conveyancing</b> only.</p>
                                <p>Please contact our office directly at <a href="tel:1-604-939-8321">604 939 8321</a>
                                    for all other matters and we will gladly assist you.</p>

                            </div>

                            <div className='col' style={{
                                display: navigating ? '' : 'none',
                            }}>
                                <p className='text-center'>Please wait....</p>

                            </div>

                        </div>


                    </div>
                    <div className="modal-footer">
                        <div style={{
                            visibility: navigating ? 'hidden' : 'visible',
                        }}>
                            <button type="button" className="btn btn-secondary me-4" data-dismiss="modal"
                                onClick={() => {
                                    setNavigating(true);
                                    setTimeout(() => {
                                        window.location.href = 'https://dbmlaw.ca';
                                    }, 250);
                                }}>
                                Go back to DBM homepage
                            </button>
                            <input
                                type='button' value='Continue with creating file' className='btn btn-primary form-button'
                                data-bs-dismiss='modal' aria-label='Continue with creating file'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default IntroForm;