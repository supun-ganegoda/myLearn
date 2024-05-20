import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Hello</Text>
        <Text style={styles.userName}>Supun</Text>
      </View>
      <Image style={styles.avatar} source={require("../assets/avatar.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
    backgroundColor: Colors.light.white,
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
  },
  avatar: {
    width: 36,
    height: 36,
  },
});
