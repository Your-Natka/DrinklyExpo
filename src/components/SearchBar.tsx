import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import Icon from "./Icon";

import { COLORS } from "../constants/colors";

interface SearchBarProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search drinks...",
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Icon name="search" size={16} color={COLORS.muted} />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0AAA5"
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 34,
    marginHorizontal: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#EEF0ED",
    backgroundColor: "#F8F8F6",
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 10,
    paddingVertical: 0,
    marginLeft: 7,
  },
});
