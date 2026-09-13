import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CafeLink from "../components/CafeLink";
import { COLORS } from "../constants/colors";
import { dimensions } from "../constants/dimensions";

interface CafeScreenProps {
  onBack: () => void;
}

export default function CafeScreen({ onBack }: CafeScreenProps) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onBack}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Café</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=700&h=400&fit=crop&auto=format",
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.cafeName}>Drinkly Café</Text>

          <Text style={styles.address}>Coffee Street 12, Łódź</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Opening hours</Text>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Mon – Fri</Text>
              <Text style={styles.rowValue}>7:00 – 20:00</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Saturday</Text>
              <Text style={styles.rowValue}>8:00 – 21:00</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.rowLabel}>Sunday</Text>
              <Text style={styles.rowValue}>9:00 – 18:00</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Follow us</Text>

            <CafeLink
              icon={<Text style={styles.socialIcon}>◎</Text>}
              label="@drinkly.cafe"
              sublabel="Instagram"
            />

            <CafeLink
              icon={<Text style={styles.socialIcon}>f</Text>}
              label="Drinkly Café"
              sublabel="Facebook"
            />

            <CafeLink
              icon={<Text style={styles.socialIcon}>♪</Text>}
              label="@drinkly"
              sublabel="TikTok"
              last
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.homeIndicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  header: {
    height: 48,
    paddingHorizontal: 14,
    alignItems: "center",
    flexDirection: "row",
  },

  backButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  backIcon: {
    color: COLORS.primary,
    fontSize: 25,
    lineHeight: 28,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 19,
    fontWeight: "500",
  },

  headerSpacer: {
    width: 30,
  },

  scrollContent: {
    paddingBottom: 30,
  },

  imageContainer: {
    height: 150,
    marginHorizontal: 14,
    borderRadius: dimensions.cards.radius,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  info: {
    paddingHorizontal: 14,
    paddingTop: 13,
  },

  cafeName: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 3,
  },

  address: {
    color: COLORS.muted,
    fontSize: 9,
    marginBottom: 15,
  },

  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: dimensions.cards.radius,
    padding: 11,
    marginBottom: 9,
  },

  cardTitle: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  rowLabel: {
    color: COLORS.textSecondary,
    fontSize: 9,
  },

  rowValue: {
    color: COLORS.textSecondary,
    fontSize: 9,
  },

  socialIcon: {
    fontSize: 15,
    color: COLORS.primary,
  },

  homeIndicator: {
    width: 100,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.text,
    alignSelf: "center",
    marginBottom: 8,
    opacity: 0.25,
  },
});
