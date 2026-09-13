import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import Button from "../components/Button";
import { CartItem, OrderMode } from "../types";
import { getCartItemTotal } from "../utils/price";

interface CartScreenProps {
  items: CartItem[];
  mode: OrderMode;
  onBack: () => void;
  onCheckout: () => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemove: (index: number) => void;
}

export default function CartScreen({
  items,
  mode,
  onBack,
  onCheckout,
  onUpdateQuantity,
  onRemove,
}: CartScreenProps) {
  const { width } = useWindowDimensions();

  const horizontalPadding = Math.max(14, width * 0.04);

  const subtotal = items.reduce(
    (sum, item) =>
      sum + getCartItemTotal(item.drink, item.options, item.quantity),
    0,
  );

  const fee = mode === "takeaway" ? 0.5 : 0;
  const total = subtotal + fee;

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingHorizontal: horizontalPadding }]}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <Text style={styles.backText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Cart</Text>

        <View style={styles.headerSpacer} />
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>

          <Text style={styles.emptyTitle}>Your cart is empty</Text>

          <Text style={styles.emptyText}>Add a drink from the menu</Text>

          <Button
            title="Back to menu"
            onPress={onBack}
            style={styles.emptyButton}
          />
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.list,
              {
                paddingHorizontal: horizontalPadding,
              },
            ]}
          >
            {items.map((item, index) => (
              <CartItemCard
                key={`${item.id}-${index}`}
                item={item}
                onIncrease={() => onUpdateQuantity(index, item.quantity + 1)}
                onDecrease={() => onUpdateQuantity(index, item.quantity - 1)}
                onRemove={() => onRemove(index)}
              />
            ))}
          </ScrollView>

          <View style={styles.summary}>
            <SummaryRow label="Subtotal" value={`€${subtotal.toFixed(2)}`} />

            {fee > 0 && (
              <SummaryRow label="Takeaway" value={`€${fee.toFixed(2)}`} />
            )}

            <SummaryRow label="Total" value={`€${total.toFixed(2)}`} bold />

            <Button
              title="Checkout"
              onPress={onCheckout}
              style={styles.checkoutButton}
            />
          </View>
        </>
      )}
    </View>
  );
}

interface CartItemCardProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  const price = getCartItemTotal(item.drink, item.options, item.quantity);

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.drink.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.drinkName}>{item.drink.name}</Text>

        <Text style={styles.options}>{item.optionLabel}</Text>

        <Text style={styles.price}>€{price.toFixed(2)}</Text>

        <View style={styles.controls}>
          <TouchableOpacity onPress={onDecrease} style={styles.controlButton}>
            <Text style={styles.controlText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={onIncrease}
            style={[styles.controlButton, styles.plusButton]}
          >
            <Text style={[styles.controlText, styles.plusText]}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Text style={styles.removeText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function SummaryRow({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, bold && styles.totalLabel]}>
        {label}
      </Text>

      <Text style={[styles.summaryValue, bold && styles.totalValue]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F6",
  },

  header: {
    height: 76,
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
    lineHeight: 30,
    color: "#557968",
  },

  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#557968",
  },

  headerSpacer: {
    width: 34,
  },

  list: {
    paddingBottom: 180,
    gap: 10,
  },

  card: {
    minHeight: 94,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#B9C9C0",
    borderRadius: 7,
    padding: 7,
    flexDirection: "row",
  },

  image: {
    width: 76,
    height: 78,
    borderRadius: 5,
    backgroundColor: "#E2E7E3",
  },

  info: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },

  drinkName: {
    fontSize: 13,
    fontWeight: "500",
    color: "#456456",
  },

  options: {
    marginTop: 3,
    fontSize: 9,
    color: "#8A9891",
  },

  price: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#557968",
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  controlButton: {
    width: 27,
    height: 27,
    borderRadius: 5,
    backgroundColor: "#E5ECE7",
    alignItems: "center",
    justifyContent: "center",
  },

  plusButton: {
    backgroundColor: "#557968",
  },

  controlText: {
    fontSize: 18,
    color: "#557968",
    lineHeight: 20,
  },

  plusText: {
    color: "#FFFFFF",
  },

  quantity: {
    width: 30,
    textAlign: "center",
    fontSize: 11,
    color: "#456456",
  },

  removeButton: {
    marginLeft: 10,
    width: 27,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
  },

  removeText: {
    fontSize: 20,
    color: "#8A9891",
  },

  summary: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#B9C9C0",
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 24,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  summaryLabel: {
    fontSize: 11,
    color: "#8A9891",
  },

  summaryValue: {
    fontSize: 11,
    color: "#456456",
    fontWeight: "500",
  },

  totalLabel: {
    fontSize: 15,
    color: "#456456",
    fontWeight: "600",
  },

  totalValue: {
    fontSize: 16,
    color: "#557968",
    fontWeight: "700",
  },

  checkoutButton: {
    marginTop: 9,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  emptyIcon: {
    fontSize: 40,
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#456456",
  },

  emptyText: {
    marginTop: 6,
    fontSize: 11,
    color: "#8A9891",
  },

  emptyButton: {
    width: "100%",
    marginTop: 24,
  },
});
