import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

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

export const sendEmail = async (formTitle: string, messageBody: string): Promise<number> => {

    let newMessageBody = messageBody;

    try {

        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();

        if (data) {
            newMessageBody += `<table><tr><td>IP ADDRESS:</td><td>${data.ip}</td></tr></table>`;
        }

    }
    catch (err) {
        console.log(38, err);
    }
    finally {
        newMessageBody += '</html>'
    }

    const sendResult: EmailJSResponseStatus = await emailjs.send(
        'service_keeosye',
        'template_coruqjt', {
        formtitle: formTitle,
        message: newMessageBody,
    }, 'QrfLKkXmnG6mF2P_1',
    );

    console.log(formTitle, sendResult);
    return Promise.resolve(sendResult.status);

    // console.log(newMessageBody);
    // return Promise.resolve(200);
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

export const checkInputs = (): boolean => {
    let okToGo = true;
    const inputs = document.querySelectorAll('.is-required');
    if (inputs) {
        inputs.forEach((input) => {
            if (!(input as HTMLInputElement).disabled) {
                if (!(input as HTMLInputElement).value) {
                    (input as HTMLInputElement).classList.add('is-invalid');
                    okToGo = false;
                }
                else if ((input as HTMLSelectElement).selectedIndex < 1 && (input as HTMLSelectElement).options.length > 1) {
                    (input as HTMLSelectElement).classList.add('is-invalid');
                    okToGo = false;
                }
                else {
                    (input as HTMLInputElement).classList.remove('is-invalid');
                }

            }
        })
    }

    const radioGroups = document.querySelectorAll('.rdo-group-dbm');

    if (radioGroups) {
        for (let a = 0; a < radioGroups.length; a++) {
            const group = radioGroups[a] as HTMLElement;
            let value = false;

            const radios = group.querySelectorAll(`[type='radio']`);

            for (let b = 0; b < radios.length; b++) {
                const radio = radios[b] as HTMLInputElement;

                if (radio.checked) {
                    value = true;
                }
            }
            if (!value) {
                group.style.border = '1px red solid';
                group.style.paddingTop = '15px';
                const errorDiv = document.querySelector(`.rdo-error-${group.getAttribute('data-groupname')}`);
                if (errorDiv) {
                    (errorDiv as HTMLElement).style.display = '';
                }
                okToGo = false;
            }
        }
    }

    const tenantsInCommonPerc = document.querySelectorAll('.tenantscommonpercentage');
    if (tenantsInCommonPerc && tenantsInCommonPerc.length > 0) {
        let total = 0;
        for (let i = 0; i < tenantsInCommonPerc.length; i++) {
            total += parseFloat((tenantsInCommonPerc[i] as HTMLInputElement).value);
        }
        if (total !== 100 && total !== 0) {
            (document.querySelector('.tenantscommonerror') as HTMLElement).style.display = '';
            okToGo = false;
        }
    }

    return okToGo;
}

