import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants/colors";

export type IconName =
  | "menu"
  | "cart"
  | "back"
  | "search"
  | "plus"
  | "minus"
  | "close"
  | "check"
  | "trash"
  | "heart"
  | "home"
  | "coffee"
  | "location"
  | "profile";

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export default function Icon({
  name,
  size = 20,
  color = COLORS.primary,
}: IconProps) {
  if (name === "menu") {
    return (
      <View style={styles.menu}>
        <View
          style={[
            styles.menuLine,
            {
              width: size * 0.8,
              backgroundColor: color,
            },
          ]}
        />
        <View
          style={[
            styles.menuLine,
            {
              width: size * 0.55,
              backgroundColor: color,
            },
          ]}
        />
        <View
          style={[
            styles.menuLine,
            {
              width: size * 0.7,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    );
  }

  if (name === "plus") {
    return (
      <View style={{ width: size, height: size }}>
        <View
          style={[
            styles.plusHorizontal,
            {
              width: size * 0.65,
              backgroundColor: color,
            },
          ]}
        />

        <View
          style={[
            styles.plusVertical,
            {
              height: size * 0.65,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    );
  }

  if (name === "minus") {
    return (
      <View style={{ width: size, height: size }}>
        <View
          style={[
            styles.minus,
            {
              width: size * 0.65,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    );
  }

  if (name === "back") {
    return (
      <Text
        style={{
          color,
          fontSize: size * 1.35,
          lineHeight: size * 1.2,
          fontWeight: "300",
        }}
      >
        ‹
      </Text>
    );
  }

  if (name === "close") {
    return (
      <Text
        style={{
          color,
          fontSize: size * 1.15,
          lineHeight: size,
          fontWeight: "300",
        }}
      >
        ×
      </Text>
    );
  }

  if (name === "check") {
    return (
      <Text
        style={{
          color,
          fontSize: size,
          fontWeight: "500",
        }}
      >
        ✓
      </Text>
    );
  }

  if (name === "heart") {
    return (
      <Text
        style={{
          color,
          fontSize: size,
        }}
      >
        ♡
      </Text>
    );
  }

  if (name === "search") {
    return (
      <View
        style={[
          styles.search,
          {
            width: size * 0.65,
            height: size * 0.65,
            borderColor: color,
          },
        ]}
      >
        <View
          style={[
            styles.searchHandle,
            {
              width: size * 0.4,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    );
  }

  if (name === "trash") {
    return (
      <View
        style={[
          styles.trash,
          {
            width: size * 0.65,
            height: size * 0.75,
            borderColor: color,
          },
        ]}
      >
        <View
          style={[
            styles.trashTop,
            {
              width: size * 0.8,
              backgroundColor: color,
            },
          ]}
        />

        <View
          style={[
            styles.trashHandle,
            {
              width: size * 0.3,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    );
  }

  if (name === "home") {
    return (
      <Text
        style={{
          color,
          fontSize: size,
        }}
      >
        ⌂
      </Text>
    );
  }

  if (name === "coffee") {
    return (
      <Text
        style={{
          color,
          fontSize: size,
        }}
      >
        ☕
      </Text>
    );
  }

  if (name === "location") {
    return (
      <Text
        style={{
          color,
          fontSize: size,
        }}
      >
        ●
      </Text>
    );
  }

  if (name === "profile") {
    return (
      <Text
        style={{
          color,
          fontSize: size,
        }}
      >
        ●
      </Text>
    );
  }

  return (
    <Text
      style={{
        color,
        fontSize: size,
      }}
    >
      🛒
    </Text>
  );
}

const styles = StyleSheet.create({
  menu: {
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 4,
  },

  menuLine: {
    height: 2,
    borderRadius: 2,
  },

  plusHorizontal: {
    position: "absolute",
    top: "50%",
    left: "17.5%",
    height: 2,
    borderRadius: 2,
  },

  plusVertical: {
    position: "absolute",
    left: "50%",
    top: "17.5%",
    width: 2,
    borderRadius: 2,
  },

  minus: {
    position: "absolute",
    top: "50%",
    left: "17.5%",
    height: 2,
    borderRadius: 2,
  },

  search: {
    borderWidth: 1.7,
    borderRadius: 50,
    position: "relative",
  },

  searchHandle: {
    height: 1.7,
    position: "absolute",
    right: -5,
    bottom: -2,
    transform: [{ rotate: "45deg" }],
  },

  trash: {
    borderWidth: 1.5,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 2,
  },

  trashTop: {
    position: "absolute",
    top: -3,
    height: 1.5,
    borderRadius: 1,
  },

  trashHandle: {
    position: "absolute",
    top: -5,
    height: 1.5,
    borderRadius: 1,
  },
});
