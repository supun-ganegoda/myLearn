import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useState, useContext } from "react";
import { Colors } from "../constants/Colors";
import Menu from "./Menu";
import { AuthContext } from "../services/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { clearStore } from "../services/AsyncStorage";

export default function HomeHeader({ userName }) {
  const { setUserData } = useContext(AuthContext);
  const nav = useNavigation();
  const [menu, setMenu] = useState(false);

  const handleMenuClick = async (id) => {
    if (id == 1) {
      setUserData(null);
      await clearStore();
      nav.navigate("Landing");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Hello</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Pressable onPress={() => setMenu(!menu)}>
        <Image style={styles.avatar} source={require("../assets/avatar.png")} />
      </Pressable>

      {menu && (
        <View style={styles.menu}>
          <Menu handlePressed={(id) => handleMenuClick(id)} />
        </View>
      )}
      {menu && (
        <TouchableWithoutFeedback onPress={() => setMenu(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
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
  menu: {
    position: "absolute",
    top: 50,
    right: 0,
    zIndex: 100,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get("screen").height,
    backgroundColor: "transparent",
    zIndex: 20,
  },
});
