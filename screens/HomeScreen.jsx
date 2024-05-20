import { View, StyleSheet } from "react-native";
import React from "react";
import HomeHeader from "../components/HomeHeader";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeHeader />
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
