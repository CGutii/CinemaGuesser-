import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { View, ImageBackground, Text } from "react-native";

const TableExample = () => {
  const [list, setList] = useState([]);
  let [maxPage, setMaxPage] = useState();
  let [page, setPage] = useState(0);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async (event) => {
    let obj = {
      page: page,
      per_page: 10,
      sortby: "Score",
    };
    let js = JSON.stringify(obj);
    try {
      // let bp = require('./Paths.js');
      // 'https://cinema-guesser.herokuapp.com/api/leaderboard'
      // bp.buildPath('api/leaderboard')
      const response = await fetch(
        "https://cinema-guesser.herokuapp.com/api/leaderboard",
        {
          method: "POST",
          body: js,
          headers: { "Content-Type": "application/json" },
        }
      );

      let res = JSON.parse(await response.text());

      setMaxPage(Math.ceil(res.count / 10));
      setList(res.list);

      // console.log(list);

      //store refreshed token (has accessToken field)
      // storage.storeToken(res.jwtToken);

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

  function combineNames(firstName, lastName) {
    if (lastName === null) {
      return firstName;
    } else if (firstName === null) return lastName;
    else return firstName + " " + lastName.substring(0, 1).toUpperCase();
    // let name = firstName + " "+lastName.substring(0, 1).toUpperCase();
    // console.log(name);
    // return name;
  }

  function prevPage(e) {
    e.preventDefault();

    if (page === 0) {
      //alert("Can't go back any further.")
      return;
    } else {
      setPage((page = page - 1));
      loadLeaderboard();
      //console.log('lol');
    }
  }

  function nextPage(e) {
    e.preventDefault();
    if (page === maxPage - 1) {
      //alert("End of List.")
      return;
    } else {
      setPage((page = page + 1));
      loadLeaderboard();
    }
  }

  return (
    <View>
      <ImageBackground
        style={styles.background}
        source={require("../assets/images/AppBackground.jpg")}
      >
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title style={styles.tableHeader}>
              <Text style={{ color: "#FFD700" }}>Rank</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.tableHeader}>
              <Text style={{ color: "#FFD700" }}>Username</Text>
            </DataTable.Title>
            <DataTable.Title style={styles.tableHeader}>
              <Text style={{ color: "#FFD700" }}>Score</Text>
            </DataTable.Title>
          </DataTable.Header>
          {list.map((listItem, idx) => (
            <DataTable.Row>
              <DataTable.Cell style={styles.container2}>
                <Text style={{ color: "#fff" }}>{listItem.Rank}</Text>
                {/* {listItem.Rank} */}
              </DataTable.Cell>
              <DataTable.Cell style={styles.container2}>
                <Text style={{ color: "#fff" }}>{listItem.Login}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.container2}>
                <Text style={{ color: "#fff" }}>{listItem.Score}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ImageBackground>
    </View>
  );
};

export default TableExample;

const styles = StyleSheet.create({
  container: {
    padding: 100,
    backgroundColor: "#transparent",
    width: 400,
  },
  tableHeader: {
    backgroundColor: "#transparent",
    width: 225,
  },
  container2: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
  },
});
