import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Button from "../components/Button";
import { PaymentMethod } from "../types";

interface PaymentMethodScreenProps {
  selectedMethod?: PaymentMethod;
  onBack: () => void;
  onContinue: (method: PaymentMethod) => void;
}

export default function PaymentMethodScreen({
  selectedMethod = "card",
  onBack,
  onContinue,
}: PaymentMethodScreenProps) {
  const [method, setMethod] = useState<PaymentMethod>(selectedMethod);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Payment method</Text>

        <View style={styles.spacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Choose how you would like to pay for your order.
        </Text>

        <PaymentOption
          title="Card"
          description="Pay by debit or credit card"
          active={method === "card"}
          icon="💳"
          onPress={() => setMethod("card")}
        />

        <PaymentOption
          title="Cash"
          description="Pay at the café"
          active={method === "cash"}
          icon="💵"
          onPress={() => setMethod("cash")}
        />
      </View>

      <View style={styles.bottom}>
        <Button title="Continue" onPress={() => onContinue(method)} />
      </View>
    </View>
  );
}

function PaymentOption({
  title,
  description,
  active,
  icon,
  onPress,
}: {
  title: string;
  description: string;
  active: boolean;
  icon: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.option, active && styles.optionActive]}
    >
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <View style={styles.optionText}>
        <Text style={styles.optionTitle}>{title}</Text>

        <Text style={styles.optionDescription}>{description}</Text>
      </View>

      <View style={[styles.radio, active && styles.radioActive]}>
        {active && <View style={styles.radioInner} />}
      </View>
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

  description: {
    fontSize: 11,
    color: "#8A9891",
    marginBottom: 18,
  },

  option: {
    minHeight: 76,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#B9C9C0",
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
  },

  optionActive: {
    borderColor: "#557968",
    backgroundColor: "#E5ECE7",
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 6,
    backgroundColor: "#E5ECE7",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 21,
  },

  optionText: {
    flex: 1,
    marginLeft: 11,
  },

  optionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#456456",
  },

  optionDescription: {
    marginTop: 3,
    fontSize: 9,
    color: "#8A9891",
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#8A9891",
    alignItems: "center",
    justifyContent: "center",
  },

  radioActive: {
    borderColor: "#557968",
  },

  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#557968",
  },

  bottom: {
    marginTop: "auto",
    padding: 18,
    paddingBottom: 24,
  },
});
