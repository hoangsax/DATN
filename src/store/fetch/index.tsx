import client, {
    GET_RE_INFO,
    GET_REDATA,
    GET_STOINFOS,
    localClient,
} from "@/client";
import { REInfoType, STOInfo, TokenInfo } from "@/constants";
import { createSlice } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";

interface DataProps {
    reInfos: REInfoType[];
    tokenInfos: TokenInfo[];
    stoInfos: STOInfo[];
}

interface resultReInfo {
    reInfos: REInfoType[]
}

interface DataState {
    returnData: any
}

const initialState: DataState = {
    returnData: null
}

console.log(initialState.returnData)

const fetchSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        refreshData: (state, action) => {
            state.returnData = action.payload
        }
    },
});

export const { refreshData } = fetchSlice.actions;

export default fetchSlice.reducer;