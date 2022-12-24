/*
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import RegisterPage from "./RegisterPage";
const customFont = "RobotoSlab-Medium";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import { createErrorHandler } from "expo/build/errors/ExpoErrorManager";
import { setStatusBarBackgroundColor } from "expo-status-bar";
const Stack = createStackNavigator();

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

function Register() {
  return <RegisterPage />;
}

const errorHandler = () => {
  setStatusBarBackgroundColor("red");
};
const Login = async () => {
  let uError = (pError = null);

  if (username == null || password == null) {
    if (username == null) {
      uError = "Please Enter your Username";
    }

    if (password == null) {
      pError = "Please Enter your Password";
    }
  } else {
    const payload = {
      username: username,
      password: password,
    };

    try {
      setLoad(true);

      const baseURL = "https://cinema-guesser.herokuapp.com";

      const response = await axios.post(baseURL + "/api/user/login/", payload);

      //console.log(response.data);
    } catch (error) {
      uError = "Incorrect Username";

      pError = "Incorrect Password";
    }
  }

  setError({ username: uError, password: pError });

  setLoad(false);
};

export default function LoginPage() {
  const [fontsLoaded] = useFonts({
    "RobotoSlab-Medium": require("../assets/fonts/RobotoSlab-Medium.ttf"),
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const ref = React.useRef(null);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/AppBackground.jpg")}
      >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/images/AppLogo.png")}
          ></Image>
        </View>

        <View style={styles.loginContainer}>
          <View style={styles.username}>
            <TextInput
              style={{ color: "white" }}
              placeholderTextColor="white"
              placeholder="username"
              onChangeText={(newText) => setUsername(newText)}
              defaultValue={username}
            />
            <View style={styles.horizontalBar}></View>
          </View>
          <View style={styles.password}>
            <TextInput
              style={{ color: "white" }}
              placeholderTextColor="white"
              placeholder="Password"
              onChangeText={(newText) => setPassword(newText)}
              defaultValue={password}
            />
            <View style={styles.horizontalBar}></View>
          </View>

          <View style={styles.touchables}>
            <TouchableOpacity style={styles.loginBtn} onPress={Login}>
              <Image
                source={require("../assets/images/LoginButton.png")}
              ></Image>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Text
                style={styles.loginText}
                onPress={() => ref.current && ref.current.navigate("Register")}
              >
                Create Account
              </Text>
              <View style={styles.verticalBar}></View>
              <TouchableOpacity>
                <Text
                  style={styles.loginText}
                  onPress={() =>
                    ref.current && ref.current.navigate("Register")
                  }
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    marginTop: "15%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
  },
  loginContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    // margin: '5%',
  },

  username: {
    margin: 15,
  },

  password: {
    margin: 15,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontFamily: "RobotoSlab-Medium",
    fontWeight: "500",
    fontSize: 20,
  },

  horizontalBar: {
    backgroundColor: "#F1CF54",
    height: 3,
    width: 275,
  },
  verticalBar: {
    backgroundColor: "#F1CF54",
    height: 20,
    width: 2,
  },

  touchables: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
  },
  loginText: {
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "RobotoSlab-Medium",
  },
});


*/

import React from "react";
import { View, Text, SafeAreaView, Keyboard, Alert } from "react-native";
import COLORS from "../components/const/colors";
import Button from "../components/Button";
import Input from "../components/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";

const LoginPage = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    }
    if (isValid) {
      login();
    }
  };

  // const login = () => {
  //   setLoading(true);
  //   setTimeout(async () => {
  //     setLoading(false);
  //     let userData = await AsyncStorage.getItem("userData");
  //     if (userData) {
  //       userData = JSON.parse(userData);
  //       if (
  //         inputs.email == userData.email &&
  //         inputs.password == userData.password
  //       ) {
  //         navigation.navigate("HomePage");
  //         AsyncStorage.setItem(
  //           "userData",
  //           JSON.stringify({ ...userData, loggedIn: true })
  //         );
  //       } else {
  //         Alert.alert("Error", "Invalid Details");
  //       }
  //     } else {
  //       Alert.alert("Error", "User does not exist");
  //     }
  //   }, 3000);
  // };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  const doLogin = async (event) => {
    event.preventDefault();

    // const loginName = loginNameRef.current.value;
    // const loginPassword = loginPasswordRef.current.value;

    let obj = { login: inputs.email, password: inputs.password };

    let js = JSON.stringify(obj);

    try {
      // 'https://cinema-guesser.herokuapp.com/api/login'

      const response = await fetch(
        "https://cinema-guesser.herokuapp.com/api/login",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );
      let res = JSON.parse(await response.text());

      if (res.error && res.error !== "") {
        Alert.alert(res.error);
      } else {
        navigation.navigate("HomePage", { name: "login" });
      }
    } catch (e) {
      Alert.alert(e.toString());
      return;
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Loader visible={loading} />
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/images/AppBackground.jpg")}
        >
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require("../assets/images/AppLogo.png")}
            ></Image>

            <View style={{ marginVertical: 1 }}>
              <View style={{ paddingTop: 10, paddingHorizontal: 20 }}></View>
              <Input
                onChangeText={(text) => handleOnchange(text, "email")}
                onFocus={() => handleError(null, "username")}
                iconName="account-outline"
                label="Login"
                placeholder="Enter Login"
                error={errors.email}
              />
              <Input
                onChangeText={(text) => handleOnchange(text, "password")}
                onFocus={() => handleError(null, "password")}
                iconName="lock-outline"
                label="Password"
                placeholder="Enter password"
                error={errors.password}
                password
              />
              <Button title="Log In" onPress={doLogin} />
              <Text
                onPress={() => navigation.navigate("RegisterPage")}
                style={{
                  color: COLORS.black,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                Don't have account? Register
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    marginTop: "15%",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
  },
  loginContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    // margin: '5%',
  },

  username: {
    margin: 15,
  },

  password: {
    margin: 15,
  },
  text: {
    color: "white",
    textAlign: "center",
    fontFamily: "RobotoSlab-Medium",
    fontWeight: "500",
    fontSize: 20,
  },

  horizontalBar: {
    backgroundColor: "#F1CF54",
    height: 3,
    width: 275,
  },
  verticalBar: {
    backgroundColor: "#F1CF54",
    height: 20,
    width: 2,
  },

  touchables: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
  },
  loginText: {
    fontWeight: "500",
    fontSize: 16,
    textAlign: "center",
    margin: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "RobotoSlab-Medium",
  },
});
