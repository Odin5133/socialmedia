import axios from "axios";
import React, { useState, useEffect } from "react";
import PrimaryComp from "./FriendsComponents/PrimaryFriends";
import Request from "./FriendsComponents/Request";
import SuggestedFriends from "./FriendsComponents/SuggestedFriends";

function FriendsPanel() {
  const [friendSection, setFriendsection] = useState("Primary");

  return (
    <div className="min-w-[15vw] w-[15vw] mr-20">
      <div>
        Friends
        <div className="flex justify-around">
          <div onClick={() => setFriendsection("Primary")}>Primary</div>
          <div onClick={() => setFriendsection("Suggested")}>Suggested</div>
        </div>
        <div>{friendSection === "Primary" && <PrimaryComp />}</div>
        <div>{friendSection === "Suggested" && <SuggestedFriends />}</div>
      </div>
      <div className="mt-8">
        Requests
        <div>
          <Request />
        </div>
      </div>
    </div>
  );
}

export default FriendsPanel;
