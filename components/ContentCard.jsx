import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function ContentCard({ topics }) {
  const navigation = useNavigation();

  const handleSectionNavigation = (topic) => {
    navigation.navigate("CourseSection", { topic });
  };

  return (
    <View style={styles.cards}>
      {topics?.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.7}
          style={styles.card}
          onPress={() => handleSectionNavigation(item)}
        >
          <Text style={styles.index}>
            {index < 10 ? "0" : ""}
            {index + 1}
          </Text>
          <Text style={styles.content}>{item.name}</Text>
          <Ionicons name="play-circle" size={24} color="blue" />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  cards: {
    marginBottom: 20,
  },
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
