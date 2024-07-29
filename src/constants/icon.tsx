export const icons = {
    DEFAULT: require('@/assets/favicon.png'),
    //NavIcons
    HOME: require('@/assets/icons/home').xml,
    HOME_ACTIVE: require('@/assets/icons/home_active').xml,
    LOCATION: require('@/assets/icons/location').xml,
    LOCATION_ACTIVE: require('@/assets/icons/location_active').xml,
    BOOKMARK: require('@/assets/icons/bookmark').xml,
    BOOKMARK_ACTIVE: require('@/assets/icons/bookmark_active').xml,
    PROFILE: require('@/assets/icons/profile').xml,
    PROFILE_ACTIVE: require('@/assets/icons/profile_active').xml,
    SETTING: require('@/assets/icons/setting').xml,
    SETTING_ACTIVE: require('@/assets/icons/setting_active').xml,
    PROJECT: require('@/assets/icons/project').xml,
    PROJECT_ACTIVE: require('@/assets/icons/project_active').xml,
    INVEST: require('@/assets/icons/invest').xml,
    INVEST_ACTIVE: require('@/assets/icons/invest_active').xml,
    LEASE: require('@/assets/icons/rent').xml,
    LEASE_ACTIVE: require('@/assets/icons/rent_active').xml,
    MARKETPLACE: require('@/assets/icons/marketplace').xml,
    MARKETPLACE_ACTIVE: require('@/assets/icons/marketplace_active').xml,
    //ComponentIcons

    HEART: require('@/assets/icons/heart').xml,
    SHARE: require('@/assets/icons/share').xml,
    STAR: require('@/assets/icons/star').xml,
    USER: require('@/assets/icons/user').xml,
    SEARCH: require('@/assets/icons/search').xml,
    SAVED: require('@/assets/icons/saved').xml,
    MAIL: require('@/assets/icons/mail').xml,
    LIKE: require('@/assets/icons/like').xml,
    DISLIKE: require('@/assets/icons/dislike').xml,
    BACK: require('@/assets/icons/back').xml,
    FORWARD: require('@/assets/icons/forward').xml,
    HIDE: require('@/assets/icons/hide').xml,
    PASSWORD: require('@/assets/icons/password').xml,
    FILTER: require('@/assets/icons/filter').xml,
    FILTER_2: require('@/assets/icons/filter_2').xml,
    SORT: require('@/assets/icons/sort').xml,
    LOCATION_FILL: require('@/assets/icons/location_fill').xml,
    TOKEN: require('@/assets/icons/token').xml,
    DONG: require('@/assets/icons/dong').xml,

    //Others
    LOGO: require('@/assets/icons/logo').xml,
    GOOGLE: require('@/assets/icons/google').xml,
}

export type IconType = keyof typeof icons;