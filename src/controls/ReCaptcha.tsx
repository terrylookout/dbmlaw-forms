import { ReactElement, useEffect } from "react";

declare global {
    interface Window {
        checkPassed: (e: unknown) => void;
        checkExpired: (e: unknown) => void;
    }
}

const ReCaptcha = (props: {
    changed: (e: boolean) => void,
}): ReactElement => {

    const checkPassed = (e: unknown) => {
        props.changed(true);
    };

    const checkExpired = (e: unknown) => {
        props.changed(false);
    };

    useEffect(() => {
        window.checkPassed = checkPassed;
        window.checkExpired = checkExpired;
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        document.body.appendChild(script);

    }, []);

    return (
        <div
            className="g-recaptcha"
            data-sitekey="6LeTUFojAAAAAFsSWlZp9n1nx7gbrkElxTg7hKGr"
            data-callback="checkPassed"
            data-expired-callback="checkExpired"
        >

        </div>
    );
};

export default ReCaptcha;

