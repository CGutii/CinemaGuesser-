import React from "react";
import LeaderboardContainer from "./components/LeaderboardContainer";

function LeaderboardPage() {
  return (
    <>
      <div className="flex justify-center text-pr-white mt-8 md:mt-20">
        <p className="text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl text-pr-white font-bold">
          LeaderBoard
        </p>
      </div>
      <LeaderboardContainer />
    </>
  );
}

export default LeaderboardPage;
