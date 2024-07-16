import { ImageURISource } from "react-native"

export type ILogin = {
  email: string | undefined
  password: string | undefined
}

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
}

export type MarketPlaceItemData = {
    image: ImageURISource,
    name: string,
    type: string,
    totalTokens: number,
    revenuePercents: number,
    totalTradingValue: number,
    averageTradePerWeek: number,
    owners: number,
    location: string,
}

export type RecommendItemDataProps = {
  title: string,
  count: number,
}

export type HotProjectDataProps = {
  title: string,
  address: string,
  square: number, //ha
}