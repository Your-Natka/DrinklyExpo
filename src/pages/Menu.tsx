import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import StatusBar from "../components/StatusBar";
import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import MenuCard from "../components/MenuCard";
import BottomNavigation from "../components/BottomNavigation";

import { COLORS } from "../constants/colors";
import { drinks, menuCategories } from "../data/drinks";
import { Drink, MenuCategory, Screen } from "../types";

interface MenuScreenProps {
  onBack: () => void;
  cartCount: number;
  onNavigate: (screen: Screen) => void;
  onDrinkSelect: (drink: Drink) => void;
}

export default function MenuScreen({
  onBack,
  cartCount,
  onNavigate,
  onDrinkSelect,
}: MenuScreenProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("All");

  const listed = useMemo(() => {
    return drinks.filter((drink) => {
      if (activeCategory === "All") {
        return true;
      }

      if (activeCategory === "Coffee") {
        return drink.category === "Coffee";
      }

      if (activeCategory === "Tea") {
        return drink.category === "Tea";
      }

      return drink.category !== "Coffee" && drink.category !== "Tea";
    });
  }, [activeCategory]);

  return (
    <View style={styles.screen}>
      <StatusBar />

      <Header
        title="Hot Drinks"
        onBack={onBack}
        showCart
        cartCount={cartCount}
        onCart={() => onNavigate("cart")}
      />

      <CategoryTabs
        categories={menuCategories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.list}>
          {listed.map((drink) => (
            <MenuCard
              key={drink.id}
              drink={drink}
              onPress={() => onDrinkSelect(drink)}
            />
          ))}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <BottomNavigation
        activeScreen="menu"
        cartCount={cartCount}
        onNavigate={onNavigate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 90,
  },

  list: {
    gap: 7,
  },

  bottomSpace: {
    height: 70,
  },
});
