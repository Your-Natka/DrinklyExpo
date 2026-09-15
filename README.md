Drinkly — React Native Components

A mobile-first drink ordering application built with React Native and Expo.

Drinkly allows users to browse drinks, view drink details, customize their order, manage the cart, choose an order type and complete the checkout process.

📱 Preview
Welcome

Home

Menu

Drink Details

Cart

Checkout

Order Confirmation

✨ Features
Welcome screen
Home screen with popular drinks
Drink categories
Search drinks
Drink details
Drink customization
Add drinks to cart
Quantity controls
Remove items from cart
Dine-in and takeaway order types
Checkout
Payment method selection
Order confirmation
Café information
Bottom navigation
Responsive mobile layout
🛠️ Technologies
React Native
Expo
TypeScript
Expo Router
React Hooks
React Native StyleSheet
Flexbox
🧩 Reusable Components

The application is built using reusable React Native components.

Examples:

Header
StatusBar
Button
DrinkCard
MenuCard
CartItem
CategoryTabs
SearchBar
QuantityControl
OptionButton
CheckoutChoice
SummaryRow
BottomNavigation
Icon

Components receive data and callbacks through props, which makes them reusable across different screens.

📂 Project Structure
src/
├── app/
│ ├── \_layout.tsx
│ ├── index.tsx
│ └── explore.tsx
│
├── components/
│ ├── BottomNavigation.tsx
│ ├── Button.tsx
│ ├── CartItem.tsx
│ ├── CategoryTabs.tsx
│ ├── CheckoutChoice.tsx
│ ├── DrinkCard.tsx
│ ├── Header.tsx
│ ├── Icon.tsx
│ ├── MenuCard.tsx
│ ├── OptionButton.tsx
│ ├── QuantityControl.tsx
│ ├── SearchBar.tsx
│ ├── StatusBar.tsx
│ └── SummaryRow.tsx
│
├── constants/
│ ├── colors.ts
│ ├── dimensions.ts
│ ├── theme.ts
│ └── typography.ts
│
├── data/
│ └── drinks.ts
│
├── navigation/
│ └── AppNavigation.tsx
│
├── pages/
│ ├── Welcome.tsx
│ ├── Home.tsx
│ ├── Menu.tsx
│ ├── DrinkDetails.tsx
│ ├── Cart.tsx
│ ├── Checkout.tsx
│ ├── PaymentMethod.tsx
│ ├── OrderConfirmation.tsx
│ └── Cafe.tsx
│
├── types/
│ └── index.ts
│
└── utils/
├── options.ts
└── price.ts
🎨 Styling

The project uses React Native's StyleSheet.create() for component styling.

Reusable design values are stored in separate constants:

colors
spacing
dimensions
typography

This helps keep the interface consistent and reduces duplicated values and magic numbers.

📱 Mobile Responsive Design

Drinkly is designed as a mobile-first application for smartphones.

The main design target is the iPhone 17 screen size. The interface uses responsive React Native components so that the same layout adapts to different smartphone screen widths.

The application was tested at:

Width Purpose
320 px Small smartphone
375 px Compact smartphone
390 px Standard smartphone
430 px Large smartphone
Responsive techniques

The application uses:

useWindowDimensions()
Flexbox
flexible widths
aspectRatio
responsive card sizes
ScrollView
adaptive horizontal spacing
reusable components

The same UI components are used on both iOS and Android. No separate mobile layouts are created for different platforms.

Responsive examples

🚀 Getting Started

1. Clone the repository
   git clone <YOUR_REPOSITORY_URL>
2. Go to the project directory
   cd DrinklyExpo
3. Install dependencies
   npm install
4. Start the development server
   npx expo start

To run the web version:

npx expo start --web
🔍 TypeScript Check

The project can be checked with:

npx tsc --noEmit

The application is developed with TypeScript to provide type safety for components, props, navigation, drinks and cart data.

📋 Main User Flow

### Welcome

![Welcome](./screenshots/WelcomePage.png)

### Home

![Home](./screenshots/HomePage.png)

### Menu

![Menu](./screenshots/MenuPage.png)

### Burger Menu

![Burger Menu](./screenshots/BurgerMenu.png)

### Drink Details

![Drink Details](./screenshots/DrinkDetailsPage.png)

### Add to Cart

![Cart](./screenshots/CartPage.png)

### Cart

![Cart](./screenshots/CartNotOrder.png)

### Checkout

![Checkout](./screenshots/CheckOutPage.png)

### Checkout

![Checkout](./screenshots/CheckOutPage.png)

### Order Confirmation

![Order Confirmation](./screenshots/OrderConfirmationPage.png)

Users can also navigate between the main sections using the bottom navigation.

📚 Assignment

This project was created as part of a React Native learning assignment focused on:

React Native components
component reusability
props
styling
Flexbox
responsive design
mobile UI development
TypeScript

👩‍💻 Author

Наталія Боднарчук
