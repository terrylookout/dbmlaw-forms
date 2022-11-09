import emailjs from 'emailjs-com';

export interface FormProps {
    dismissed: () => void;
}

export const stripTags = (dirty: string): string => {
    return dirty.replace(/(<([^>]+)>)/gi, "");
};

export const getEntry = (title: string, entryText: string, addSpace?: boolean): string => {
    return (
        `<tr><td>${stripTags(title)}${title.trim() !== '' ? ':' : ''}</td><td>${stripTags(entryText)}</td></tr>${addSpace ? `<tr><td>&nbsp;</td><td>&nbsp;</td></tr>` : ''}`
    );
}

export const getHeader = (headerText: string): string => {
    return (
        `<tr><td colspan='2'>${stripTags(headerText)}</td></tr>`
    );
}

export const sendEmail = async (formTitle: string, messageBody: string): Promise<void> => {
    const sendResult = await emailjs.send(
        'service_keeosye',
        'template_coruqjt', {
        formtitle: formTitle,
        message: messageBody,
    }, 'QrfLKkXmnG6mF2P_1',
    );

    console.log('sendResult', sendResult);
}


