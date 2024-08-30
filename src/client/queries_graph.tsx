// src/queries.ts
import { gql } from "@apollo/client";

export const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            email
            name
        }
    }
`;

export const GET_REDATA = gql`
    query getRedata {
        tokenInfos {
            isSTOs
            isManagement
            id
            isValuation
            fundTokenInfoAddress
            tokenId
            tokenName
            tokenSymbol
            tokenValuations {
                valuation
            }
        }
    }
`;

export const GET_STOINFOS = gql`
query getStoInfos {
  stoinfos {
    id
    securityTokenAddress
    securityTokenType
    stage
    startAt
    state
    supplyTotal
    purchasedCount
    purchasedAmount
    ipfsRecordLink
    endAt
    currentSupply
    valuationPerToken
    tokenManagementCompanyAccount {
      tokenManagementCompanyAccountInfo {
        phoneNumber
        companyName
        companyWalletAddress
        fundWalletAddress
        headquatersAddress
        id
        ipfsRecordLink
        certificateCode
      }
    }
  }
}`