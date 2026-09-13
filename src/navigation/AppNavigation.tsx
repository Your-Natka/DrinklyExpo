import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

import {
  CartItem,
  Drink,
  DrinkOptions,
  OrderMode,
  PaymentMethod,
  Screen,
} from "../types";

import { buildOptionLabel } from "../utils/options";

import WelcomeScreen from "../pages/Welcome";
import HomeScreen from "../pages/Home";
import MenuScreen from "../pages/Menu";
import DrinkDetailsScreen from "../pages/DrinkDetails";
import CartScreen from "../pages/Cart";
import CheckoutScreen from "../pages/Checkout";
import PaymentMethodScreen from "../pages/PaymentMethod";
import CafeScreen from "../pages/Cafe";
import OrderConfirmationScreen from "../pages/OrderConfirmation";
import BurgerMenuScreen from "../pages/BurgerMenu";

export default function AppNavigation() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [orderMode, setOrderMode] = useState<OrderMode>("dine-in");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [burgerOpen, setBurgerOpen] = useState(false);

  const previousScreen = useRef<Screen>("welcome");

  const navigate = (nextScreen: Screen) => {
    previousScreen.current = screen;
    setScreen(nextScreen);
    setBurgerOpen(false);
  };

  const handleChooseMode = (mode: OrderMode) => {
    setOrderMode(mode);
    navigate("home");
  };

  const handleDrinkSelect = (drink: Drink) => {
    setSelectedDrink(drink);
    navigate("detail");
  };

  const handleAddToCart = (
    drink: Drink,
    options: DrinkOptions,
    quantity: number,
  ) => {
    const item: CartItem = {
      id: `${drink.id}-${Date.now()}`,
      drink,
      quantity,
      options,
      optionLabel: buildOptionLabel(drink, options),
    };

    setCart((current) => [...current, item]);
    navigate("cart");
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((current) =>
        current.filter((_, itemIndex) => itemIndex !== index),
      );
      return;
    }

    setCart((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemove = (index: number) => {
    setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleConfirmOrder = (method: PaymentMethod) => {
    setPaymentMethod(method);
    navigate("confirmation");
  };

  const handleBackHome = () => {
    setCart([]);
    setSelectedDrink(null);
    navigate("home");
  };

  const handleStartOver = () => {
    setCart([]);
    setSelectedDrink(null);
    setPaymentMethod("card");
    setOrderMode("dine-in");
    setScreen("welcome");
    setBurgerOpen(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.container}>
      {screen === "welcome" && <WelcomeScreen onChoose={handleChooseMode} />}

      {screen === "home" && (
        <HomeScreen
          cartCount={cartCount}
          onNavigate={navigate}
          onMenuOpen={() => setBurgerOpen(true)}
          onDrinkSelect={handleDrinkSelect}
        />
      )}

      {screen === "menu" && (
        <MenuScreen
          cartCount={cartCount}
          onBack={() => navigate("home")}
          onNavigate={navigate}
          onDrinkSelect={handleDrinkSelect}
        />
      )}

      {screen === "detail" && selectedDrink && (
        <DrinkDetailsScreen
          drink={selectedDrink}
          onBack={() =>
            navigate(
              previousScreen.current === "detail"
                ? "menu"
                : previousScreen.current,
            )
          }
          onAddToCart={handleAddToCart}
        />
      )}

      {screen === "cart" && (
        <CartScreen
          items={cart}
          mode={orderMode}
          onBack={() => navigate("home")}
          onCheckout={() => navigate("checkout")}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemove}
        />
      )}

      {screen === "checkout" && (
        <CheckoutScreen
          items={cart}
          mode={orderMode}
          onBack={() => navigate("cart")}
          onConfirm={handleConfirmOrder}
        />
      )}

      {screen === "payment" && (
        <PaymentMethodScreen
          selectedMethod={paymentMethod}
          onBack={() => navigate("checkout")}
          onContinue={(method) => {
            setPaymentMethod(method);
            navigate("checkout");
          }}
        />
      )}

      {screen === "confirmation" && (
        <OrderConfirmationScreen onHome={handleBackHome} />
      )}
      {screen === "cafe" && <CafeScreen onBack={() => navigate("home")} />}

      <BurgerMenuScreen
        visible={burgerOpen}
        onClose={() => setBurgerOpen(false)}
        onNavigate={navigate}
        onStartOver={handleStartOver}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
