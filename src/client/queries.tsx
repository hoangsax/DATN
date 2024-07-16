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

export const GET_TOKEN_INFO = gql`
    {
        tokenInfos(first: 5) {
            id
            fundTokenInfoAddress
            fundCompanyAccount {
                id
            }
            tokenId
        }
        stoinfos(first: 5) {
            id
            tokenInfo {
                id
            }
            securityTokenAddress
            securityTokenType
        }
    }
`;

export const GET_REDATA = gql`
    query getRedata {
        securityTokens {
            supplyTotal
            tokenInfo {
                tokenId
                tokenName
            }
        }
    }
`;
