// queries.ts
import { gql } from "@apollo/client";

export const GET_RE_INFO = gql`
    query GetREInfos {
        reInfos {
            address
            area
            bathRoom
            bedRoom
            certificateOfLand
            constructionLicense
            district
            expiryDate
            floor
            floorArea
            fundREAddress
            id
            imagesList
            livingRoom
            parcelOfLand
            province
            rEChart
            reManagements
            reType
            reValuations
            registrationDeclaration
            street
            testRecords
            tokenId
            useForm
            useSource
            userTarget
            ward
        }
    }
`;
export const GET_COMMENTS = gql`
    query GetComments($tokenId: String!) {
        comments(tokenId: $tokenId) {
            username
            tokenId
            content
            replies {
                username
                content
            }
            rating
            isFlagged
            createdAt
            updatedAt
        }
    }
`;

const GET_USER = gql`
    query GetUser($username: String!) {
        user(username: $username) {
            username
            walletAddress
            firstName
            lastName
            avatar
            gender
            dateOfBirth
            fullAddress
            gmail
            zipCode
            city
            phoneNumber
            cccd {
                number
                createdDate
                createdLocation
            }
            verifyState
            role
        }
    }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      username
      firstName
      lastName
      gmail
    }
  }
`;