import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import Button from "../components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import GameContainer from "../components/GameContainer";
import Input from "../components/Input";
import LeaderboardContainer from "../components/LeaderboardContainer";
import type { Node } from "react";
import TableExample from "../components/DataTable";

import {
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { Icon } from "react-native-elements";
// import { background } from "native-base/lib/typescript/theme/styled-system";

// <Button title="Logout" onPress={logout} />
const HomePage = ({ navigation, route }) => {
  const [userDetails, setUserDetails] = React.useState();
  React.useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    }
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const logout = () => {
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({ ...userDetails, loggedIn: false })
    );
    navigation.navigate("LoginPage");
  };

  function logoutGif() {
    console.log("ehat the heck");
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/images/AppBackground.jpg")}
        >
          <View style={{ flex: 0.1, marginVertical: 150 }}></View>
          <Button title="Logout" onPress={logout} />
          {/* <Button title="Log Out" onClick={() => setShowDiv(!showDiv)}>
            Show/Hide
          </Button>
          {showDiv && (
            //console.log("it hit");
            <Image
              source={require("../assets/images/scoob.gif")}
              style={{ width: 1000, height: 1000 }}
            />
          )} */}
        </ImageBackground>
      </View>
    );
  }

  function RulesPage() {
    const [login, setLogin] = React.useState({ email: "", password: "" });

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/images/AppBackground.jpg")}
        >
          <Text style={styles.baseText}>
            Your mission, should you choose to accept it is to Guess the movie
            rating out of 100. You will be given the description of the movie,
            actors, the movie poster, cast, and earned money in box office. You
            will play five rounds, and be rewarded based off how close you were
            to the rating.
          </Text>
          <Text>This is {route.params.name}'s profile</Text>
          <Image
            source={require("../assets/images/scoob.gif")}
            style={{ width: 100, height: 100 }}
          />
          {/* <Text style={styles.baseText}>
            Description:<Text style={{ color: "white" }}>{desc}</Text>{" "}
          </Text> */}
        </ImageBackground>
      </View>
    );
  }

  const LeaderboardPage: () => Node = () => {
    return (
      <View>
        <TableExample />
      </View>
    );
  };

  const GamePage = () => {
    const [placeholder, setPlaceholder] = useState("Guess Rating");
    const [poster, setPoster] = useState(null);
    const [title, setTitle] = useState(false);
    const [desc, setDesc] = useState(false);
    const [genre, setGenre] = useState(false);
    const [actors, setActors] = useState(false);
    const [year, setYear] = useState(false);
    const [rating, setRating] = useState(0);
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [guess, setGuess] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const loadMovieInfo = async (event) => {
      // var movie_memt = JSON.parse(get_store("carl"));
      // var movie_mem = JSON.parse(await get_store("movie_mem"));

      // console.log(movie_mem + "hi");
      // console.log(movie_memt);
      let obj = {
        filter: [],
      };
      let js = JSON.stringify(obj);
      try {
        // 'https://cinema-guesser.herokuapp.com/api/movies_saved'
        // bp.buildPath('api/movies_saved')
        const response = await fetch(
          "https://cinema-guesser.herokuapp.com/api/movies_saved",
          {
            method: "POST",
            body: js,
            headers: { "Content-Type": "application/json" },
          }
        );
        let res = JSON.parse(await response.text());
        let movie = res.omdb[0];
        if (res.length == 0 || (res.error && res.error !== "")) {
          // setMessage('Username is taken, please try a different one.');
          //either by default or after filter
          console.log(res.err);
        } else {
          setDesc(movie.Plot);
          setActors(movie.Actors);
          // setBoxOffice(res.omdb.BoxOffice);
          setGenre(movie.Genre);
          setPoster(movie.Poster);
          if (movie.Ratings.includes("/")) {
            // var rating = eval(movie.Ratings);
            // setRating(rating * 100);
            setRating(parseFloat(movie.Ratings) * 10);
          } else setRating(parseInt(movie.Ratings));

          setTitle(capitalize(movie.Title));
          setYear(movie.Year);
          setDesc(movie.Plot);
          setGuess("");
          //on reload don't run again
          // if (movie_mem.list[movie_mem.head] !== res.omdb.Title) {
          //   movie_mem.list[movie_mem.head] = res.omdb.Title;
          //   movie_mem.head += 1;
          //   //this number '25' must be smaller than number of movies in 'Movies' DB
          //   //movie_mem.head %= 25;
          //   //console.log("UPDATE: " + JSON.stringify(movie_mem));
          //   //update movie_mem
          //   AsyncStorage.setItem("movie_mem", JSON.stringify(movie_mem));
          // }

          console.log(res.omdb[0]);
        }
      } catch (e) {
        console.log(e);
        return;
      }
    };

    useEffect(() => {
      loadMovieInfo();
    }, []);

    const capitalize = (str, lower = false) =>
      (lower ? str.toLowerCase() : str).replace(
        /(?:^|\s|["'([{])+\S/g,
        (match) => match.toUpperCase()
      );
    function pointsAwarded(delta) {
      if (delta >= 33) return 0;
      if (delta === 0) return 120;
      return Math.round(100 - 3 * delta);
    }
    function openRoundModal() {
      setScore(pointsAwarded(Math.abs(guess - rating)));
      setTotalScore(
        totalScore + (score + pointsAwarded(Math.abs(guess - rating)))
      );
      setModalVisible(!modalVisible);
    }

    function closeRoundModal() {
      setModalVisible(!modalVisible);
      setScore(0);
      setPlaceholder("Guess Rating");
      loadMovieInfo();
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container2}>
            <ImageBackground
              style={styles.background}
              source={require("../assets/images/AppBackground.jpg")}
            >
              <View
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#0A0A0A",
                }}
              >
                {/* <GameContainer /> */}
                <View
                  style={{
                    flex: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#f1cf54",
                      fontSize: 20,
                      marginTop: 35,
                    }}
                  >
                    {title} &#40;{year}&#41;
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      width: "70%",
                    }}
                  >
                    <Image
                      style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        resizeMode: "contain",
                      }}
                      source={{ uri: poster }}
                    ></Image>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderColor: "red",
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      borderColor: "green",
                    }}
                  >
                    <Text
                      style={{
                        color: "#f1cf54",
                        fontSize: 16,
                        marginTop: 5,
                        padding: 4,
                      }}
                    >
                      Description:<Text style={{ color: "white" }}>{desc}</Text>{" "}
                    </Text>

                    <Text
                      style={{
                        color: "#f1cf54",
                        fontSize: 16,
                        marginTop: 5,
                        padding: 4,
                      }}
                    >
                      Genre:<Text style={{ color: "white" }}>{genre}</Text>{" "}
                    </Text>
                    <Text
                      style={{
                        color: "#f1cf54",
                        fontSize: 16,
                        marginTop: 5,
                        padding: 4,
                      }}
                    >
                      Actors:<Text style={{ color: "white" }}>{actors}</Text>{" "}
                    </Text>
                  </View>

                  <View
                    style={{
                      flex: 1,
                      borderColor: "blue",

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {/* instead of loadMovieInfo, change it to display the round modal  */}
                    <TextInput
                      onSubmitEditing={() => openRoundModal()}
                      style={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 18,
                        borderBottomColor: "#f1cf54",
                        borderBottomWidth: 2.5,
                        width: "70%",
                      }}
                      onPressIn={() => setPlaceholder("")}
                      onChangeText={setGuess}
                      placeholder={placeholder}
                      placeholderTextColor="white"
                      keyboardType="numeric"
                    ></TextInput>
                    {/* <Input
                  onChangeText={(text) => handleOnchange(text, "email")}
                  placeholder="Enter Guess"
                /> */}
                    <Button title="Enter" onPress={openRoundModal} />
                  </View>
                </View>
              </View>
              <Modal visible={modalVisible} transparent={true}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 300,
                      height: 200,
                      backgroundColor: "#acacac",
                      borderRadius: 10,
                      padding: 50,
                    }}
                  >
                    {/* <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 1,
                  }}
                >
                  <View
                    style={{
                      flex: 0.5,
                      width: "70%",
                      height: "1%",
                      margin: 20,
                      backgroundColor: "#acacac",
                      borderRadius: 10,
                      padding: 35,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 10,
                    }}
                  > */}
                    <Pressable
                      style={{
                        position: "absolute",
                        right: 10,
                        top: 5,
                      }}
                      onPress={() => closeRoundModal()}
                    >
                      <Icon name="close"></Icon>
                    </Pressable>
                    <Text
                      style={{
                        textAlign: "left",
                        color: "#f1cf54",
                        fontSize: 20,
                      }}
                    >
                      Movie Rating:{" "}
                      <Text style={{ color: "#d00000" }}>{rating}% </Text>
                    </Text>
                    <Text
                      style={{ marginTop: 5, color: "#f1cf54", fontSize: 20 }}
                    >
                      You Guessed:{" "}
                      <Text style={{ color: "#d00000" }}>{guess}% </Text>
                    </Text>
                    <Text
                      style={{ marginTop: 5, color: "#f1cf54", fontSize: 20 }}
                    >
                      You Scored:{" "}
                      <Text style={{ color: "#d00000" }}> {score}pts </Text>{" "}
                    </Text>
                    <Text
                      style={{ marginTop: 5, color: "#f1cf54", fontSize: 20 }}
                    >
                      Total Score:{" "}
                      <Text style={{ color: "#d00000" }}>
                        {" "}
                        {totalScore}pts{" "}
                      </Text>{" "}
                    </Text>
                  </View>
                </View>
              </Modal>
            </ImageBackground>
          </View>
        </ScrollView>
      </View>
    );
  };

  function ProfilePage() {
    const [showDiv, setShowDiv] = useState(false);
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/images/AppBackground.jpg")}
        >
          <View style={{ flex: 0.1, marginVertical: 150 }}></View>
          <Button title="Logout" onPress={logout} />
          {/* <Button title="Log Out" onClick={() => setShowDiv(!showDiv)}>
            Show/Hide
          </Button>
          {showDiv && (
            //console.log("it hit");
            <Image
              source={require("../assets/images/scoob.gif")}
              style={{ width: 1000, height: 1000 }}
            />
          )} */}
        </ImageBackground>
      </View>
    );
  }

  function RulesPage() {
    const [login, setLogin] = React.useState({ email: "", password: "" });

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/images/AppBackground.jpg")}
        >
          <Text style={styles.baseText}>
            Your mission, should you choose to accept it is to Guess the movie
            rating out of 100. You will be given the description of the movie,
            actors, the movie poster, cast, and earned money in box office. You
            will play five rounds, and be rewarded based off how close you were
            to the rating.
          </Text>
          <Image
            source={require("../assets/images/scoob.gif")}
            style={{ width: 100, height: 100 }}
          />
          {/* <Text style={styles.baseText}>
            Description:<Text style={{ color: "white" }}>{desc}</Text>{" "}
          </Text> */}
        </ImageBackground>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Play") {
            iconName = focused ? "play" : "play-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-circle-outline";
            // } else if (route.name === "Watch List") {
            //   iconName = focused ? "film" : "film-outline";
          } else if (route.name === "Rules") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          } else if (route.name === "Leaderboard") {
            iconName = focused ? "trophy" : "trophy-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#e8b923",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#0A0A0A" },
      })}
    >
      <Tab.Screen
        name="Play"
        component={GamePage}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen name="Watch List" component={WatchListPage} /> */}
      <Tab.Screen
        name="Rules"
        component={RulesPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardPage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
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
    fontSize: 20,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    color: "white",
    marginTop: 150,
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

export default HomePage;
