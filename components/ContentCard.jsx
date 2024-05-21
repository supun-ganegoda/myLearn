import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

export default function ContentCard({ topics }) {
  return topics?.map((item, index) => (
    <TouchableOpacity key={index} activeOpacity={0.7} style={styles.card}>
      <Text style={styles.index}>
        {index < 10 ? "0" : ""}
        {index + 1}
      </Text>
      <Text style={styles.content}>{item.name}</Text>
      <Ionicons name="play-circle" size={24} color="blue" />
    </TouchableOpacity>
  ));
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: Colors.light.white,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  index: {
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    fontSize: 18,
    color: Colors.light.tabIconDefault,
  },
});
