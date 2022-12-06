import { ReactElement } from "react";


interface ModalBottomButtonsProps {
    visibility?: 'VISIBLE' | 'HIDDEN'
    showError?: boolean;
    leftButtonText?: string;
    rightButtonText?: string;
    rightButtonDisabled?: boolean;
    leftButtonClicked?: () => void;
    rightButtonClicked?: () => void;
}

const ModalBottomButtons = (props: ModalBottomButtonsProps): ReactElement => {

    return (
        <div className='row gy-3' style={{
            visibility: props.visibility && props.visibility === 'HIDDEN' ? 'hidden' : 'visible',
        }}>

            <div className="col text-danger fw-semibold error-label">
                <h6 style={{
                    visibility: props.showError !== undefined && props.showError ? 'visible' : 'hidden',
                }}>
                    Please fill in all required information
                </h6>
            </div>

            <div className="col text-end">

                <input style={{
                    display: props.leftButtonText ? '' : 'none',
                }}
                    type='button' className="btn btn-secondary form-button"
                    value={props.leftButtonText ? props.leftButtonText : ''}
                    onClick={() => {
                        props.leftButtonClicked ? props.leftButtonClicked() : void (0);
                    }} />
            </div>

            <div className="col text-end">

                <input style={{
                    display: props.rightButtonText ? '' : 'none',
                }}
                    type='button' className={`btn ${props.rightButtonDisabled !== undefined && props.rightButtonDisabled ? 'dbm-button-disabled' : 'btn-primary'} form-button`}
                    value={props.rightButtonText ? props.rightButtonText : ''}
                    onClick={() => {

                        ((props.rightButtonDisabled !== undefined && !props.rightButtonDisabled) || props.rightButtonDisabled === undefined) &&
                            props.rightButtonClicked
                            ? props.rightButtonClicked() : void (0);

                    }} />
            </div>

        </div>
    )

}

export default ModalBottomButtons;