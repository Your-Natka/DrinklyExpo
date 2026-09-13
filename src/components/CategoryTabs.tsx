import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

import { COLORS } from "../constants/colors";

interface CategoryTabsProps<T extends string> {
  categories: T[];
  activeCategory: T;
  onChange: (category: T) => void;
}

export default function CategoryTabs<T extends string>({
  categories,
  activeCategory,
  onChange,
}: CategoryTabsProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
      style={styles.scroll}
    >
      {categories.map((category) => {
        const active = category === activeCategory;

        return (
          <TouchableOpacity
            key={category}
            activeOpacity={0.8}
            onPress={() => onChange(category)}
            style={[styles.button, active && styles.activeButton]}
          >
            <Text style={[styles.text, active && styles.activeText]}>
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    marginBottom: 12,
  },

  content: {
    paddingHorizontal: 18,
    gap: 7,
  },

  button: {
    minHeight: 27,
    paddingHorizontal: 11,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.categoryBackground,
  },

  activeButton: {
    backgroundColor: COLORS.primary,
  },

  text: {
    color: COLORS.text,
    fontSize: 9,
    fontWeight: "500",
  },

  activeText: {
    color: COLORS.white,
  },
});
