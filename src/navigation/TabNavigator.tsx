import {
  CompositeNavigationProp,
  DrawerActions,
  useNavigation,
} from "@react-navigation/native";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import HomeScreen from "../pages/Home";
import MenuScreen from "../pages/Menu";
import CartScreen from "../pages/Cart";

import {
  DrawerParamList,
  MainTabParamList,
  RootStackParamList,
} from "./navigationTypes";

import { Drink, Screen } from "../types";
import { useAppContext } from "../context/AppContext";
import { SCREENS } from "../constants/screens";

const Tab = createBottomTabNavigator<MainTabParamList>();

type TabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tab.Screen name={SCREENS.HOME} component={HomeScreenAdapter} />
      <Tab.Screen name={SCREENS.MENU} component={MenuScreenAdapter} />
      <Tab.Screen name={SCREENS.CART} component={CartScreenAdapter} />
    </Tab.Navigator>
  );
}

function HomeScreenAdapter() {
  const navigation = useNavigation<TabNavigationProp>();

  const { cartCount, favorites, toggleFavorite, selectDrink } = useAppContext();

  const handleNavigate = (screen: Screen) => {
    switch (screen) {
      case "home":
        navigation.navigate(SCREENS.HOME);
        break;

      case "menu":
        navigation.navigate(SCREENS.MENU);
        break;

      case "cart":
        navigation.navigate(SCREENS.CART);
        break;

      case "cafe":
        navigation.dispatch(DrawerActions.jumpTo("Cafe"));
        break;

      default:
        break;
    }
  };

  const handleDrinkSelect = (drink: Drink) => {
    selectDrink(drink);

    const parent = navigation.getParent();

    if (parent) {
      parent.getParent()?.navigate(SCREENS.DRINK_DETAILS, {
        drinkId: drink.id,
      });
    }
  };

  const handleApiCoffeeSelect = (itemId: string) => {
    const parent = navigation.getParent();

    if (parent) {
      parent.getParent()?.navigate("ApiCoffeeDetails", {
        itemId,
      });
    }
  };

  return (
    <HomeScreen
      cartCount={cartCount}
      onNavigate={handleNavigate}
      onMenuOpen={() => {
        navigation.dispatch(DrawerActions.openDrawer());
      }}
      onDrinkSelect={handleDrinkSelect}
      onApiCoffeeSelect={handleApiCoffeeSelect}
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
    />
  );
}

function MenuScreenAdapter() {
  const navigation = useNavigation<TabNavigationProp>();

  const { cartCount, selectDrink } = useAppContext();

  const handleNavigate = (screen: Screen) => {
    switch (screen) {
      case "home":
        navigation.navigate(SCREENS.HOME);
        break;

      case "cart":
        navigation.navigate(SCREENS.CART);
        break;

      case "cafe":
        navigation.dispatch(DrawerActions.jumpTo("Cafe"));
        break;

      default:
        break;
    }
  };

  const handleDrinkSelect = (drink: Drink) => {
    selectDrink(drink);

    const parent = navigation.getParent();

    if (parent) {
      parent.getParent()?.navigate(SCREENS.DRINK_DETAILS, {
        drinkId: drink.id,
      });
    }
  };

  return (
    <MenuScreen
      onBack={() => {
        navigation.navigate(SCREENS.HOME);
      }}
      cartCount={cartCount}
      onNavigate={handleNavigate}
      onDrinkSelect={handleDrinkSelect}
    />
  );
}

function CartScreenAdapter() {
  const navigation = useNavigation<TabNavigationProp>();

  const { cart, orderMode, updateQuantity, removeFromCart } = useAppContext();

  return (
    <CartScreen
      items={cart}
      mode={orderMode}
      onBack={() => {
        navigation.navigate(SCREENS.HOME);
      }}
      onCheckout={() => {
        navigation.getParent()?.getParent()?.navigate(SCREENS.CHECKOUT);
      }}
      onUpdateQuantity={updateQuantity}
      onRemove={removeFromCart}
    />
  );
}
