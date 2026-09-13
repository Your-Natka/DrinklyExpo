import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { Screen } from "../types";

interface BurgerMenuScreenProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screen: Screen) => void;
  onStartOver: () => void;
}

interface MenuItem {
  label: string;
  icon: string;
  screen: Screen;
}

const menuItems: MenuItem[] = [
  {
    label: "Home",
    icon: "⌂",
    screen: "home",
  },
  {
    label: "Menu",
    icon: "☕",
    screen: "menu",
  },
  {
    label: "My Order",
    icon: "🛒",
    screen: "cart",
  },
  {
    label: "Café",
    icon: "📍",
    screen: "cafe",
  },
];

export default function BurgerMenuScreen({
  visible,
  onClose,
  onNavigate,
  onStartOver,
}: BurgerMenuScreenProps) {
  const { width } = useWindowDimensions();

  if (!visible) {
    return null;
  }

  const drawerWidth = Math.min(width * 0.74, 310);

  return (
    <View style={styles.overlay}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={styles.overlayTouchable}
      />

      <View style={[styles.drawer, { width: drawerWidth }]}>
        <View style={styles.logoRow}>
          <Text style={styles.logo}>Drinkly</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.location}>
          <Text style={styles.locationLabel}>LOCATION</Text>

          <Text style={styles.locationValue}>Coffee Street 12, Łódź</Text>
        </View>

        <View style={styles.navigation}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.8}
              onPress={() => {
                onNavigate(item.screen);
                onClose();
              }}
              style={styles.menuItem}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>

              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              onStartOver();
              onClose();
            }}
            style={styles.changeButton}
          >
            <Text style={styles.changeIcon}>↻</Text>

            <Text style={styles.changeText}>Change order type</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <SocialItem icon="◎" label="Instagram" />

          <SocialItem icon="f" label="Facebook" />

          <SocialItem icon="♪" label="TikTok" />
        </View>

        <Text style={styles.footer}>Drinkly · Łódź · 2026</Text>
      </View>
    </View>
  );
}

function SocialItem({ icon, label }: { icon: string; label: string }) {
  return (
    <TouchableOpacity style={styles.socialItem} activeOpacity={0.8}>
      <Text style={styles.socialIcon}>{icon}</Text>

      <Text style={styles.socialText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 100,
    flexDirection: "row",
  },

  overlayTouchable: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  drawer: {
    height: "100%",
    backgroundColor: "#557968",
    paddingTop: 48,
    paddingBottom: 22,
    zIndex: 101,
  },

  logoRow: {
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "500",
  },

  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  closeText: {
    color: "#FFFFFF",
    fontSize: 24,
    lineHeight: 25,
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
    color: "#FFFFFF",
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

  menuIcon: {
    width: 24,
    color: "#FFFFFF",
    fontSize: 17,
    textAlign: "center",
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

  changeIcon: {
    width: 24,
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },

  changeText: {
    marginLeft: 9,
    color: "#FFFFFF",
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
    color: "rgba(255,255,255,0.72)",
    fontSize: 15,
    textAlign: "center",
  },

  socialText: {
    marginLeft: 9,
    color: "rgba(255,255,255,0.72)",
    fontSize: 10,
  },

  footer: {
    color: "rgba(255,255,255,0.3)",
    fontSize: 8,
    textAlign: "center",
  },
});
