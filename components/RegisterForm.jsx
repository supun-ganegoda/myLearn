import React, { useContext, useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Colors } from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { registerUser } from "../services/GlobalApi";
import { AuthContext } from "../services/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { storeItem } from "../services/AsyncStorage";

export default LoginForm = ({ closeHandler }) => {
  const { setUserData } = useContext(AuthContext);
  const nav = useNavigation();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    const response = await registerUser({
      userName: userName,
      email: email,
      password: password,
    });
    if (response.error) {
      Alert.alert("Error", response.error.message);
    } else {
      await storeItem("jwt", response.jwt);
      await storeItem("userName", response.user.username);
      setUserData(response);
      nav.navigate("Home");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Register Form </Text>
        <AntDesign
          style={{ marginStart: "auto" }}
          name="closecircleo"
          size={24}
          color="black"
          onPress={() => closeHandler(false)}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          onChangeText={(x) => setUserName(x)}
          autoCapitalize="false"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          onChangeText={(x) => setEmail(x)}
          autoCapitalize="false"
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Enter Password"
          onChangeText={(x) => setPassword(x)}
          autoCapitalize="false"
        />

        <TouchableOpacity
          style={styles.registerBtn}
          onPress={handleRegistration}
        >
          <AntDesign name="adduser" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: Colors.light.white,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  input: {
    height: 40,
    marginVertical: 5,
    paddingHorizontal: 20,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 7,
  },
  registerBtn: {
    display: "flex",
    marginTop: 10,
    padding: 10,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    borderRadius: 10,
    elevation: 2,
  },
});
