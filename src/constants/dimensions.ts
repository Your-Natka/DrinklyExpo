export const dimensions = {
  phone: {
    width: 390,
    height: 844,
    borderRadius: 42,
  },

  statusBar: {
    height: 48,
    paddingHorizontal: 20,
    paddingTop: 13,
  },

  buttons: {
    primaryHeight: 42,
    icon: 34,
    plus: 28,
    quantity: 26,
  },

  cards: {
    radius: 6,
  },

  images: {
    menuCardHeight: 105,

    popularCard: {
      width: 54,
      height: 54,
    },

    cartItem: {
      width: 58,
      height: 58,
    },
  },

  spacing: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 10,
    xl: 14,
    xxl: 18,
    xxxl: 20,
  },

  typography: {
    welcomeTitle: 27,
    pageTitle: 22,
    appLogo: 22,
    sectionTitle: 15,
    body: 13,
    small: 12,
    extraSmall: 11,
    tiny: 10,
  },
} as const;

export type Dimensions = typeof dimensions;
