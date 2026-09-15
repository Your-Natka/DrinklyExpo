import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";

import Icon from "./Icon";
import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  backButtonStyle?: StyleProp<ViewStyle>;
  onCart?: () => void;
  cartCount?: number;
  showCart?: boolean;
  isLogo?: boolean;
}

export default function Header({
  title,
  onBack,
  backButtonStyle,
  onCart,
  cartCount = 0,
  showCart = false,
  isLogo = false,
}: HeaderProps) {
  const { width } = useWindowDimensions();

  const horizontalPadding =
    width <= 340 ? 14 : dimensions.layout.horizontalPadding;

  return (
    <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
      <View style={styles.left}>
        {onBack && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onBack}
            style={[styles.sideButton, backButtonStyle]}
          >
            <Icon name="back" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={isLogo ? styles.logo : styles.title} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.right}>
        {showCart && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onCart}
            style={styles.sideButton}
          >
            <Icon name="cart" size={20} color={COLORS.primary} />

            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },

  left: {
    width: dimensions.buttons.icon,
    alignItems: "flex-start",
  },

  right: {
    width: dimensions.buttons.icon,
    alignItems: "flex-end",
  },

  sideButton: {
    width: dimensions.buttons.icon,
    height: dimensions.buttons.icon,
    borderRadius: 5,
    backgroundColor: "#F7F8F6",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  logo: {
    flex: 1,
    minWidth: 0,
    textAlign: "center",
    color: COLORS.primary,
    fontFamily: "DM Serif Display",
    fontSize: 40,
    fontWeight: "400",
    lineHeight: 44,
  },

  title: {
    flex: 1,
    minWidth: 0,
    textAlign: "center",
    color: COLORS.primary,
    fontSize: dimensions.typography.sectionTitle,
    fontWeight: "500",
    lineHeight: 24,
  },

  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: COLORS.white,
    fontSize: dimensions.typography.tiny,
    fontWeight: "700",
    textAlign: "center",
  },
});
