export class ClientInfo {

    public fullLegalName: string;
    public phoneNumber: string;

    public emailAddress: string;
    public dateOfBirth: Date;
    public socialInsNumber: string;
    public sinViaPhone: boolean;

    public mailingStreet1: string;
    public mailingStreet2: string;
    public mailingCity: string;
    public mailingProvinceTerritory: string;
    public mailingPostalCode: string;

    public occupation: string;
    public employerName: string;
    public employerPhone: string;
    public employerStreet1: string;
    public employerStreet2: string;
    public employerCity: string;
    public employerProvinceTerritory: string;
    public employerPostalCode: string;

    public citizenShip: 'NONE' | 'CANADIAN_CITIZEN' | 'PERMANENT_RESIDENT' | 'BC_PROV_NOMINEE';

    constructor() {
        this.fullLegalName = '';
        this.phoneNumber = '';

        this.emailAddress = '';
        this.dateOfBirth = new Date();
        this.socialInsNumber = '';
        this.sinViaPhone = false;

        this.mailingStreet1 = '';
        this.mailingStreet2 = '';
        this.mailingCity = '';
        this.mailingProvinceTerritory = '';
        this.mailingPostalCode = '';

        this.occupation = '';
        this.employerName = '';
        this.employerPhone = '';
        this.employerStreet1 = '';
        this.employerStreet2 = '';
        this.employerCity = '';
        this.employerProvinceTerritory = '';
        this.employerPostalCode = '';

        this.citizenShip = 'NONE';
    }

}

