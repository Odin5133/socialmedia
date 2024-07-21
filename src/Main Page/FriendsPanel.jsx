import axios from "axios";
import React, { useState, useEffect } from "react";
import PrimaryComp from "./FriendsComponents/PrimaryFriends";
import Request from "./FriendsComponents/Request";
import SuggestedFriends from "./FriendsComponents/SuggestedFriends";

function FriendsPanel() {
  const [friendSection, setFriendsection] = useState("Primary");

  return (
    <div className="min-w-[17vw] w-[17vw] hidden lg:block mt-8 ">
      <div className="border-4 border-accent rounded-3xl px-2 pt-1 pb-3">
        <span className="text-primary text-2xl tracking-normal font-body leading-relaxed pl-4">
          Friends Tab
        </span>
        <div className="flex justify-around text-text mb-2 mt-2 ">
          <div
            onClick={() => setFriendsection("Primary")}
            className="text-lg font-body"
          >
            Primary
          </div>
          <div
            onClick={() => setFriendsection("Suggested")}
            className="text-lg font-body"
          >
            Suggested
          </div>
        </div>
        <div>{friendSection === "Primary" && <PrimaryComp />}</div>
        <div>{friendSection === "Suggested" && <SuggestedFriends />}</div>
      </div>
      <div className="mt-8">
        <span className=" text-primary w-full flex justify-center text-xl">
          Requests
        </span>
        <div>
          <Request />
        </div>
      </div>
    </div>
  );
}

export default FriendsPanel;
