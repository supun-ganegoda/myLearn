import {
  Text,
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableNativeFeedback,
  TextInput,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { login } from "../services/GlobalApi";
import { useNavigation } from "@react-navigation/native";
import AppModal from "../components/AppModal";
import RegisterForm from "../components/RegisterForm";
import { AuthContext } from "../services/AuthContext";
import { getItem, storeItem } from "../services/AsyncStorage";

export default function LoginScreen() {
  const { userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigation();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [displayRegister, setDisplayRegister] = useState(false);
  const [loginCheck, setLoginCheck] = useState(true);

  const handleLogin = async () => {
    const response = await login({ userName: userName, password: password });
    if (response?.error) {
      Alert.alert("Error", response.error.message);
    } else {
      await storeItem("jwt", response.jwt);
      await storeItem("userName", response.user.username);

      setUserData(response);
      navigate.navigate("Home");
    }
  };

  const handleRegister = () => {
    setDisplayRegister(!displayRegister);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const jwtToken = await getItem("jwt");
      const storedUserName = await getItem("userName");

      if (jwtToken && storedUserName) {
        setUserData({ jwt: jwtToken, user: { username: storedUserName } });
        navigate.navigate("Home");
      }
      setLoginCheck(false);
    };

    checkLogin();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <Text style={styles.welcomeText}>WELCOME</Text>

      <View style={styles.loginView}>
        <TextInput
          style={[styles.inputs, { marginVertical: 5 }]}
          placeholder="user name"
          autoCapitalize={false}
          onChangeText={(x) => setUserName(x)}
        />
        <TextInput
          style={[styles.inputs, { marginVertical: 5 }]}
          placeholder="password"
          autoCapitalize="false"
          secureTextEntry={true}
          onChangeText={(x) => setPassword(x)}
        />
      </View>

      <TouchableNativeFeedback
        onPress={handleLogin}
        disabled={userName === "" || password === ""}
      >
        <View style={styles.signInButton}>
          <AntDesign name="login" size={24} color="black" />
          <Text style={styles.signText}>
            {loginCheck ? "Checking..." : "Login"}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <View style={styles.register}>
        <Pressable onPress={handleRegister}>
          <Text style={styles.registerText}>Register Now</Text>
        </Pressable>
      </View>

      {displayRegister && (
        <AppModal
          visible={displayRegister}
          closeHandler={setDisplayRegister}
          children={<RegisterForm />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
  },
  logo: {
    marginTop: -100,
  },
  signInButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 12,
    backgroundColor: Colors.light.background,
    flexDirection: "row",
    alignItems: "center",
    elevation: 1,
  },
  signText: {
    color: Colors.light.text,
    marginStart: 10,
    fontSize: 18,
    textTransform: "uppercase",
  },
  welcomeText: {
    marginBottom: 30,
    letterSpacing: 4,
    fontSize: 30,
    fontWeight: "400",
  },
  loginView: {
    padding: 10,
    backgroundColor: Colors.light.white,
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.75,
  },
  inputs: {
    height: 40,
    paddingHorizontal: 20,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 7,
  },
  register: {
    marginTop: 40,
  },
  registerText: {
    fontSize: 18,
    color: "#9a3412",
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
});
