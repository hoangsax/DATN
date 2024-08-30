import client, {
    GET_RE_INFO,
    GET_REDATA,
    GET_STOINFOS,
    localClient,
} from "@/client";
import { TokenInfo, REInfoType, STOInfo } from "@/constants";
import { refreshData } from "@/store/fetch";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";

interface FetchDataComponentProps {
    setConstData: (item: any) => void;
}

export const FetchDataComponent = () => {
    const [graphData, setGraphData] = useState<TokenInfo[]>([]);
    const [mongoData, setMongoData] = useState<REInfoType[]>([]);
    const [stoinfos, setStoInfos] = useState<STOInfo[]>([]);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const dispatch = useDispatch();

    useEffect(() => {
        // Perform the query manually using client.query
        const fetchREInfo = async () => {
            setError(""); // Reset any previous errors

            try {
                const { data } = await localClient.query({
                    query: GET_RE_INFO,
                });
                setMongoData(data.reInfos);
                setData(data);
            } catch (err) {
                setError((err as Error).message); // Catch and set any errors
            }
        };

        const fetchREData = async () => {
            try {
                const { data } = await client.query({
                    query: GET_REDATA,
                });
                setGraphData(data.tokenInfos);
                setData(data);
            } catch (err) {
                setError(error + (err as Error).message); // Catch and set any errors
            }
        };

        const fetchSTOinfo = async () => {
            setLoading(true); // Start loading
            setError(""); // Reset any previous errors

            try {
                const { data } = await client.query({
                    query: GET_STOINFOS,
                });
                setStoInfos(data.stoinfos);
                setData(data);
            } catch (err) {
                setError(error + (err as Error).message); // Catch and set any errors
            } finally {
                setLoading(false);
            }
        };

        fetchREInfo();
        fetchREData();
        fetchSTOinfo();
    }, []);

    useEffect(() => {
        dispatch(
            refreshData(
                graphData.slice(1, -1).map((graph) => {
                    const mon = mongoData?.find(
                        (mongo) => graph.tokenId == mongo.tokenId
                    );
                    const sto = stoinfos?.find(
                        (sto) => graph.tokenId == sto.id
                    );
                    return {
                        ...graph,
                        ...mon,
                        ...sto,
                    };
                })
            )
        );
    }, [graphData, mongoData, stoinfos, data]);

    return <View></View>;
};
