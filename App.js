import { StatusBar, StyleSheet, Platform, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { Colors } from "./constants/Colors";
import CourseViewScreen from "./screens/CourseViewScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./services/AuthContext";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState(null);

  return (
    <View style={styles.root}>
      <AuthContext.Provider value={{ userData, setUserData }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Landing" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CourseDetails" component={CourseViewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.light.backDrop,
  },
});
