import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function CourseSectionScreen() {
  const listRef = useRef(null);
  const { topic } = useRoute().params;
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [btnText, setBtnText] = useState("Next");
  const pages = topic.content.length;

  const handleScroll = () => {
    if (currentIndex === pages - 1) {
      setBtnText("Finish");
    }
    if (currentIndex === pages) {
      navigation.goBack();
      return;
    } else setCurrentIndex((currentIndex) => currentIndex + 1);
    if (listRef.current) {
      listRef.current.scrollToIndex({ animated: true, index: currentIndex });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={topic?.content}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.sectionView}>
            <Text style={styles.caption}>{item.caption}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.nextBtn} onPress={handleScroll}>
        <Text style={styles.btnText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sectionView: {
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.88,
    marginEnd: 5,
    backgroundColor: Colors.light.white,
  },
  caption: {
    fontSize: 24,
    padding: 5,
  },
  description: {
    padding: 10,
  },
  nextBtn: {
    display: "flex",
    position: "relative",
    top: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
  },
});
