import { ReactElement } from "react";
import ReCaptcha from "./ReCaptcha";


export const SubmitConfirm = (props: {
    text: string;
    submitOk: (e: boolean) => void;
}): ReactElement => {

    return (
        <>
            <p>
                {props.text}
            </p>

            <ReCaptcha
                changed={(e) => props.submitOk(e)}
            />
        </>
    );
}

export const Submitting = (): ReactElement => {

    return (

        <p>
            Submitting...
        </p>

    );
}

export const SubmitDone = (): ReactElement => {

    return (
        <>
            <h6>
                <p>
                    Done!
                </p>
            </h6>

            <p>
                You will be contacted by Drysdale Bacon McStravick soon!
            </p>
            <p>
                Please ensure that you notify the Realty Sales Office and your Mortgage Broker that you have hired
                Drysdale Bacon McStravick LLP to assist you in this transaction.
            </p>
            <p>
                <span style={{
                    fontWeight: '600',
                    fontStyle: 'italic'
                }}>
                    For New Builds&nbsp;
                </span>
                <span style={{
                    fontWeight: '600',
                }}>
                    PLEASE FORWARD A COPY OF YOUR CONTRACT TO OUR OFFICE VIA
                    EMAIL (<a href={`mailto:convey@dbmlaw.ca`}>convey@dbmlaw</a>) OR FAX 604-939-8340
                </span>

            </p>
            <p>
                Please make sure your Mortgage Broker is aware that Mortgage instructions are due from your Lender at least three business
                days prior to your appointment to avoid any rush charges and/or delays with your Closing.
            </p>

            <p>
                If you have any questions or concerns, please feel free to call&nbsp;
                <a href="tel:1-604-939-8321">604 939 8321</a>
            </p>

            <p>
                We look forward to working with you and congratulations on your upcoming transaction!
            </p>
        </>
    )
}

export const SubmitError = (props: {
    onClick: () => void,
}): ReactElement => {

    return (
        <>
            <h6>
                <p>
                    Oops!
                </p>
            </h6>

            <p>
                There was an error submitting your information.
            </p>
            <p>
                Please click the 'Retry' button to re-submit.
            </p>

            <p>
                <input type='button' className='btn btn-primary' value='Retry' onClick={props.onClick} />
            </p>

            <p>
                If you have any questions or concerns, please feel free to call&nbsp;
                <a href="tel:1-604-939-8321">604 939 8321</a>
            </p>
        </>
    )
}