import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Icon from "./Icon";

import { COLORS } from "../constants/colors";

interface HeaderProps {
  title: string;
  onBack?: () => void;
  onCart?: () => void;
  cartCount?: number;
  showCart?: boolean;
}

export default function Header({
  title,
  onBack,
  onCart,
  cartCount = 0,
  showCart = false,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onBack}
        disabled={!onBack}
        style={styles.sideButton}
      >
        {onBack && <Icon name="back" size={20} color={COLORS.primary} />}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onCart}
        disabled={!showCart}
        style={styles.sideButton}
      >
        {showCart && (
          <>
            <Icon name="cart" size={18} color={COLORS.primary} />

            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  sideButton: {
    width: 34,
    height: 34,
    borderRadius: 5,
    backgroundColor: "#F7F8F6",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  title: {
    flex: 1,
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 19,
    fontWeight: "400",
  },

  badge: {
    position: "absolute",
    right: -5,
    top: -5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "700",
  },
});
