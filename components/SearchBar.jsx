import { View, StyleSheet, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";

export default function SearchBar() {
  return (
    <View style={styles.search}>
      <Feather name="search" size={24} color="black" />
      <TextInput style={styles.placeholder} placeholder="Search" />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    elevation: 1,
  },
  placeholder: {
    marginStart: 10,
  },
});
