# Drinkly — React Native Drink Ordering App

A mobile-first drink ordering application built with React Native, Expo and TypeScript.

Drinkly allows users to browse drinks, search and filter the catalog, view drink details, customize their order, manage the cart, choose an order type and complete the checkout process.

## 📱 Preview

- Welcome
- Home
- Menu
- Drawer Menu
- Drink Details
- Cart
- Checkout
- Order Confirmation
- Café

## ✨ Features

- Welcome screen
- Dine-in and takeaway order types
- Home screen with popular drinks
- Drink categories
- Search drinks
- Drink details
- Drink customization
- Add drinks to cart
- Quantity controls
- Remove items from cart
- Checkout
- Payment method selection
- Order confirmation
- Café information
- Bottom navigation
- Drawer navigation
- Responsive mobile layout
- Navigation between screens with React Navigation
- Passing drink IDs through navigation parameters
- Validation of invalid or missing drink IDs

## 🧭 Navigation

The application uses **React Navigation** with three navigation types:

### Stack Navigator

The root stack controls the main application flow:

- `Welcome`
- `AppDrawer`
- `DrinkDetails`
- `Checkout`
- `Payment`
- `Confirmation`

### Drawer Navigator

The drawer provides access to:

- Home
- Menu
- My Order
- Café
- Change order type
- Social media links

The drawer keeps the original Drinkly visual design through a custom drawer content component.

### Tab Navigator

The main application uses a bottom tab structure:

- Home
- Menu
- Cart

The native tab bar is hidden because the application uses the custom `BottomNavigation` component for the visual interface.

The Café screen is available through the Drawer navigation.

### Navigation parameters

Drink details receive a `drinkId` parameter:

```tsx
navigation.navigate("DrinkDetails", {
  drinkId: drink.id,
});
```

The `DrinkDetails` screen validates the received ID and displays an error state if the drink does not exist.

Navigation screen names are stored in:

```text
src/constants/screens.ts
```

This provides reusable constants such as:

```tsx
SCREENS.HOME;
SCREENS.MENU;
SCREENS.CART;
SCREENS.DRINK_DETAILS;
SCREENS.CHECKOUT;
SCREENS.CAFE;
```

## 🛠️ Technologies

- React Native
- Expo
- TypeScript
- React Navigation
- React Navigation Native Stack
- React Navigation Bottom Tabs
- React Navigation Drawer
- React Hooks
- React Native StyleSheet
- Flexbox
- React Native Gesture Handler
- React Native Reanimated

## 🧩 Reusable Components

The application is built using reusable React Native components.

Examples:

- Header
- StatusBar
- Button
- DrinkCard
- MenuCard
- CartItem
- CategoryTabs
- SearchBar
- QuantityControl
- OptionButton
- CheckoutChoice
- SummaryRow
- BottomNavigation
- Icon

Components receive data and callbacks through props, which makes them reusable across different screens.

## 📂 Project Structure

```text
DrinklyExpo/
│
├── App.tsx
│
├── src/
│   │
│   ├── components/
│   │   ├── BottomNavigation.tsx
│   │   ├── Button.tsx
│   │   ├── CartItem.tsx
│   │   ├── CategoryTabs.tsx
│   │   ├── CheckoutChoice.tsx
│   │   ├── DrinkCard.tsx
│   │   ├── Header.tsx
│   │   ├── Icon.tsx
│   │   ├── MenuCard.tsx
│   │   ├── OptionButton.tsx
│   │   ├── QuantityControl.tsx
│   │   ├── SearchBar.tsx
│   │   ├── StatusBar.tsx
│   │   └── SummaryRow.tsx
│   │
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── dimensions.ts
│   │   ├── screens.ts
│   │   └── typography.ts
│   │
│   ├── context/
│   │   └── AppContext.tsx
│   │
│   ├── data/
│   │   └── drinks.ts
│   │
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   ├── DrawerNavigator.tsx
│   │   ├── StackNavigator.tsx
│   │   ├── TabNavigator.tsx
│   │   └── navigationTypes.ts
│   │
│   ├── pages/
│   │   ├── Welcome.tsx
│   │   ├── Home.tsx
│   │   ├── Menu.tsx
│   │   ├── DrinkDetails.tsx
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── PaymentMethod.tsx
│   │   ├── OrderConfirmation.tsx
│   │   └── Cafe.tsx
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── utils/
│       ├── options.ts
│       └── price.ts
│
├── screenshots/
│
├── app.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Styling

The project uses React Native's `StyleSheet.create()` for component styling.

Reusable design values are stored in separate constants:

- colors
- dimensions
- typography

This helps keep the interface consistent and reduces duplicated values and magic numbers.

## 📱 Mobile Responsive Design

Drinkly is designed as a mobile-first application for smartphones.

The main design target is the iPhone 17 screen size. The interface uses responsive React Native components so that the same layout adapts to different smartphone screen widths.

The application was tested at:

| Width  | Purpose             |
| ------ | ------------------- |
| 320 px | Small smartphone    |
| 375 px | Compact smartphone  |
| 390 px | Standard smartphone |
| 430 px | Large smartphone    |

### Responsive techniques

The application uses:

- `useWindowDimensions()`
- Flexbox
- flexible widths
- `aspectRatio`
- responsive card sizes
- `ScrollView`
- adaptive horizontal spacing
- reusable components

The same UI components are used across platforms without creating separate layouts for different screen sizes.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

### 2. Go to the project directory

```bash
cd DrinklyExpo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npx expo start
```

To run the web version:

```bash
npx expo start --web
```

## 🔍 TypeScript Check

The project can be checked with:

```bash
npx tsc --noEmit
```

The application is developed with TypeScript to provide type safety for:

- components
- props
- navigation
- navigation parameters
- drinks
- cart data

## 📋 Main User Flow

### Welcome

![Welcome](./screenshots/WelcomePage.png)

### Home

![Home](./screenshots/HomePage.png)

### Menu

![Menu](./screenshots/MenuPage.png)

### Drawer Menu

![Burger Menu](./screenshots/BurgerMenu.png)

### Drink Details

![Drink Details](./screenshots/DrinkDetailsPage.png)

### Add to Cart

![Cart](./screenshots/CartPage.png)

### Cart

![Cart](./screenshots/CartNotOrder.png)

### Checkout

![Checkout](./screenshots/CheckOutPage.png)

### Order Confirmation

![Order Confirmation](./screenshots/OrderConfirmationPage.png)

Users can navigate between the main sections using the custom bottom navigation and Drawer navigation.

## 🔄 Order Flow

The main ordering flow is:

```text
Welcome
   ↓
Home
   ↓
Drink Details
   ↓
Cart
   ↓
Checkout
   ↓
Order Confirmation
   ↓
Home
```

Users can also return to the previous screen using the Back action.

After order confirmation, the cart is cleared and the user can return to the Home screen.

## 📚 Assignment

This project was created as part of a React Native learning assignment.

The project demonstrates:

- React Native components
- component reusability
- props
- styling
- Flexbox
- responsive design
- TypeScript
- Stack navigation
- Tab navigation
- Drawer navigation
- navigation parameters
- parameter validation
- navigation architecture
- screen transitions

## 👩‍💻 Author

Наталія Боднарчук
