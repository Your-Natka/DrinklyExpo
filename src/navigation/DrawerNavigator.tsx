import React from "react";
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import CafeScreen from "../pages/Cafe";
import TabNavigator from "./TabNavigator";

import Icon, { IconName } from "../components/Icon";
import { COLORS } from "../constants/colors";

import { DrawerParamList, MainTabParamList } from "./navigationTypes";

import { useAppContext } from "../context/AppContext";
import { SCREENS } from "../constants/screens";

const Drawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        overlayColor: "rgba(0,0,0,0.28)",
        drawerStyle: {
          width: 310,
          backgroundColor: COLORS.primary,
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{
          title: "Home",
        }}
      />

      <Drawer.Screen
        name={SCREENS.CAFE}
        component={CafeScreenAdapter}
        options={{
          title: "Café",
        }}
      />
    </Drawer.Navigator>
  );
}

/*
 * Custom Drawer
 *
 * React Navigation still controls the drawer itself,
 * but this component keeps the original Drinkly menu design.
 */
function CustomDrawerContent({ navigation }: DrawerContentComponentProps) {
  const { width } = useWindowDimensions();

  const { resetOrder } = useAppContext();

  const drawerWidth = Math.min(width * 0.74, 310);

  const navigateToTab = (screen: keyof MainTabParamList) => {
    navigation.navigate("MainTabs", {
      screen,
    });

    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const handleCafe = () => {
    navigation.navigate(SCREENS.CAFE);

    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const handleStartOver = () => {
    resetOrder();

    navigation.dispatch(DrawerActions.closeDrawer());

    const parent = navigation.getParent();

    if (parent) {
      parent.navigate(SCREENS.WELCOME);
    }
  };

  const handleSocialPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch {
      // Ignore link errors.
    }
  };

  return (
    <View style={styles.drawerContainer}>
      <View
        style={[
          styles.drawer,
          {
            width: drawerWidth,
          },
        ]}
      >
        {/* LOGO */}
        <View style={styles.logoRow}>
          <View style={styles.logoBlock}>
            <Text style={styles.logo}>Drinkly</Text>

            <Text style={styles.logoSubtitle}>Café & Bar</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}
            style={styles.closeButton}
          >
            <Icon name="close" size={17} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* LOCATION */}
        <View style={styles.location}>
          <Text style={styles.locationLabel}>LOCATION</Text>

          <Text style={styles.locationValue}>Coffee Street 12, Łódź</Text>
        </View>

        {/* NAVIGATION */}
        <View style={styles.navigation}>
          <DrawerMenuItem
            label="Home"
            icon="spriteHome"
            onPress={() => navigateToTab("Home")}
          />

          <DrawerMenuItem
            label="Menu"
            icon="spriteMenu"
            onPress={() => navigateToTab("Menu")}
          />

          <DrawerMenuItem
            label="My Order"
            icon="spriteCart"
            onPress={() => navigateToTab("Cart")}
          />

          <DrawerMenuItem label="Café" icon="spriteCafe" onPress={handleCafe} />

          {/* CHANGE ORDER TYPE */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={handleStartOver}
            style={styles.changeButton}
          >
            <View style={styles.changeIconBox}>
              <Icon name="revers" size={17} color={COLORS.primary} />
            </View>

            <Text style={styles.changeText}>Change order type</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* SOCIAL LINKS */}
          <SocialItem
            label="Instagram"
            icon="instagram"
            onPress={() => handleSocialPress("https://www.instagram.com/")}
          />

          <SocialItem
            label="Facebook"
            icon="facebook"
            onPress={() => handleSocialPress("https://www.facebook.com/")}
          />

          <SocialItem
            label="TikTok"
            icon="tiktok"
            onPress={() => handleSocialPress("https://www.tiktok.com/")}
          />
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>Drinkly · Warszawa · 2026</Text>
      </View>
    </View>
  );
}

/*
 * Drawer menu item
 */
function DrawerMenuItem({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: IconName;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={styles.menuItem}
    >
      <View style={styles.menuIconBox}>
        <Icon name={icon} size={19} color={COLORS.white} />
      </View>

      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

/*
 * Social link item
 */
function SocialItem({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: IconName;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.socialItem}
    >
      <View style={styles.socialIcon}>
        <Icon name={icon} size={17} color="#D7E0D8" />
      </View>

      <Text style={styles.socialText}>{label}</Text>
    </TouchableOpacity>
  );
}

/*
 * Café adapter
 *
 * Allows the Café screen to close the drawer
 * and return to the main tabs.
 */
function CafeScreenAdapter() {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  return <CafeScreen onBack={() => navigation.navigate("MainTabs")} />;
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },

  drawer: {
    height: "100%",
    backgroundColor: COLORS.primary,
    paddingTop: 48,
    paddingBottom: 22,
  },

  logoRow: {
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoBlock: {
    flexDirection: "column",
    alignItems: "baseline",
    flexShrink: 1,
  },

  logo: {
    color: COLORS.white,
    fontFamily: "DM Serif Display",
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 44,
  },

  logoSubtitle: {
    marginLeft: 7,
    color: "rgba(255,255,255,0.82)",
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },

  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  location: {
    marginHorizontal: 12,
    marginTop: 18,
    marginBottom: 18,
    padding: 11,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.16)",
  },

  locationLabel: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 8,
    marginBottom: 3,
    letterSpacing: 1,
  },

  locationValue: {
    color: COLORS.white,
    fontSize: 10,
  },

  navigation: {
    paddingHorizontal: 9,
    flex: 1,
  },

  menuItem: {
    height: 42,
    borderRadius: 6,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },

  menuIconBox: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  menuText: {
    marginLeft: 9,
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,
  },

  changeButton: {
    height: 40,
    borderRadius: 6,
    paddingHorizontal: 9,
    backgroundColor: "rgba(255,255,255,0.18)",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  changeIconBox: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  changeText: {
    marginLeft: 9,
    color: COLORS.white,
    fontSize: 10,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 13,
  },

  socialItem: {
    height: 36,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignItems: "center",
  },

  socialIcon: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  socialText: {
    marginLeft: 9,
    color: "#D7E0D8",
    fontSize: 10,
  },

  footer: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 8,
    textAlign: "center",
  },
});
