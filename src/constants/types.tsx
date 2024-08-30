import { ImageURISource } from "react-native";

export type ILogin = {
    email: string | undefined;
    password: string | undefined;
};

export type RealEstateItemData = {
    status: "ongoing" | "waiting" | "finished";
    type: string;
    name: string;
    location: string;
    totalTokens: number;
    boughtTokens: number;
    price: number;
    image: ImageURISource;
    investors: number;
};
//The Graph
export interface TokenValuation {
    valuation: string;
}

export interface TokenInfo {
    isSTOs: string;
    isManagement: string;
    id: string;
    isValuation: string;
    fundTokenInfoAddress: string;
    tokenId: string;
    tokenName: string;
    tokenSymbol: string;
    tokenValuations: TokenValuation[];
}

export interface TokenInfosData {
    tokenInfos: TokenInfo[];
}

export type MarketPlaceItemData = {
    image: ImageURISource;
    name: string;
    type: string;
    totalTokens: number;
    revenuePercents: number;
    totalTradingValue: number;
    averageTradePerWeek: number;
    owners: number;
    location: string;
};

export interface STOInfo {
    id: string;
    securityTokenAddress: string;
    securityTokenType: string;
    stage: string;
    startAt: string;
    state: string;
    supplyTotal: string;
    purchasedCount: string;
    purchasedAmount: string;
    ipfsRecordLink: string;
    endAt: string;
    currentSupply: string;
    valuationPerToken: string;
    tokenManagementCompanyAccount: TokenManagementCompanyAccount;
}
export interface TokenManagementCompanyAccount {
    tokenManagementCompanyAccountInfo: TokenManagementCompanyAccountInfo;
}



export interface TokenManagementCompanyAccountInfo {
    phoneNumber: string;
    companyName: string;
    companyWalletAddress: string | null; // Allowing null as per provided sample data
    fundWalletAddress: string | null;
    headquatersAddress: string;
    id: string;
    ipfsRecordLink: string;
    certificateCode: string;
}
//MongoDB

export interface REInfoType {
    address: string;
    area: string;
    bathRoom: string;
    bedRoom: string;
    certificateOfLand: string;
    constructionLicense: string;
    district: string;
    expiryDate: string;
    floor: string;
    floorArea: string;
    fundREAddress: string;
    fundTokenInfoAddress: string;
    id: string;
    imagesList: string[];
    isManagement: string;
    isSTOs: string;
    isValuation: string;
    livingRoom: string;
    parcelOfLand: string;
    province: string;
    rEChart: string;
    reManagements: string[];
    reType: string;
    reValuations: string[];
    registrationDeclaration: string;
    street: string;
    testRecords: string;
    tokenId: string;
    tokenName: string;
    tokenSymbol: string;
    tokenValuations: object[]; // Assuming tokenValuations is an array of objects
    useForm: string;
    useSource: string;
    userTarget: string;
    ward: string;
}
//Join

export interface TokenData {
    isSTOs: string;
    isManagement: string;
    id: string;
    isValuation: string;
    fundTokenInfoAddress: string;
    tokenId: string;
    tokenName: string;
    tokenSymbol: string;
    tokenValuations: TokenValuation[];
    address: string;
    area: string;
    bathRoom: string;
    bedRoom: string;
    certificateOfLand: string;
    constructionLicense: string;
    district: string;
    expiryDate: string;
    floor: string;
    floorArea: string;
    fundREAddress: string;
    imagesList: string[];
    livingRoom: string;
    parcelOfLand: string;
    province: string;
    rEChart: string;
    reManagements: string[];
    reType: string;
    reValuations: string[];
    registrationDeclaration: string;
    street: string;
    testRecords: string;
    useForm: string;
    useSource: string;
    userTarget: string;
    ward: string;
}

//Elsle
export type RecommendItemDataProps = {
    title: string;
    count: number;
};

export type HotProjectDataProps = {
    title: string;
    address: string;
    square: number; //ha
};

export type ReCardData = {
    image: ImageURISource;
    name: string;
    price: number;
    location: string;
};
