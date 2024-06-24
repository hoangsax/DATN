export type ILogin = {
  email: string | undefined
  password: string | undefined
}

export type RealEstateItemData = {
  price: number,
  detail: {
    livingroom: number,
    bedroom: number,
    toilet: number,
    floor: number,
  },
  address: string,
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