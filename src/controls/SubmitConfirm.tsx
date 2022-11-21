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
                If you have any questions or concerns, please feel free to call&nbsp;
                <a href="tel:1-604-939-8321">604 939 8321</a>
            </p>
        </>
    )
}