import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";

export default function Slider(props) {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    if (props.data) {
      const tempList = props.data.map((item) => ({
        name: item.attributes.name,
        image: item.attributes.image.data.attributes.url,
        title: item.attributes.title ?? null,
        description: item.attributes.description ?? null,
      }));
      setImageList(tempList);
    }
  }, [props.data]);

  return (
    <View style={styles.container}>
      {props.header && <Text style={styles.header}>{props.header}</Text>}
      <FlatList
        data={imageList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: `http://192.168.1.101:1337${item.image}` }}
              style={styles.sliderImage}
            />
            {item.title && <Text style={styles.title}>{item.title}</Text>}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    padding: 4,
  },
  sliderImage: {
    width: Dimensions.get("screen").width * 0.75,
    height: 180,
    marginRight: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bannerContainer: {
    paddingBottom: 10,
  },
  title: {
    padding: 5,
    marginTop: -3,
    fontSize: 15,
    marginRight: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: Colors.light.white,
  },
});