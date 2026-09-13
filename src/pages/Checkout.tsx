import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "../components/Button";
import { CartItem, OrderMode, PaymentMethod } from "../types";
import { getCartItemTotal } from "../utils/price";

interface CheckoutScreenProps {
  items: CartItem[];
  mode: OrderMode;
  onBack: () => void;
  onConfirm: (paymentMethod: PaymentMethod) => void;
}

export default function CheckoutScreen({
  items,
  mode,
  onBack,
  onConfirm,
}: CheckoutScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const subtotal = items.reduce(
    (sum, item) =>
      sum + getCartItemTotal(item.drink, item.options, item.quantity),
    0,
  );

  const fee = mode === "takeaway" ? 0.5 : 0;

  const total = subtotal + fee;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Checkout</Text>

        <View style={styles.spacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Delivery method</Text>

        <View style={styles.row}>
          <ChoiceButton
            label="Pick up"
            active={mode === "dine-in"}
            onPress={() => {}}
          />

          <ChoiceButton
            label="Takeaway"
            active={mode === "takeaway"}
            onPress={() => {}}
          />
        </View>

        <Text style={styles.sectionTitle}>Pickup location</Text>

        <View style={styles.locationCard}>
          <Text style={styles.locationIcon}>📍</Text>

          <View>
            <Text style={styles.locationTitle}>Coffee Street 12</Text>

            <Text style={styles.locationText}>Drinkly Café · Łódź</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment method</Text>

        <View style={styles.row}>
          <ChoiceButton
            label="Card"
            active={paymentMethod === "card"}
            onPress={() => setPaymentMethod("card")}
          />

          <ChoiceButton
            label="Cash"
            active={paymentMethod === "cash"}
            onPress={() => setPaymentMethod("cash")}
          />
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>

          <Text style={styles.totalValue}>€{total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Button title="Place order" onPress={() => onConfirm(paymentMethod)} />
      </View>
    </View>
  );
}

function ChoiceButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.choice, active && styles.choiceActive]}
    >
      <View style={[styles.radio, active && styles.radioActive]}>
        {active && <View style={styles.radioInner} />}
      </View>

      <Text style={[styles.choiceText, active && styles.choiceTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F6",
  },

  header: {
    height: 76,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 28,
    color: "#557968",
  },

  title: {
    fontSize: 20,
    color: "#557968",
    fontWeight: "500",
  },

  spacer: {
    width: 34,
  },

  content: {
    paddingHorizontal: 18,
  },

  sectionTitle: {
    marginTop: 15,
    marginBottom: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#456456",
  },

  row: {
    flexDirection: "row",
    gap: 8,
  },

  choice: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderColor: "#B9C9C0",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  choiceActive: {
    borderColor: "#557968",
    backgroundColor: "#E5ECE7",
  },

  radio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#8A9891",
    alignItems: "center",
    justifyContent: "center",
  },

  radioActive: {
    borderColor: "#557968",
  },

  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#557968",
  },

  choiceText: {
    fontSize: 10,
    color: "#456456",
  },

  choiceTextActive: {
    color: "#557968",
    fontWeight: "600",
  },

  locationCard: {
    minHeight: 58,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EEF0ED",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  locationTitle: {
    fontSize: 11,
    color: "#456456",
    fontWeight: "500",
  },

  locationText: {
    marginTop: 2,
    fontSize: 9,
    color: "#8A9891",
  },

  totalRow: {
    marginTop: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#456456",
  },

  totalValue: {
    fontSize: 17,
    fontWeight: "700",
    color: "#557968",
  },

  bottom: {
    marginTop: "auto",
    padding: 18,
    paddingBottom: 24,
  },
});
