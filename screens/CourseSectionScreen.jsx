import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef, useState, useCallback } from "react";
import { useRoute } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import YoutubePlayer from "react-native-youtube-iframe";
import { WebView } from "react-native-webview";

export default function CourseSectionScreen() {
  const listRef = useRef(null);
  const { topic } = useRoute().params;
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [btnText, setBtnText] = useState("Next");
  const [playing, setPlaying] = useState(false);
  const pages = topic.content.length;

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

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
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }}
      >
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
              {item.utube && (
                <View style={styles.utube}>
                  <YoutubePlayer
                    height={Dimensions.get("window").height * 0.25}
                    play={playing}
                    videoId={item.utube}
                    onChangeState={onStateChange}
                  />
                </View>
              )}
              {item.web && (
                <View style={styles.web}>
                  <WebView source={{ uri: item.web }} />
                </View>
              )}
              <Text style={styles.section}>Description</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
        />
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.nextBtn} onPress={handleScroll}>
          <Text style={styles.btnText}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    marginBottom: 10,
  },
  sectionView: {
    width: Dimensions.get("window").width * 0.95,
    height: "auto",
    paddingBottom: 15,
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
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.light.background,
    alignItems: "center",
  },
  btnText: {
    fontSize: 18,
  },
  section: {
    fontSize: 20,
    padding: 5,
    fontWeight: "400",
  },
  utube: {
    padding: 5,
    marginVertical: 10,
  },
  web: {
    borderWidth: 1,
    borderColor: "#000",
    margin: 5,
    width: "auto",
    height: Dimensions.get("window").height * 0.75,
  },
});
