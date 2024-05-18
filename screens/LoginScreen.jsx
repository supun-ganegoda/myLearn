import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.welcomeText}>WELCOME</Text>
      <TouchableNativeFeedback>
        <View style={styles.signInButton}>
          <AntDesign name="google" size={20} color="black" />
          <Text style={styles.signText}>Sign-in with Google</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    top: 200,
  },
  signInButton: {
    position: "absolute",
    bottom: 100,
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    alignItems: "center",
  },
  signText: {
    color: Colors.light.text,
    marginStart: 10,
    fontSize: 18,
  },
  welcomeText: {
    marginBottom: 30,
    letterSpacing: 4,
    fontSize: 30,
    fontWeight: "400",
  },
});
