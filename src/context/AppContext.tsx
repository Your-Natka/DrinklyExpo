import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import {
  CartItem,
  Drink,
  DrinkOptions,
  OrderMode,
  PaymentMethod,
} from "../types";

import { buildOptionLabel } from "../utils/options";

interface AppContextValue {
  orderMode: OrderMode;
  paymentMethod: PaymentMethod;
  selectedDrink: Drink | null;
  cart: CartItem[];
  favorites: string[];

  cartCount: number;

  setOrderMode: (mode: OrderMode) => void;
  setPaymentMethod: (method: PaymentMethod) => void;

  selectDrink: (drink: Drink) => void;

  addToCart: (drink: Drink, options: DrinkOptions, quantity: number) => void;

  updateQuantity: (index: number, quantity: number) => void;
  removeFromCart: (index: number) => void;

  toggleFavorite: (drinkId: string) => void;

  clearCart: () => void;
  resetOrder: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [orderMode, setOrderMode] = useState<OrderMode>("dine-in");

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const [selectedDrink, setSelectedDrink] = useState<Drink | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);

  const [favorites, setFavorites] = useState<string[]>([]);

  const selectDrink = (drink: Drink) => {
    setSelectedDrink(drink);
  };

  const addToCart = (drink: Drink, options: DrinkOptions, quantity: number) => {
    const item: CartItem = {
      id: `${drink.id}-${Date.now()}`,
      drink,
      quantity,
      options,
      optionLabel: buildOptionLabel(drink, options),
    };

    setCart((current) => [...current, item]);
  };

  const updateQuantity = (index: number, quantity: number) => {
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

  const removeFromCart = (index: number) => {
    setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const toggleFavorite = (drinkId: string) => {
    setFavorites((current) =>
      current.includes(drinkId)
        ? current.filter((id) => id !== drinkId)
        : [...current, drinkId],
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const resetOrder = () => {
    setCart([]);
    setSelectedDrink(null);
    setPaymentMethod("card");
    setOrderMode("dine-in");
    setFavorites([]);
  };

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const value = useMemo<AppContextValue>(
    () => ({
      orderMode,
      paymentMethod,
      selectedDrink,
      cart,
      favorites,
      cartCount,

      setOrderMode,
      setPaymentMethod,

      selectDrink,
      addToCart,

      updateQuantity,
      removeFromCart,

      toggleFavorite,

      clearCart,
      resetOrder,
    }),
    [orderMode, paymentMethod, selectedDrink, cart, favorites, cartCount],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}
