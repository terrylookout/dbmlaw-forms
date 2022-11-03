import { StringLiteral } from "typescript";

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

    public isFirstTimeHomeBuyer: 'YES' | 'NO' | 'NA';
    public hasBeenBCResidentForAYear: 'YES' | 'NO' | 'NA';
    public willBeLivingInPropertyWithinThreeMonths: 'YES' | 'NO' | 'NA';
    public hasOwnedPrincipalResidenceSomewhere: 'YES' | 'NO' | 'NA';

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

        this.isFirstTimeHomeBuyer = 'NA';
        this.hasBeenBCResidentForAYear = 'NA';
        this.willBeLivingInPropertyWithinThreeMonths = 'NA';
        this.hasOwnedPrincipalResidenceSomewhere = 'NA';

        this.citizenShip = 'NONE';
    }

}

export class PurchaseInfo {

    public clientInfo: ClientInfo[];

    public completionDate: Date;
    public purchasePrice: number;

    public street1: string;
    public street2: string;
    public city: string;
    public provinceTerritory: string;
    public postalCode: string;

    public joinType: 'JOINT_TENANTS' | 'TENANTS_IN_COMMON' | 'NA';

    public buildingNewUsed: 'NEW' | 'USED' | 'NA';

    public realtorName: string;
    public realtorPhone: string;

    public lenderName: string;
    public strataName: string;

    public brokerBankerName: string;
    public brokerBankerPhone: string;

    public parkingStallNumbers: string;
    public storageLockerNumbers: string;

    public insuranceAgentName: string;
    public insuranceAgentPhone: string;

    public portionPropertyRentedOut: 'YES' | 'NO' | 'NA';;

    public fundsSource: string;
    public fundsChequingSavingsSource: string;

    public nonPurchaserName: string;
    public nonPurchaserPhone: string;

    public apptLocationPreference: 'VANCOUVER' | 'COQUITLAM' | 'LANGLEY';

    constructor() {

        this.clientInfo = [];

        this.completionDate = new Date();
        this.purchasePrice = 0;

        this.street1 = '';
        this.street2 = '';
        this.city = '';
        this.provinceTerritory = '';
        this.postalCode = '';

        this.buildingNewUsed = 'NA';

        this.joinType = 'NA';

        this.realtorName = '';
        this.realtorPhone = '';

        this.lenderName = '';

        this.strataName = '';

        this.brokerBankerName = '';
        this.brokerBankerPhone = '';

        this.parkingStallNumbers = '';
        this.storageLockerNumbers = '';

        this.insuranceAgentName = '';
        this.insuranceAgentPhone = '';

        this.portionPropertyRentedOut = 'NA';

        this.fundsSource = '';
        this.fundsChequingSavingsSource = '';

        this.nonPurchaserInfo = new ClientInfo();

        this.apptLocationPreference = 'COQUITLAM';
    }



}

