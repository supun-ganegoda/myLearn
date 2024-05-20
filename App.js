import { StatusBar, SafeAreaView, StyleSheet, Platform } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { Colors } from "./constants/Colors";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      {/* <LoginScreen /> */}
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.light.backDrop,
  },
});
