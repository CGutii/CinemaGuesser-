import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "@react-navigation/native";
import { SafeAreaView, Text, View } from "react-native";
import { ReactComponent as SubmitBtn } from "../assets/images/SubmitBtn.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlayAgainModal from "./modals/PlayAgainModal";
import RoundModal from "./modals/RoundModal";
//import { sessionStorage } from "Storage";

class Storage {
  constructor() {
    this.data = new Map();
  }

  key(n) {
    return [...this.data.keys()][n];
  }
  getItem(key) {
    return this.data.get(key);
  }
  get length() {
    return this.data.size;
  }

  setItem(key, value) {
    this.data.set(key, value);
  }
  removeItem(key) {
    this.data.delete(key);
  }
  clear() {
    this.data = new Map();
  }
}

let sessionStorage = (globalThis.sessionStorage =
  globalThis.sessionStorage ?? new Storage());

//export { Storage, sessionStorage };

function GameContainer() {
  // const storage = require("../tokenStorage.js");
  // const set_store = async (value, field) => {
  //   try {
  //     await AsyncStorage.setItem(field, JSON.stringify(value));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // async function get_store(field) {
  //   try {
  //     const userData = await AsyncStorage.getItem(field);
  //     console.log(userData);
  //     return userData;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  //1
  // set_store("cake", "movie_mem");
  // //2
  // set_store("potato", "carl");
  // const res = get_store("movie_mem");
  // const ret = get_store("carl");
  // console.log("hello " + res);
  // console.log("no");

  //MOVIE_MEM TO HANDLE REPEAT MOVIES
  //make movie mem if doesn't exist
  //3
  // if (get_store("movie_mem") === null) {
  //   set_store("movie_mem", JSON.stringify({ list: [], head: 0 }));
  // }

  //GET USER DATA
  // let _ud = get_store("user_data");
  // let ud = JSON.parse(_ud);
  // var firstName = ud.firstName;
  // var lastName = ud.lastName;
  
  // console.log("FirstName: "+ firstName +"\nLastName: "+ lastName +"\nLogin: "+ loginName);

  // Code for Movie Info ***************************************************************************************************************
  const [desc, setDesc] = useState(false);
  const [poster, setPoster] = useState(null);
  const [title, setTitle] = useState(false);
  const [boxOffice, setBoxOffice] = useState(false);
  const [genre, setGenre] = useState(false);
  const [actors, setActors] = useState(false);
  const [year, setYear] = useState(false);
  const [rating, setRating] = useState(0);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    loadMovieInfo();
  }, []);

  const loadMovieInfo = async (event) => {
    // event.preventDefault();
    // var movie_memt = JSON.parse(get_store("carl"));
    // var movie_mem = JSON.parse(await get_store("movie_mem"));

    // console.log(movie_mem + "hi");
    // console.log(movie_memt);
    let obj = {
      filter: [],
    };
    let js = JSON.stringify(obj);
    try {
      let bp = require("./Paths.js");
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

      if (res.length == 0 || (res.error && res.error !== "")) {
        // setMessage('Username is taken, please try a different one.');
        //either by default or after filter
        console.log(res.err);
      } else {
        setDesc(res.omdb.Plot);
        setActors(res.omdb.Actors);
        setBoxOffice(res.omdb.BoxOffice);
        setGenre(res.omdb.Genre);
        setPoster(res.omdb.Poster);
        setRating(parseInt(res.omdb.Ratings));
        setTitle(capitalize(res.omdb.Title));
        setYear(res.omdb.Year);
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

        //console.log(res.omdb);
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };
  // End of Code for Movie Info ***********************************************************************************************************************

  // Code for Modal ***********************************************************************************************************************************
  //const navigate = useNavigate();
  const [turnOn, setRoundModal] = useState(false);
  const [turnOny, setPlayAgainModal] = useState(false);
  const [curGuess, setGuess] = useState(1);
  const [round, setRound] = useState(0);
  const [clicked, setClicked] = useState(false);
  let guesses = useRef(null);
  let gg;

  const handleGuess = (event) => {
    // event.preventDefault();
    // console.log(guesses.current.value);

    // if( event.target.value === undefined)
    // {
    //   console.log(true);
    //   guesses = 0;
    //   showModal(event, guesses);
    // }
    // else
    // {
    //   guesses = event.target.value;
    //   showModal(event, guesses);
    // }
    setClicked(true);
    gg = guesses.current.value;
    showModal(event, guesses.current.value);
  };

  function showModal(event, g) {
    event.preventDefault();

    setGuess(curGuess + 1);
    setRound(round + 1);

    // setPrevRating(prevRating);
    setScore(score + pointsAwarded(Math.abs(g - rating)));
    setTotalScore(totalScore + (score + pointsAwarded(Math.abs(g - rating))));

    // setPrevScore(score);
    // console.log("Score: "+score);
    console.log("Rating: " + rating);
    console.log("Guess: " + g);
    // console.log("Total Score: "+totalScore);

    if (curGuess === 5) {
      setGuess(1);

      // console.log(score);
      // setScore(0);
      // console.log("Showing PlayAgainModal");
      // console.log("Users guesses" + g);
      calcScore();
      setPlayAgainModal(true);
    } else {
      setRoundModal(true);
      // loadMovieInfo();
    }

    // console.log(curGuess);
  }

  function closeRoundModal() {
    setRoundModal(false);
    loadMovieInfo();
    setScore(0);
    setClicked(false);
    guesses.current.value = "";
  }

  function closePlayAgainModal() {
    // calcScore();
    setPlayAgainModal(false);
    loadMovieInfo();
    setTotalScore(0);
    setScore(0);
    setRound(0);
    setClicked(false);
    guesses.current.value = "";
  }
  function pointsAwarded(delta) {
    if (delta >= 33) return 0;
    if (delta === 0) return 120;
    return Math.round(100 - 3 * delta);
  }
  // End of Code for Modal *****************************************************************************************************************************

  const [overallPoints, setOverall] = useState(0);
  const calcScore = async (event) => {
    // event.preventDefault();
    //console.log(event);
    //var storage = require('../tokenStorage.js');
    //retrieve token here
    let tok = storage.retrieveToken();
    //add to score
    let obj = {
      login: loginName,
      value: totalScore,
      mode: 1,
      field: "Score",
      jwtToken: tok,
    };
    let js = JSON.stringify(obj);
    try {
      let bp = require("./Paths.js");
      // 'https://cinema-guesser.herokuapp.com/api/op_stats'
      // bp.buildPath('api/op_stats')
      const response = await fetch(bp.buildPath("api/op_stats"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });
      // console.log(res.value);
      let res = JSON.parse(await response.text());

      console.log("Total Points:" + res.value);
      setOverall(res.value);
      //store refreshed token (has accessToken field)
      storage.storeToken(res.jwtToken);

      if (res.error !== "") {
        // setMessage('Username is taken, please try a different one.');
      } else {
        // setMessage('');
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };

  // Decrement/increment guess value for user input
  function decrement(e) {
    e.preventDefault();

    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value--;
    if (value < 1) value = 1;
    if (value > 100) value = 100;
    target.value = value;
  }

  function increment(e) {
    e.preventDefault();

    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    if (value < 1) value = 1;
    if (value > 100) value = 100;
    target.value = value;
  }

  const capitalize = (str, lower = false) =>
    (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
      match.toUpperCase()
    );

  return (
    <View>
      <View className="grid grid-cols-1 sm:grid-cols-2 w-5/6 lg:max-w-screen-lg text-1 md:text-4 gap-x-5 gap-y-4 bg-slate-500 bg-opacity-10 backdrop-blur-sm rounded-md mt-40 sm:mt-0">
        <View className="text-center mt-5">
          <Text className="text-pr-yellow text-xl">
            {title} &#40;{year}&#41;
          </Text>
        </View>
        <View className="min-h-[50px] text-center mt-5">
          <Text className="text-pr-yellow mr-2">Score:</Text>
          <Text className="text-pr-red pr-2 ">{totalScore}pts</Text>
        </View>
        <View className="min-h-[50px] row-text-1 sm:row-text-6 text-center justify-self-center">
          <img
            className="w-32 sm:w-60 sm:h-84 rounded-lg"
            src={poster}
            alt="MoviePoster"
          ></img>
        </View>
        <View className="min-h-[50px] text-center sm:text-left">
          <Text className="text-pr-yellow">Description:</Text>
          <Text className="text-pr-white pr-2">{desc}</Text>
        </View>
        <View className="min-h-[50px] text-center sm:text-left">
          <Text className="text-pr-yellow mr-2">Genre:</Text>
          <Text className="text-pr-white pr-2">{genre}</Text>
        </View>
        <View className="min-h-[50px] text-center sm:text-left">
          <Text className="text-pr-yellow mr-2">Box Office:</Text>
          <Text className="text-pr-white pr-2">{boxOffice}</Text>
        </View>
        <View className="min-h-[50px] text-center sm:text-left">
          <Text className="text-pr-yellow mr-2 ">Actors:</Text>
          <Text className="text-pr-white pr-2">{actors}</Text>
        </View>
        {/* <View className='bg-slate-400 rounded-lg shadow-xl min-h-[50px]'></View> */}
        <View className="min-h-[50px] col-text-1 sm:col-text-2 text-center  ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="sm:flex justify-center sm:flex-wrap"
          >
            {/* <View className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1"> */}
            <button
              data-action="decrement"
              className="flex-none my-1 bg-pr-gray text-pr-black hover:bg-pr-yellow hover:text-pr-white h-full w-8 rounded-2xl cursor-pointer outline-none"
              onClick={decrement}
            >
              <text className="m-auto text-2xl font-light">−</text>
            </button>
            <input
              className="peer h-10 w-32 sm:w-48 border-b-2 border-pr-yellow text-pr-white focus:outline-none bg-transparent focus:placeholder-transparent text-center"
              ref={guesses}
              placeholder="Guess Rating"
              id="guess"
              type="number"
            ></input>
            <button
              data-action="increment"
              className="flex-none my-1 bg-pr-gray text-pr-black hover:bg-pr-yellow hover:text-pr-white h-full w-8 rounded-2xl cursor-pointer outline-none"
              onClick={increment}
            >
              <text className="m-auto text-2xl font-light">+</text>
            </button>
            <button className="mx-6" onClick={!clicked ? handleGuess : null}>
              <SubmitBtn className="mx-6 w-20 sm:w-24 self-center hover:scale-105" />
            </button>
          </form>
        </View>
      </View>
      <RoundModal
        value={turnOn}
        closeRoundModal={closeRoundModal}
        loadMovieInfo={loadMovieInfo}
        rating={rating}
        score={score}
        guess={gg}
        round={round}
      />
      <PlayAgainModal
        value={turnOny}
        closePlayAgainModal={closePlayAgainModal}
        loadMovieInfo={loadMovieInfo}
        rating={rating}
        totalScore={totalScore}
        score={score}
        guess={gg}
        overallPoints={overallPoints}
      />
    </View>
  );
}
export default GameContainer;
