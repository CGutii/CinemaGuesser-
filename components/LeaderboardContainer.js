import React, { useState, useEffect } from "react";

function LeaderboardContainer() {
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
    <>
      <div className="flex flex-col justify-between m-8 md:m-20 min-h-[46rem]">
        <table className="w-screen sm:w-1/3 max-w-2xl bg-slate-500 bg-opacity-10 backdrop-blur-sm rounded-lg self-center mb-4">
          <thead className="text-left bg-slate-500 bg-opacity-5 backdrop-blur-sm">
            <tr className="text-pr-yellow text-xl">
              <th className="w-10 sm:w-20 px-4 py-4 rounded-tl-lg">Rank</th>
              <th className="w-20 sm:w-40 px-4 py-4">Name</th>
              <th className="w-20 sm:w-48 px-4 py-4">Score</th>
            </tr>
          </thead>
          <tbody className="text-left text-pr-white">
            {list.map((listItem, idx) => (
              <tr
                className="last:rounded-b-lg last:border-b-0 hover:bg-pr-black hover:bg-opacity-70 border-b border-pr-white border-opacity-10"
                key={listItem.Login}
              >
                <td className="text-md text-white font-medium px-4 py-4 whitespace-nowrap">
                  {listItem.Rank}
                </td>
                <td className="text-md text-white font-medium px-4 py-4 whitespace-nowrap">
                  {combineNames(listItem.FirstName, listItem.LastName)}
                </td>
                <td className="text-md text-white font-medium px-4 py-4 whitespace-nowrap">
                  {listItem.Score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="self-center ">
          {/* <button className = 'mr-5'onClick={prevPage}><img className = '' src = {leftArrow} alt = 'left-arrow'></img></button> */}
          <button
            className="m-4 bg-pr-yellow text-pr-black hover:bg-pr-yellow hover:text-pr-white w-12 h-12 rounded-3xl cursor-pointer outline-none"
            onClick={prevPage}
          >
            <span className="leading-[1.2rem] text-3xl font-normal">←</span>
          </button>
          {/* <button  onClick={nextPage  }> <img className = '' src = {rightArrow} alt = 'right-arrow'></img> </button> */}
          <button
            className="m-4 bg-pr-yellow text-pr-black hover:bg-pr-yellow hover:text-pr-white w-12 h-12 rounded-3xl cursor-pointer outline-none"
            onClick={nextPage}
          >
            <span className="leading-[1.2rem] text-3xl font-normal">→</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default LeaderboardContainer;
