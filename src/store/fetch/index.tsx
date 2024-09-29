import client, {
    GET_RE_INFO,
    GET_REDATA,
    GET_STOINFOS,
    localClient,
} from "@/client";
import { REInfoType, STOInfo, TokenInfo } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { UriProps } from "react-native-svg";

interface DataProps {
    reInfos: REInfoType[];
    tokenInfos: TokenInfo[];
    stoInfos: STOInfo[];
}

interface resultReInfo {
    reInfos: REInfoType[]
}

interface DataState {
    returnData: any,
    loading: boolean
}

const initialState: DataState = {
    returnData: null,
    loading: false
}

const fetchSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        refreshData: (state, action) => {
            state.returnData = action.payload
        },
        setState: (state, action) => {
            state.loading = action.payload
        },
    },
});

export const { refreshData, setState } = fetchSlice.actions;

export default fetchSlice.reducer;