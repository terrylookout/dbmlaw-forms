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

export const getCountries = (lang = 'en') => {
    const A = 65
    const Z = 90
    const countryName = new Intl.DisplayNames([lang], { type: 'region' });
    const countries: string[] = [];
    for (let i = A; i <= Z; ++i) {
        for (let j = A; j <= Z; ++j) {
            let code = String.fromCharCode(i) + String.fromCharCode(j)
            let name = countryName.of(code)
            if (code !== name && name && (name !== 'Canada' && name !== 'United States') &&
                countries.indexOf(name) === -1) {
                countries.push(name.toString());
            }
        }
    }
    countries.sort();
    countries.splice(0, 0, 'United States');
    countries.splice(0, 0, 'Canada');
    return countries;
};

export const getStates = (): string[] => {
    return ['State or Territory', 'Not applicable', 'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii',
        'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota',
        'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
}

export const getProvincesTerritories = (): string[] => {
    return [
        'Province or Territory',
        'Not applicable',
        'Alberta',
        'British Columbia',
        'Manitoba',
        'New Brunswick',
        'Newfoundland and Labrador',
        'Northwest Territories',
        'Nova Scotia',
        'Nunavut',
        'Ontario',
        'Prince Edward Island',
        'Quebec',
        'Saskatchewan',
        'Yukon',
    ];
}

