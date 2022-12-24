import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";

// const HomeScreen = ({ navigation }) => {
//   return navigation.navigate("LoginPage");
// };

const LogoutGif = () => {
  console.log("it made it here");
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/logout.gif")}
      ></ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  baseText: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    marginTop: 230,
    padding: 60,
  },
  cardContainer: {
    width: 320,
    height: 470,
  },
  card: {
    width: 320,
    height: 470,
    backgroundColor: "#FE474C",
    borderRadius: 5,
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
  card1: {
    backgroundColor: "#FE474C",
  },
  card2: {
    backgroundColor: "#FEB12C",
  },
  flexContainer: {
    flex: 1,
    padding: 20,
  },
  label: {
    lineHeight: 470,
    textAlign: "center",
    fontSize: 55,
    fontFamily: "System",
    color: "#ffffff",
    backgroundColor: "transparent",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
  },
});

export default LogoutGif;
