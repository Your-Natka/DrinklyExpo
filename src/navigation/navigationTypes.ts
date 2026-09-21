import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Welcome: undefined;

  AppDrawer: NavigatorScreenParams<DrawerParamList>;

  DrinkDetails: {
    drinkId: string;
  };

  Checkout: undefined;

  Payment: undefined;

  Confirmation: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Menu: undefined;
  Cart: undefined;
};

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Cafe: undefined;
};
