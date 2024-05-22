import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

export default function ({ handlePressed }) {
  return (
    <View style={styles.menu}>
      <Pressable onPress={() => handlePressed(0)}>
        <Text style={styles.menuItem}>profile</Text>
      </Pressable>
      <Pressable onPress={() => handlePressed(1)}>
        <Text style={styles.menuItem}>log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    borderRadius: 10,
    backgroundColor: Colors.light.backDrop,
    padding: 10,
  },
  menuItem: {
    fontSize: 15,
    padding: 5,
  },
});
