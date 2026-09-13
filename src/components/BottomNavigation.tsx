import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Icon from "./Icon";

import { COLORS } from "../constants/colors";
import { Screen } from "../types";

interface BottomNavigationProps {
  activeScreen: Screen;
  cartCount: number;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNavigation({
  activeScreen,
  cartCount,
  onNavigate,
}: BottomNavigationProps) {
  const items = [
    {
      screen: "home" as Screen,
      label: "Home",
      icon: "home" as const,
    },
    {
      screen: "menu" as Screen,
      label: "Menu",
      icon: "coffee" as const,
    },
    {
      screen: "cart" as Screen,
      label: "Cart",
      icon: "cart" as const,
    },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const active = activeScreen === item.screen;

        return (
          <TouchableOpacity
            key={item.screen}
            activeOpacity={0.8}
            onPress={() => onNavigate(item.screen)}
            style={styles.item}
          >
            <View style={styles.iconWrapper}>
              <Icon
                name={item.icon}
                size={17}
                color={active ? COLORS.primary : COLORS.muted}
              />

              {item.screen === "cart" && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>

            <Text
              style={[
                styles.label,
                {
                  color: active ? COLORS.primary : COLORS.muted,
                },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 61,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: "#E6EBE7",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 5,
  },

  item: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapper: {
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  label: {
    fontSize: 8,
    marginTop: 2,
  },

  badge: {
    position: "absolute",
    right: -6,
    top: -5,
    minWidth: 13,
    height: 13,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: COLORS.white,
    fontSize: 7,
    fontWeight: "700",
  },
});
