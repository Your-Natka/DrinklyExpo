import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import StatusBar from "../components/StatusBar";
import { COLORS } from "../constants/colors";
import { OrderMode } from "../types";

interface WelcomeScreenProps {
  onChoose: (mode: OrderMode) => void;
}

export default function WelcomeScreen({ onChoose }: WelcomeScreenProps) {
  const { width } = useWindowDimensions();

  const horizontalMargin = 10;
  const heroWidth = width - horizontalMargin * 2;

  return (
    <View style={styles.screen}>
      <StatusBar />

      <Image
        source={require("../../assets/images/Welcome.png")}
        style={[
          styles.hero,
          {
            width: heroWidth,
            height: heroWidth * 0.78,
          },
        ]}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.titleBlock}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.logo}>Drinkly</Text>
          <Text style={styles.subtitle}>Café & Bar</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChoose("dine-in")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Dine in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onChoose("takeaway")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Take away</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.location}>● Coffee Street 12, Łódź</Text>
      </View>

      <View style={styles.indicator} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  heroContainer: {
    width: "100%",
    maxWidth: 360,
    alignSelf: "center",
    overflow: "hidden",
    borderRadius: 7,
  },

  hero: {
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 7,
    overflow: "hidden",
    height: 260,
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
  },

  titleBlock: {
    alignItems: "center",
  },

  welcome: {
    color: COLORS.primary,
    fontSize: 21,
    lineHeight: 23,
  },

  logo: {
    color: COLORS.primary,
    fontSize: 29,
    fontWeight: "500",
    marginTop: 1,
  },

  subtitle: {
    color: COLORS.primary,
    fontSize: 10,
    letterSpacing: 0.5,
    marginTop: 5,
  },

  buttons: {
    width: "100%",
    flexDirection: "row",
    gap: 10,
    marginTop: "auto",
  },

  button: {
    flex: 1,
    height: 43,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "500",
  },

  location: {
    color: COLORS.muted,
    fontSize: 9,
    marginTop: 12,
  },

  indicator: {
    position: "absolute",
    bottom: 7,
    alignSelf: "center",
    width: 105,
    height: 4,
    borderRadius: 999,
    backgroundColor: "rgba(65,91,80,0.3)",
  },
});
