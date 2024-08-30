// queries.ts
import { gql } from '@apollo/client';

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
    }`;
