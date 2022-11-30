import { ReactElement } from "react";


export const SubmitConfirm = (props: {
    text: string;
}): ReactElement => {

    return (

        <p>
            {props.text}
        </p>

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
                Please advise the sales office and your mortgage broker that you have hired Drysdale Bacon McStravick LLP to assist you in this transaction.
            </p>
            <p>
                <span style={{
                    fontWeight: '600',
                }}>
                    PLEASE FORWARD A COPY OF YOUR CONTRACT TO OUR OFFICE VIA
                    EMAIL (<a href={`mailto:convey@dbmlaw.ca`}>convey@dbmlaw</a>) OR FAX 604-939-8340
                </span>

            </p>
            <p>
                Make sure your broker knows that if we receive mortgage instructions less
                than 3 business days before your appointment there will be an additional
                charge for rush service. While we will try to contact the broker on your behalf,
                it is the responsibility of the broker to ensure that instructions are received by our
                offices on time in order to avoid rush charges from our offices.
            </p>

            <p>
                If you have any questions or concerns, please feel free to call&nbsp;
                <a href="tel:1-604-939-8321">604 939 8321</a>
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