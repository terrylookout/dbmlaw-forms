
export class ClientInfo {

    public fullLegalName: string;
    public phoneNumber: string;

    public emailAddress: string;
    public dateOfBirth: Date;
    public socialInsNumber: string;
    public sinViaPhone: boolean;

    public addressSameAsProperty: 'YES' | 'NO' | '';

    public mailingStreet1: string;
    public mailingStreet2: string;
    public mailingCity: string;
    public mailingProvinceTerritory: string;
    public mailingPostalCode: string;

    public mailingCountry: string;

    public employment: 'EMPLOYED' | 'RETIRED' | 'STUDENT' | 'OTHER' | 'TBF';
    public occupation: string;
    public employerName: string;
    public employerPhone: string;
    public employerStreet1: string;
    public employerStreet2: string;
    public employerCity: string;
    public employerProvinceTerritory: string;
    public employerPostalCode: string;
    public employerCountry: string;

    public isFirstTimeHomeBuyer: 'YES' | 'NO' | '';
    public hasBeenBCResidentForAYear: 'YES' | 'NO' | '';
    public willBeLivingInPropertyWithinThreeMonths: 'YES' | 'NO' | '';
    public hasOwnedPrincipalResidenceSomewhere: 'YES' | 'NO' | '';
    public residentOfCanada: 'YES' | 'NO' | '';

    public relationship: string;
    public timeLivingAtProperty: string;

    public citizenShip: '' | 'CANADIAN_CITIZEN' | 'PERMANENT_RESIDENT' | 'BC_PROV_NOMINEE' | 'RESIDENT_OTHER_COUNTRY';

    constructor() {
        this.fullLegalName = '';
        this.phoneNumber = '';

        this.emailAddress = '';
        this.dateOfBirth = new Date();
        this.socialInsNumber = '';
        this.sinViaPhone = false;
        this.addressSameAsProperty = '';

        this.relationship = '';

        this.mailingStreet1 = '';
        this.mailingStreet2 = '';
        this.mailingCity = '';
        this.mailingProvinceTerritory = '';
        this.mailingPostalCode = '';

        this.mailingCountry = 'Canada';

        // to be filled
        this.employment = 'TBF';

        this.occupation = '';
        this.employerName = '';
        this.employerPhone = '';
        this.employerStreet1 = '';
        this.employerStreet2 = '';
        this.employerCity = '';
        this.employerProvinceTerritory = '';
        this.employerPostalCode = '';
        this.employerCountry = 'Canada';

        this.isFirstTimeHomeBuyer = '';
        this.hasBeenBCResidentForAYear = '';
        this.willBeLivingInPropertyWithinThreeMonths = '';
        this.hasOwnedPrincipalResidenceSomewhere = '';
        this.residentOfCanada = '';

        this.timeLivingAtProperty = '';

        this.citizenShip = 'CANADIAN_CITIZEN';
    }

}

export class GuarantorInfo {
    public fullLegalName: string;
    public phoneNumber: string;
    public emailAddress: string;
    public relationship;

    constructor() {
        this.fullLegalName = '';
        this.phoneNumber = '';
        this.emailAddress = '';
        this.relationship = '';
    }
}

export class SaleInfo {
    public clientsInfo: ClientInfo[];

    public forCompany: boolean;
    public companyName: string;
    public incorporationNumber: string;

    public closingDate: Date;
    public closingDateTBD: boolean;

    public sellingPrice: string;

    public street1: string;
    public street2: string;
    public city: string;
    public provinceTerritory: string;
    public postalCode: string;

    public mortgageOrLoCOnTitle: 'YES' | 'NO' | '';
    public mortgageOrLoCOnTitleReferenceNumber: string;
    public mortgageOrLoCOnTitleBankBranch: string;

    public realtorName: string;
    public realtorPhone: string;

    public involvesSeparationDivorce: 'YES' | 'NO' | '';

    public paidPropertyTaxesOrClaimedHownOwnersGrant: 'YES' | 'NO' | '';

    public emptyHomesDeclaration: 'OCCUPIED' | 'VACANT' | 'NOT_APPLICABLE' | 'NOT_COMPLETED' | '';

    public additionalComments: string;

    constructor() {

        this.clientsInfo = [];

        this.forCompany = false;
        this.companyName = '';
        this.incorporationNumber = '';

        this.sellingPrice = '';

        this.closingDate = new Date();
        this.closingDateTBD = false;

        this.street1 = '';
        this.street2 = '';
        this.city = '';
        this.provinceTerritory = '';
        this.postalCode = '';

        this.mortgageOrLoCOnTitle = '';
        this.mortgageOrLoCOnTitleReferenceNumber = '';
        this.mortgageOrLoCOnTitleBankBranch = '';

        this.realtorName = '';
        this.realtorPhone = '';

        this.involvesSeparationDivorce = '';

        this.paidPropertyTaxesOrClaimedHownOwnersGrant = '';

        this.emptyHomesDeclaration = '';

        this.additionalComments = '';
    }
}

export class RefinanceInfo {
    public clientsInfo: ClientInfo[];
    public clientsAddedInfo: ClientInfo[];
    public guarantorsInfo: GuarantorInfo[];

    public ownersToBeRemoved: 'YES' | 'NO' | '';
    public ownersToBeAdded: 'YES' | 'NO' | '';

    public removedFromTitle: string[];

    public joinType: 'JOINT_TENANTS' | 'TENANTS_IN_COMMON' | '';

    public forCompany: boolean;
    public companyName: string;
    public incorporationNumber: string;

    public street1: string;
    public street2: string;
    public city: string;
    public provinceTerritory: string;
    public postalCode: string;

    public mortgageLenderName: string;

    public mortgageOrLoCOnTitle: 'YES' | 'NO' | '';
    public mortgageOrLoCOnTitleReferenceNumber: string;
    public mortgageOrLoCOnTitleBankBranch: string;

    public mortgageLenderRequiresOtherDebtsPaid: 'YES' | 'NO' | '';
    public mortgageLenderRequiresOtherDebtsPaidDetails: string;

    public strataName: string;

    public involvesSeparationDivorce: 'YES' | 'NO' | '';

    public paidPropertyTaxesOrClaimedHownOwnersGrant: 'YES' | 'NO' | '';

    public emptyHomesDeclaration: 'OCCUPIED' | 'VACANT' | 'NOT_APPLICABLE' | 'NOT_COMPLETED' | '';

    public insuranceAgentName: string;
    public insuranceAgentPhone: string;

    public additionalComments: string;

    constructor() {

        this.clientsInfo = [];
        this.clientsAddedInfo = [];
        this.guarantorsInfo = [];

        this.ownersToBeAdded = '';
        this.ownersToBeRemoved = '';

        this.removedFromTitle = [];
        this.joinType = '';

        this.forCompany = false;
        this.companyName = '';
        this.incorporationNumber = '';

        this.mortgageLenderName = '';

        this.insuranceAgentName = '';
        this.insuranceAgentPhone = '';

        this.street1 = '';
        this.street2 = '';
        this.city = '';
        this.provinceTerritory = '';
        this.postalCode = '';

        this.mortgageOrLoCOnTitle = '';
        this.mortgageOrLoCOnTitleReferenceNumber = '';
        this.mortgageOrLoCOnTitleBankBranch = '';

        this.mortgageLenderRequiresOtherDebtsPaid = '';
        this.mortgageLenderRequiresOtherDebtsPaidDetails = '';

        this.strataName = '';

        this.involvesSeparationDivorce = '';

        this.paidPropertyTaxesOrClaimedHownOwnersGrant = '';

        this.emptyHomesDeclaration = '';

        this.additionalComments = '';
    }
}

export class PurchaseInfo {

    public clientsInfo: ClientInfo[];
    public guarantorsInfo: GuarantorInfo[];

    public forCompany: boolean;
    public companyName: string;
    public incorporationNumber: string;

    public completionDate: Date;
    public completionDateTBD: boolean;
    public purchasePrice: string;
    public depositPaid: string = '';

    public upgradesOrExtras: 'YES' | 'NO' | '' = '';

    public relativeLivingInstead: 'YES' | 'NO' | '' = '';
    public relativeLivingInsteadName: string = '';
    public relativeLivingInsteadRelationship: string = '';

    public buyingThroughAssignment: 'YES' | 'NO' | '' = '';
    public assignorGeneratingProfit: 'YES' | 'NO' | 'UNKNOWN' | '' = '';
    public moneysDisbursed: 'REALTORS' | 'LAWYERS' | 'UNKNOWN' | '' = '';
    public lawyerForAssignor: string = '';
    public assignorResidentCanada: 'YES' | 'NO' | 'UNKNOWN' | '' = '';


    public unitNumber: string;
    public strataLot: string;
    public street1: string;
    public street2: string;
    public city: string;
    public provinceTerritory: string;
    public postalCode: string;

    public joinType: 'JOINT_TENANTS' | 'TENANTS_IN_COMMON' | '';

    public buildingNewUsed: 'NEW' | 'USED' | '';

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

    public portionPropertyRentedOut: 'YES' | 'NO' | '';;

    public fundsSource: 'SAVINGS_ACCOUNT' | 'CHEQUING_ACCOUNT' | 'HELOC' | 'ANOTHER_INDIVIDUAL' | 'OTHER' | '';
    public fundsChequingSavingsSource: string;

    public nonPurchaserName: string;
    public nonPurchaserPhone: string;
    public nonPurchaserStreet1: string;
    public nonPurchaserStreet2: string;
    public nonPurchaserCity: string;
    public nonPurchaserProvinceTerritory: string;
    public nonPurchaserPostalCode: string;
    public nonPurchaserOccupation: string;
    public nonPurchaserRelationship: string;

    public apptLocationPreference: 'VANCOUVER' | 'COQUITLAM' | 'LANGLEY';

    public additionalComments: string;

    constructor() {

        this.clientsInfo = [];
        this.guarantorsInfo = [];

        this.forCompany = false;
        this.companyName = '';
        this.incorporationNumber = '';

        this.completionDate = new Date();
        this.completionDateTBD = false;
        this.purchasePrice = '';

        this.unitNumber = '';
        this.strataLot = '';
        this.street1 = '';
        this.street2 = '';
        this.city = '';
        this.provinceTerritory = 'British Columbia';
        this.postalCode = '';

        this.buildingNewUsed = '';

        this.joinType = '';

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

        this.portionPropertyRentedOut = '';

        this.fundsSource = '';
        this.fundsChequingSavingsSource = '';

        this.nonPurchaserName = '';
        this.nonPurchaserPhone = '';
        this.nonPurchaserStreet1 = '';
        this.nonPurchaserStreet2 = '';
        this.nonPurchaserCity = '';
        this.nonPurchaserProvinceTerritory = '';
        this.nonPurchaserPostalCode = '';
        this.nonPurchaserOccupation = '';
        this.nonPurchaserRelationship = '';

        this.apptLocationPreference = 'COQUITLAM';

        this.additionalComments = '';
    }

}

