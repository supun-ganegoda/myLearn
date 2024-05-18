import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <LoginScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
