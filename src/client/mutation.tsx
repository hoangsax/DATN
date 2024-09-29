import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                id
                email
                name
            }
        }
    }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
        username
        password
        mnemonic
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
        role
    }
  }
`;
