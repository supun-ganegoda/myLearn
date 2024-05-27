import { StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { Colors } from "./constants/Colors";
import CourseViewScreen from "./screens/CourseViewScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "./services/AuthContext";
import { useState } from "react";
import CourseSectionScreen from "./screens/CourseSectionScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [userData, setUserData] = useState(null);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        hidden={false}
        backgroundColor={"#ea580c"}
        barStyle="light-content"
      />
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
            <Stack.Screen
              name="CourseSection"
              component={CourseSectionScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.light.backDrop,
  },
});
