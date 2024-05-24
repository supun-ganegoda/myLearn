import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import ContentCard from "../components/ContentCard";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CourseViewScreen() {
  const navigate = useNavigation();
  const { data } = useRoute().params;

  return (
    <ScrollView style={styles.container}>
      <Ionicons
        name="arrow-back-sharp"
        size={24}
        color="black"
        onPress={() => navigate.goBack()}
      />
      <Text style={styles.header}>{data?.title}</Text>
      <Text style={styles.author}>by {data?.author}</Text>

      <Image style={styles.cover} source={{ uri: data?.image }} />
      <Text style={[styles.header, styles.title]}>About Course</Text>
      <Text numberOfLines={4} style={[styles.description, styles.author]}>
        {data?.description}
      </Text>

      <Text style={[styles.header, styles.title, styles.content]}>
        Course Content
      </Text>

      <ContentCard topics={data?.topics} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
  },
  cover: {
    marginVertical: 10,
    alignSelf: "center",
    width: Dimensions.get("screen").width * 0.9,
    height: 280,
    borderRadius: 8,
  },
  author: {
    color: Colors.light.tabIconDefault,
  },
  title: {
    fontSize: 20,
  },
  description: {
    marginVertical: 10,
  },
  content: {
    marginBottom: 10,
  },
  cards: {},
});
