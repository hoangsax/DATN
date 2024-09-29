import React from 'react';
import { render, cleanup, getByText } from '@testing-library/react-native';  // Import render
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { WaitingRelease } from '../waitingrelease';
import { LoginScreen } from '@/pages/login';  // Đảm bảo đường dẫn chính xác
import { LightTheme } from '@/constants';

import fs from 'fs';
const mockStore = configureStore([]);

const initialState = {
    theme: { palette: LightTheme },
    data: {
        returnData: datamock2, // Your mock data
    },
};
afterEach(() => {
    cleanup();
});
describe('WaitingRelease Component Stability Test - Detailed Total Render Time', () => {
    let store;
    let totalRenderTime = 0;  // Variable to store total render time
    let renderCount = 0;  // To track how many times the component rendered
  
    beforeEach(() => {
      store = mockStore(initialState);
    });
  
    const renderComponent = () => {
      const renderTimeMock = jest.fn();
      const firstRenderTime = Date.now();
  
      const ProfilerWrapper = () => (
        <React.Profiler
          id="WaitingRelease"
          onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime) => {
            // Track each render phase and accumulate total render time
            if (phase === 'mount' || phase === 'update') {
              renderTimeMock(commitTime);
              totalRenderTime = commitTime - firstRenderTime;  // Accumulate time of all renders
              renderCount++;
            }
          }}
        >
          <Provider store={store}>
            <WaitingRelease />
          </Provider>
        </React.Profiler>
      );
  
      render(<ProfilerWrapper />);
      return renderTimeMock;
    };
  
    afterEach(() => {
      cleanup();
    });
  
    test('Measures total render time from first render until stability', () => {
        totalRenderTime = 0;  // Reset total render time for each iteration
        renderCount = 0;  // Reset render count for each iteration
  
        const renderTimeMock = renderComponent();
  
        // Ensure Profiler was called multiple times (for multiple renders)
        expect(renderTimeMock).toHaveBeenCalled();
  
        // Append each iteration's total render time to the file
        const existingData = fs.existsSync('render_times.json')
          ? JSON.parse(fs.readFileSync('render_times.json', 'utf8'))
          : [];
  
        existingData.push({
          totalRenderTime,
          renderCount,  // Log the number of renders
        });  // Add current iteration's data
  
        // Write the updated data back to the file
        fs.writeFileSync('render_times.json', JSON.stringify(existingData, null, 2));
    });
  });
const datamock = [{
    "address": "556 Maple Avenue, Ward 9, District 4, Province E",
    "area": "320 sqm",
    "bathRoom": "3",
    "bedRoom": "4",
    "certificateOfLand": "CERT556",
    "constructionLicense": "LIC556",
    "district": "District 4",
    "expiryDate": "2040-11-10",
    "floor": "2",
    "floorArea": "290 sqm",
    "fundREAddress": "0xFundAddress10",
    "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
    "id": "66ce7fa5a447d03709994216",
    "imagesList": [
        "image17.jpg",
        "image18.jpg",
        "image19.jpg"
    ],
    "isManagement": "Đã thuê",
    "isSTOs": "Chưa phát hành",
    "isValuation": "Đã định giá",
    "livingRoom": "2",
    "parcelOfLand": "Parcel 82",
    "province": "Province E",
    "rEChart": "chart10.png",
    "reManagements": [
        "management10.pdf"
    ],
    "reType": "Estate",
    "reValuations": [
        "valuation10.pdf"
    ],
    "registrationDeclaration": "REG556",
    "street": "556 Maple Avenue",
    "testRecords": "test10.pdf",
    "tokenId": "10",
    "tokenName": "Khu nghỉ dưỡng Pearl",
    "tokenSymbol": "PearlResort",
    "tokenValuations": [
        [Object
        ]
    ],
    "useForm": "Mixed-Use",
    "useSource": "Freehold",
    "userTarget": "Small Business",
    "ward": "Ward 9"
},
{
    "address": "668 Cedar Street, Ward 4, District 1, Province A",
    "area": "290 sqm",
    "bathRoom": "2",
    "bedRoom": "3",
    "certificateOfLand": "CERT668",
    "constructionLicense": "LIC668",
    "district": "District 1",
    "expiryDate": "2037-09-14",
    "floor": "1",
    "floorArea": "260 sqm",
    "fundREAddress": "0xFundAddress11",
    "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
    "id": "66ce80aaa447d03709994218",
    "imagesList": [
        "image20.jpg",
        "image21.jpg",
        "image22.jpg"
    ],
    "isManagement": "Đã thuê",
    "isSTOs": "Chưa phát hành",
    "isValuation": "Đã định giá",
    "livingRoom": "1",
    "parcelOfLand": "Parcel 72",
    "province": "Province A",
    "rEChart": "chart11.png",
    "reManagements": [
        "management11.pdf"
    ],
    "reType": "Villa",
    "reValuations": [
        "valuation11.pdf"
    ],
    "registrationDeclaration": "REG668",
    "street": "668 Cedar Street",
    "testRecords": "test11.pdf",
    "tokenId": "11",
    "tokenName": "Biệt thự Aurora",
    "tokenSymbol": "VilaAurora",
    "tokenValuations": [
        [Object
        ]
    ],
    "useForm": "Residential",
    "useSource": "Lease",
    "userTarget": "Single",
    "ward": "Ward 4"
},
{
    "address": "901 Walnut Road, Ward 15, District 9, Province G",
    "area": "450 sqm",
    "bathRoom": "5",
    "bedRoom": "6",
    "certificateOfLand": "CERT901",
    "constructionLicense": "LIC901",
    "district": "District 9",
    "expiryDate": "2050-04-18",
    "floor": "3",
    "floorArea": "410 sqm",
    "fundREAddress": "0xFundAddress12",
    "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
    "id": "66ce80aaa447d03709994219",
    "imagesList": [
        "image23.jpg",
        "image24.jpg",
        "image25.jpg"
    ],
    "isManagement": "Đã thuê",
    "isSTOs": "Chưa phát hành",
    "isValuation": "Đã định giá",
    "livingRoom": "3",
    "parcelOfLand": "Parcel 150",
    "province": "Province G",
    "rEChart": "chart12.png",
    "reManagements": [
        "management12.pdf"
    ],
    "reType": "Estate",
    "reValuations": [
        "valuation12.pdf"
    ],
    "registrationDeclaration": "REG901",
    "street": "901 Walnut Road",
    "testRecords": "test12.pdf",
    "tokenId": "12",
    "tokenName": "Nhà phố Solaris",
    "tokenSymbol": "SolarisHouse",
    "tokenValuations": [
        [Object
        ]
    ],
    "useForm": "Residential",
    "useSource": "Freehold",
    "userTarget": "Large Family",
    "ward": "Ward 15"
},
{
    "address": "112 Cherry Drive, Ward 7, District 3, Province C",
    "area": "350 sqm",
    "bathRoom": "3",
    "bedRoom": "4",
    "certificateOfLand": "CERT112",
    "constructionLicense": "LIC112",
    "district": "District 3",
    "expiryDate": "2044-05-20",
    "floor": "2",
    "floorArea": "320 sqm",
    "fundREAddress": "0xFundAddress13",
    "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
    "id": "66ce80aaa447d0370999421a",
    "imagesList": [
        "image26.jpg",
        "image27.jpg",
        "image28.jpg"
    ],
    "isManagement": "Đã thuê",
    "isSTOs": "Chưa phát hành",
    "isValuation": "Đã định giá",
    "livingRoom": "2",
    "parcelOfLand": "Parcel 90",
    "province": "Province C",
    "rEChart": "chart13.png",
    "reManagements": [
        "management13.pdf"
    ],
    "reType": "Estate",
    "reValuations": [
        "valuation13.pdf"
    ],
    "registrationDeclaration": "REG112",
    "street": "112 Cherry Drive",
    "testRecords": "test13.pdf",
    "tokenId": "13",
    "tokenName": "Estate Diamond",
    "tokenSymbol": "DiamondEstate",
    "tokenValuations": [
        [Object
        ]
    ],
    "useForm": "Vacation",
    "useSource": "Lease",
    "userTarget": "Retirees",
    "ward": "Ward 7"
}]
const datamock2 = [
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "668 Cedar Street, Ward 4, District 1, Province A",
        "area": "290 sqm",
        "bathRoom": "2",
        "bedRoom": "3",
        "certificateOfLand": "CERT668",
        "constructionLicense": "LIC668",
        "district": "District 1",
        "expiryDate": "2037-09-14",
        "floor": "1",
        "floorArea": "260 sqm",
        "fundREAddress": "0xFundAddress11",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d03709994218",
        "imagesList": [
            "image20.jpg",
            "image21.jpg",
            "image22.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "1",
        "parcelOfLand": "Parcel 72",
        "province": "Province A",
        "rEChart": "chart11.png",
        "reManagements": [
            "management11.pdf"
        ],
        "reType": "Villa",
        "reValuations": [
            "valuation11.pdf"
        ],
        "registrationDeclaration": "REG668",
        "street": "668 Cedar Street",
        "testRecords": "test11.pdf",
        "tokenId": "11",
        "tokenName": "Biệt thự Aurora",
        "tokenSymbol": "VilaAurora",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Lease",
        "userTarget": "Single",
        "ward": "Ward 4"
    },
    {
        "address": "901 Walnut Road, Ward 15, District 9, Province G",
        "area": "450 sqm",
        "bathRoom": "5",
        "bedRoom": "6",
        "certificateOfLand": "CERT901",
        "constructionLicense": "LIC901",
        "district": "District 9",
        "expiryDate": "2050-04-18",
        "floor": "3",
        "floorArea": "410 sqm",
        "fundREAddress": "0xFundAddress12",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d03709994219",
        "imagesList": [
            "image23.jpg",
            "image24.jpg",
            "image25.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "3",
        "parcelOfLand": "Parcel 150",
        "province": "Province G",
        "rEChart": "chart12.png",
        "reManagements": [
            "management12.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation12.pdf"
        ],
        "registrationDeclaration": "REG901",
        "street": "901 Walnut Road",
        "testRecords": "test12.pdf",
        "tokenId": "12",
        "tokenName": "Nhà phố Solaris",
        "tokenSymbol": "SolarisHouse",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Freehold",
        "userTarget": "Large Family",
        "ward": "Ward 15"
    },
    {
        "address": "112 Cherry Drive, Ward 7, District 3, Province C",
        "area": "350 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT112",
        "constructionLicense": "LIC112",
        "district": "District 3",
        "expiryDate": "2044-05-20",
        "floor": "2",
        "floorArea": "320 sqm",
        "fundREAddress": "0xFundAddress13",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d0370999421a",
        "imagesList": [
            "image26.jpg",
            "image27.jpg",
            "image28.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 90",
        "province": "Province C",
        "rEChart": "chart13.png",
        "reManagements": [
            "management13.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation13.pdf"
        ],
        "registrationDeclaration": "REG112",
        "street": "112 Cherry Drive",
        "testRecords": "test13.pdf",
        "tokenId": "13",
        "tokenName": "Estate Diamond",
        "tokenSymbol": "DiamondEstate",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Vacation",
        "useSource": "Lease",
        "userTarget": "Retirees",
        "ward": "Ward 7"
    },
    {
        "address": "234 Elm Avenue, Ward 6, District 8, Province H",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT234",
        "constructionLicense": "LIC234",
        "district": "District 8",
        "expiryDate": "2043-11-25",
        "floor": "2",
        "floorArea": "280 sqm",
        "fundREAddress": "0xFundAddress14",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d0370999421b",
        "imagesList": [
            "image29.jpg",
            "image30.jpg",
            "image31.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 115",
        "province": "Province H",
        "rEChart": "chart14.png",
        "reManagements": [
            "management14.pdf"
        ],
        "reType": "Hall",
        "reValuations": [
            "valuation14.pdf"
        ],
        "registrationDeclaration": "REG234",
        "street": "234 Elm Avenue",
        "testRecords": "test14.pdf",
        "tokenId": "14",
        "tokenName": "Hall of Amber",
        "tokenSymbol": "AmberHall",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Freehold",
        "userTarget": "Family",
        "ward": "Ward 6"
    },
    {

        "address": "789 Ash Street, Ward 5, District 4, Province I",
        "area": "300 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT789A",
        "constructionLicense": "LIC789A",
        "district": "District 4",
        "expiryDate": "2041-08-08",
        "floor": "2",
        "floorArea": "270 sqm",
        "fundREAddress": "0xFundAddress15",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d0370999421c",
        "imagesList": [
            "image32.jpg",
            "image33.jpg",
            "image34.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 100",
        "province": "Province I",
        "rEChart": "chart15.png",
        "reManagements": [
            "management15.pdf"
        ],
        "reType": "Villa",
        "reValuations": [
            "valuation15.pdf"
        ],
        "registrationDeclaration": "REG789A",
        "street": "789 Ash Street",
        "testRecords": "test15.pdf",
        "tokenId": "15",
        "tokenName": "Villa Majestic",
        "tokenSymbol": "MajesticVilla",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Lease",
        "userTarget": "Small Business",
        "ward": "Ward 5"
    },
    {

        "address": "345 Sycamore Lane, Ward 10, District 5, Province J",
        "area": "380 sqm",
        "bathRoom": "4",
        "bedRoom": "5",
        "certificateOfLand": "CERT345",
        "constructionLicense": "LIC345",
        "district": "District 5",
        "expiryDate": "2048-10-12",
        "floor": "3",
        "floorArea": "340 sqm",
        "fundREAddress": "0xFundAddress16",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d0370999421d",
        "imagesList": [
            "image35.jpg",
            "image36.jpg",
            "image37.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 130",
        "province": "Province J",
        "rEChart": "chart16.png",
        "reManagements": [
            "management16.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation16.pdf"
        ],
        "registrationDeclaration": "REG345",
        "street": "345 Sycamore Lane",
        "testRecords": "test16.pdf",
        "tokenId": "16",
        "tokenName": "Estate Golden",
        "tokenSymbol": "GoldenEstate",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Freehold",
        "userTarget": "Large Family",
        "ward": "Ward 10"
    },
    {

        "address": "987 Fir Road, Ward 14, District 6, Province K",
        "area": "410 sqm",
        "bathRoom": "5",
        "bedRoom": "6",
        "certificateOfLand": "CERT987",
        "constructionLicense": "LIC987",
        "district": "District 6",
        "expiryDate": "2047-01-20",
        "floor": "3",
        "floorArea": "370 sqm",
        "fundREAddress": "0xFundAddress17",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d0370999421e",
        "imagesList": [
            "image38.jpg",
            "image39.jpg",
            "image40.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "3",
        "parcelOfLand": "Parcel 140",
        "province": "Province K",
        "rEChart": "chart17.png",
        "reManagements": [
            "management17.pdf"
        ],
        "reType": "House",
        "reValuations": [
            "valuation17.pdf"
        ],
        "registrationDeclaration": "REG987",
        "street": "987 Fir Road",
        "testRecords": "test17.pdf",
        "tokenId": "17",
        "tokenName": "Hall of Crystal",
        "tokenSymbol": "CrystalHall",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Freehold",
        "userTarget": "Large Family",
        "ward": "Ward 14"
    },
    {

        "address": "234 Magnolia Street, Ward 8, District 3, Province L",
        "area": "330 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT234M",
        "constructionLicense": "LIC234M",
        "district": "District 3",
        "expiryDate": "2044-12-15",
        "floor": "2",
        "floorArea": "300 sqm",
        "fundREAddress": "0xFundAddress18",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d0370999421f",
        "imagesList": [
            "image41.jpg",
            "image42.jpg",
            "image43.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 92",
        "province": "Province L",
        "rEChart": "chart18.png",
        "reManagements": [
            "management18.pdf"
        ],
        "reType": "House",
        "reValuations": [
            "valuation18.pdf"
        ],
        "registrationDeclaration": "REG234M",
        "street": "234 Magnolia Street",
        "testRecords": "test18.pdf",
        "tokenId": "18",
        "tokenName": "Villa Emerald",
        "tokenSymbol": "EmeraldVilla",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Vacation",
        "useSource": "Lease",
        "userTarget": "Retirees",
        "ward": "Ward 8"
    },
    {

        "address": "678 Spruce Drive, Ward 11, District 2, Province M",
        "area": "350 sqm",
        "bathRoom": "4",
        "bedRoom": "5",
        "certificateOfLand": "CERT678",
        "constructionLicense": "LIC678",
        "district": "District 2",
        "expiryDate": "2045-02-05",
        "floor": "2",
        "floorArea": "320 sqm",
        "fundREAddress": "0xFundAddress19",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d03709994220",
        "imagesList": [
            "image44.jpg",
            "image45.jpg",
            "image46.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 104",
        "province": "Province M",
        "rEChart": "chart19.png",
        "reManagements": [
            "management19.pdf"
        ],
        "reType": "Hall",
        "reValuations": [
            "valuation19.pdf"
        ],
        "registrationDeclaration": "REG678",
        "street": "678 Spruce Drive",
        "testRecords": "test19.pdf",
        "tokenId": "19",
        "tokenName": "Estate Sapphire",
        "tokenSymbol": "SapphireEstate",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Freehold",
        "userTarget": "Large Family",
        "ward": "Ward 11"
    },
    {

        "address": "456 Elm St, Ward 2, District 3, Province B",
        "area": "200 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT456",
        "constructionLicense": "LIC456",
        "currentSupply": "2000",
        "district": "District 3",
        "endAt": "1723704960",
        "expiryDate": "2035-05-15",
        "floor": "2",
        "floorArea": "150 sqm",
        "fundREAddress": "0xFundAddress2",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "2",
        "imagesList": [
            "image3.jpg",
            "image4.jpg"
        ],
        "ipfsRecordLink": "ipfsRecordLink",
        "isManagement": "Đã thuê",
        "isSTOs": "Đã phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 67",
        "province": "Province B",
        "purchasedAmount": "0",
        "purchasedCount": "0",
        "rEChart": "chart2.png",
        "reManagements": [
            "management3",
            "management4"
        ],
        "reType": "Villa",
        "reValuations": [
            "valuation3",
            "valuation4"
        ],
        "registrationDeclaration": "REG456",
        "securityTokenAddress": "0x99624f710c54ce5f3264d40e5419b725c1a9a165",
        "securityTokenType": "Shares",
        "stage": "0",
        "startAt": "1723695240",
        "state": "STOinProgress",
        "street": "456 Elm St",
        "supplyTotal": "2366",
        "testRecords": "test2.pdf",
        "tokenId": "2",
        "tokenManagementCompanyAccount": {

            "tokenManagementCompanyAccountInfo": [Object
            ]
        },
        "tokenName": "Biệt thự Vanni",
        "tokenSymbol": "VilaVanni",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Ownership",
        "userTarget": "Family",
        "valuationPerToken": "12265000",
        "ward": "Ward 2"
    },
    {

        "address": "901 Poplar Avenue, Ward 13, District 7, Province N",
        "area": "290 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT901P",
        "constructionLicense": "LIC901P",
        "district": "District 7",
        "expiryDate": "2042-06-30",
        "floor": "1",
        "floorArea": "260 sqm",
        "fundREAddress": "0xFundAddress20",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d03709994221",
        "imagesList": [
            "image47.jpg",
            "image48.jpg",
            "image49.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "1",
        "parcelOfLand": "Parcel 80",
        "province": "Province N",
        "rEChart": "chart20.png",
        "reManagements": [
            "management20.pdf"
        ],
        "reType": "Villa",
        "reValuations": [
            "valuation20.pdf"
        ],
        "registrationDeclaration": "REG901P",
        "street": "901 Poplar Avenue",
        "testRecords": "test20.pdf",
        "tokenId": "20",
        "tokenName": "Hall of Jade",
        "tokenSymbol": "JadeHall",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Lease",
        "userTarget": "Single",
        "ward": "Ward 13"
    },
    {

        "address": "345 Cypress Road, Ward 16, District 8, Province O",
        "area": "410 sqm",
        "bathRoom": "5",
        "bedRoom": "6",
        "certificateOfLand": "CERT345C",
        "constructionLicense": "LIC345C",
        "district": "District 8",
        "expiryDate": "2046-11-12",
        "floor": "3",
        "floorArea": "370 sqm",
        "fundREAddress": "0xFundAddress21",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d03709994222",
        "imagesList": [
            "image50.jpg",
            "image51.jpg",
            "image52.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "3",
        "parcelOfLand": "Parcel 132",
        "province": "Province O",
        "rEChart": "chart21.png",
        "reManagements": [
            "management21.pdf"
        ],
        "reType": "Hall",
        "reValuations": [
            "valuation21.pdf"
        ],
        "registrationDeclaration": "REG345C",
        "street": "345 Cypress Road",
        "testRecords": "test21.pdf",
        "tokenId": "21",
        "tokenName": "House of Ruby",
        "tokenSymbol": "RubyHouse",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Freehold",
        "userTarget": "Large Family",
        "ward": "Ward 16"
    },
    {

        "address": "678 Willow Lane, Ward 17, District 10, Province P",
        "area": "350 sqm",
        "bathRoom": "4",
        "bedRoom": "5",
        "certificateOfLand": "CERT678W",
        "constructionLicense": "LIC678W",
        "district": "District 10",
        "expiryDate": "2049-07-22",
        "floor": "2",
        "floorArea": "320 sqm",
        "fundREAddress": "0xFundAddress22",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d03709994223",
        "imagesList": [
            "image53.jpg",
            "image54.jpg",
            "image55.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 125",
        "province": "Province P",
        "rEChart": "chart22.png",
        "reManagements": [
            "management22.pdf"
        ],
        "reType": "Hall",
        "reValuations": [
            "valuation22.pdf"
        ],
        "registrationDeclaration": "REG678W",
        "street": "678 Willow Lane",
        "testRecords": "test22.pdf",
        "tokenId": "22",
        "tokenName": "Villa Opulence",
        "tokenSymbol": "OpulenceVilla",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Freehold",
        "userTarget": "Large Family",
        "ward": "Ward 17"
    },
    {

        "address": "123 Beech Road, Ward 18, District 9, Province Q",
        "area": "330 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT123B",
        "constructionLicense": "LIC123B",
        "district": "District 9",
        "expiryDate": "2043-12-10",
        "floor": "2",
        "floorArea": "300 sqm",
        "fundREAddress": "0xFundAddress23",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce80aaa447d03709994224",
        "imagesList": [
            "image56.jpg",
            "image57.jpg",
            "image58.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 110",
        "province": "Province Q",
        "rEChart": "chart23.png",
        "reManagements": [
            "management23.pdf"
        ],
        "reType": "House",
        "reValuations": [
            "valuation23.pdf"
        ],
        "registrationDeclaration": "REG123B",
        "street": "123 Beech Road",
        "testRecords": "test23.pdf",
        "tokenId": "23",
        "tokenName": "Estate Pearl",
        "tokenSymbol": "PearlEstate",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Vacation",
        "useSource": "Lease",
        "userTarget": "Retirees",
        "ward": "Ward 18"
    },
    {

        "address": "789 Oak St, Ward 3, District 2, Province C",
        "area": "300 sqm",
        "bathRoom": "4",
        "bedRoom": "5",
        "certificateOfLand": "CERT789",
        "constructionLicense": "LIC789",
        "currentSupply": "2000",
        "district": "District 2",
        "endAt": "1727604000",
        "expiryDate": "2040-07-20",
        "floor": "1",
        "floorArea": "250 sqm",
        "fundREAddress": "0xFundAddress3",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "3",
        "imagesList": [
            "image5.jpg",
            "image6.jpg"
        ],
        "ipfsRecordLink": "_ipfsRecordLink",
        "isManagement": "Đã thuê",
        "isSTOs": "Đã phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "3",
        "parcelOfLand": "Parcel 89",
        "province": "Province C",
        "purchasedAmount": "0",
        "purchasedCount": "0",
        "rEChart": "chart3.png",
        "reManagements": [
            "management5",
            "management6"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation5",
            "valuation6"
        ],
        "registrationDeclaration": "REG789",
        "securityTokenAddress": "0x99624f710c54ce5f3264d40e5419b725c1a9a165",
        "securityTokenType": "Shares",
        "stage": "0",
        "startAt": "1724925600",
        "state": "STOinProgress",
        "street": "789 Oak St",
        "supplyTotal": "2500",
        "testRecords": "test3.pdf",
        "tokenId": "3",
        "tokenManagementCompanyAccount": {

            "tokenManagementCompanyAccountInfo": [Object
            ]
        },
        "tokenName": "Vin home CenTral Park",
        "tokenSymbol": "CenTralPark",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Ownership",
        "userTarget": "Family",
        "valuationPerToken": "11625000",
        "ward": "Ward 3"
    },
    {

        "address": "101 Maple St, Ward 4, District 1, Province D",
        "area": "80 sqm",
        "bathRoom": "1",
        "bedRoom": "2",
        "certificateOfLand": "CERT101",
        "constructionLicense": "LIC101",
        "currentSupply": "2000",
        "district": "District 1",
        "endAt": "1727604000",
        "expiryDate": "2025-11-05",
        "floor": "10",
        "floorArea": "60 sqm",
        "fundREAddress": "0xFundAddress4",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "4",
        "imagesList": [
            "image7.jpg",
            "image8.jpg"
        ],
        "ipfsRecordLink": "_ipfsRecordLink",
        "isManagement": "Đã thuê",
        "isSTOs": "Đã phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "1",
        "parcelOfLand": "Parcel 12",
        "province": "Province D",
        "purchasedAmount": "0",
        "purchasedCount": "0",
        "rEChart": "chart4.png",
        "reManagements": [
            "management7",
            "management8"
        ],
        "reType": "Villa",
        "reValuations": [
            "valuation7",
            "valuation8"
        ],
        "registrationDeclaration": "REG101",
        "securityTokenAddress": "0x99624f710c54ce5f3264d40e5419b725c1a9a165",
        "securityTokenType": "Shares",
        "stage": "0",
        "startAt": "1724925600",
        "state": "STOinProgress",
        "street": "101 Maple St",
        "supplyTotal": "2500",
        "testRecords": "test4.pdf",
        "tokenId": "4",
        "tokenManagementCompanyAccount": {

            "tokenManagementCompanyAccountInfo": [Object
            ]
        },
        "tokenName": "Biệt thự Vanni 2",
        "tokenSymbol": "VilaVanni 2",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Ownership",
        "userTarget": "Single",
        "valuationPerToken": "10710000",
        "ward": "Ward 4"
    },
    {

        "address": "456 Pine St, Ward 7, District 4, Province A",
        "area": "150 sqm",
        "bathRoom": "2",
        "bedRoom": "3",
        "certificateOfLand": "CERT456",
        "constructionLicense": "LIC456",
        "district": "District 4",
        "expiryDate": "2035-05-15",
        "floor": "2",
        "floorArea": "130 sqm",
        "fundREAddress": "0xFundAddress1",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66cd950b18fca5bb7a1c12b2",
        "imagesList": [
            "image1.jpg",
            "image2.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "1",
        "parcelOfLand": "Parcel 34",
        "province": "Province A",
        "rEChart": "chart1.png",
        "reManagements": [
            "management1.pdf"
        ],
        "reType": "Villa",
        "reValuations": [
            "valuation1.pdf"
        ],
        "registrationDeclaration": "REG456",
        "street": "456 Pine St",
        "testRecords": "test1.pdf",
        "tokenId": "5",
        "tokenName": "Maple House",
        "tokenSymbol": "MapleHouse",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Commercial",
        "useSource": "Lease",
        "userTarget": "Business",
        "ward": "Ward 7"
    },
    {

        "address": "101 Maple Ave, Ward 5, District 1, Province B",
        "area": "400 sqm",
        "bathRoom": "5",
        "bedRoom": "6",
        "certificateOfLand": "CERT101",
        "constructionLicense": "LIC101",
        "district": "District 1",
        "expiryDate": "2045-11-30",
        "floor": "3",
        "floorArea": "380 sqm",
        "fundREAddress": "0xFundAddress2",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66cd951fb908503e5075f0df",
        "imagesList": [
            "image3.jpg",
            "image4.jpg",
            "image5.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 78",
        "province": "Province B",
        "rEChart": "chart2.png",
        "reManagements": [
            "management2.pdf"
        ],
        "reType": "Villa",
        "reValuations": [
            "valuation2.pdf"
        ],
        "registrationDeclaration": "REG101",
        "street": "101 Maple Ave",
        "testRecords": "test2.pdf",
        "tokenId": "6",
        "tokenName": "Birch Villa",
        "tokenSymbol": "BirchVilla",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Commercial",
        "useSource": "Lease",
        "userTarget": "Corporate",
        "ward": "Ward 5"
    },
    {

        "address": "321 Birch Lane, Ward 8, District 5, Province D",
        "area": "350 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT321",
        "constructionLicense": "LIC321",
        "district": "District 5",
        "expiryDate": "2042-12-01",
        "floor": "2",
        "floorArea": "300 sqm",
        "fundREAddress": "0xFundAddress4",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66cd95d380388dea6dfe7859",
        "imagesList": [
            "image8.jpg",
            "image9.jpg",
            "image10.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 90",
        "province": "Province D",
        "rEChart": "chart4.png",
        "reManagements": [
            "management4.pdf"
        ],
        "reType": "Hall",
        "reValuations": [
            "valuation4.pdf"
        ],
        "registrationDeclaration": "REG321",
        "street": "321 Birch Lane",
        "testRecords": "test4.pdf",
        "tokenId": "7",
        "tokenName": "Nhà phố Luna",
        "tokenSymbol": "LunaHouse",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Commercial",
        "useSource": "Lease",
        "userTarget": "Retail",
        "ward": "Ward 8"
    },
    {
        "address": "432 Oak Street, Ward 12, District 7, Province F",
        "area": "400 sqm",
        "bathRoom": "4",
        "bedRoom": "5",
        "certificateOfLand": "CERT432",
        "constructionLicense": "LIC432",
        "district": "District 7",
        "expiryDate": "2045-03-15",
        "floor": "3",
        "floorArea": "350 sqm",
        "fundREAddress": "0xFundAddress8",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994214",
        "imagesList": [
            "image11.jpg",
            "image12.jpg",
            "image13.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 105",
        "province": "Province F",
        "rEChart": "chart8.png",
        "reManagements": [
            "management8.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation8.pdf"
        ],
        "registrationDeclaration": "REG432",
        "street": "432 Oak Street",
        "testRecords": "test8.pdf",
        "tokenId": "8",
        "tokenName": "Biệt thự Sapphire",
        "tokenSymbol": "VilaSapphire",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Residential",
        "useSource": "Freehold",
        "userTarget": "Family",
        "ward": "Ward 12"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
    {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    }, {
        "address": "556 Maple Avenue, Ward 9, District 4, Province E",
        "area": "320 sqm",
        "bathRoom": "3",
        "bedRoom": "4",
        "certificateOfLand": "CERT556",
        "constructionLicense": "LIC556",
        "district": "District 4",
        "expiryDate": "2040-11-10",
        "floor": "2",
        "floorArea": "290 sqm",
        "fundREAddress": "0xFundAddress10",
        "fundTokenInfoAddress": "0x7b0ed8dd6834e9b078fba94454d395a4343b04bc",
        "id": "66ce7fa5a447d03709994216",
        "imagesList": [
            "image17.jpg",
            "image18.jpg",
            "image19.jpg"
        ],
        "isManagement": "Đã thuê",
        "isSTOs": "Chưa phát hành",
        "isValuation": "Đã định giá",
        "livingRoom": "2",
        "parcelOfLand": "Parcel 82",
        "province": "Province E",
        "rEChart": "chart10.png",
        "reManagements": [
            "management10.pdf"
        ],
        "reType": "Estate",
        "reValuations": [
            "valuation10.pdf"
        ],
        "registrationDeclaration": "REG556",
        "street": "556 Maple Avenue",
        "testRecords": "test10.pdf",
        "tokenId": "10",
        "tokenName": "Khu nghỉ dưỡng Pearl",
        "tokenSymbol": "PearlResort",
        "tokenValuations": [
            [Object
            ]
        ],
        "useForm": "Mixed-Use",
        "useSource": "Freehold",
        "userTarget": "Small Business",
        "ward": "Ward 9"
    },
]
