import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import StatusBar from "../components/StatusBar";
import Icon from "../components/Icon";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import DrinkCard from "../components/DrinkCard";
import BottomNavigation from "../components/BottomNavigation";

import { COLORS } from "../constants/colors";
import { categories, drinks } from "../data/drinks";

import { Category, Screen, Drink } from "../types";

interface HomeScreenProps {
  cartCount: number;
  onNavigate: (screen: Screen) => void;
  onMenuOpen: () => void;
  onDrinkSelect: (drink: Drink) => void;
}

export default function HomeScreen({
  cartCount,
  onNavigate,
  onMenuOpen,
  onDrinkSelect,
}: HomeScreenProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Coffee");

  const popular = useMemo(() => drinks.filter((drink) => drink.popular), []);

  const displayed = useMemo(() => {
    if (!search.trim()) {
      return popular;
    }

    const query = search.toLowerCase();

    return drinks.filter(
      (drink) =>
        drink.name.toLowerCase().includes(query) ||
        drink.description.toLowerCase().includes(query),
    );
  }, [search, popular]);

  return (
    <View style={styles.screen}>
      <StatusBar />

      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onMenuOpen}
          style={styles.iconButton}
        >
          <Icon name="menu" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.logo}>Drinkly</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onNavigate("cart")}
          style={styles.iconButton}
        >
          <Icon name="cart" size={18} color={COLORS.primary} />

          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>Good morning!</Text>
        <Text style={styles.greetingText}>What would you like today?</Text>
      </View>

      <SearchBar value={search} onChangeText={setSearch} />

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onChange={(category) => {
          setActiveCategory(category);
          onNavigate("menu");
        }}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {search ? "Search results" : "Popular"}
          </Text>

          {!search && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onNavigate("menu")}
            >
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.list}>
          {displayed.slice(0, 5).map((drink) => (
            <DrinkCard
              key={drink.id}
              drink={drink}
              onPress={() => onDrinkSelect(drink)}
            />
          ))}
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>

      <BottomNavigation
        activeScreen="home"
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

  header: {
    paddingHorizontal: 18,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconButton: {
    width: 34,
    height: 34,
    borderRadius: 5,
    backgroundColor: "#F7F8F6",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  logo: {
    color: COLORS.primary,
    fontSize: 21,
    fontWeight: "500",
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

  greeting: {
    paddingHorizontal: 18,
    paddingBottom: 12,
  },

  greetingTitle: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "500",
  },

  greetingText: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 3,
  },

  content: {
    paddingHorizontal: 18,
    paddingBottom: 90,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 9,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "600",
  },

  seeAll: {
    color: COLORS.primary,
    fontSize: 9,
    fontWeight: "500",
  },

  list: {
    gap: 7,
  },

  bottomSpace: {
    height: 70,
  },
});
