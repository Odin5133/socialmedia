import axios from "axios";
import React, { useState, useEffect } from "react";
import PrimaryComp from "./FriendsComponents/PrimaryFriends";
import Request from "./FriendsComponents/Request";
import SuggestedFriends from "./FriendsComponents/SuggestedFriends";
import Cookies from "js-cookie";

function FriendsPanel() {
  const [friendSection, setFriendsection] = useState("Primary");
  const [friendReq, setFriendReq] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(
          "http://127.0.0.1:8000/api/pendingRequests/",
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        )
        .then((res) => {
          setFriendReq(res.data);
          console.log(res.data);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="min-w-[17vw] w-[17vw] hidden lg:block mt-8 ">
      <div className="border-4 border-accent rounded-3xl px-2 pt-1 pb-3">
        <span className="text-primary text-2xl tracking-normal font-body leading-relaxed pl-4">
          Friends Tab
        </span>
        <div className="flex justify-around text-text mb-2 mt-2 ">
          <div
            onClick={() => setFriendsection("Primary")}
            className="text-lg font-body cursor-pointer"
          >
            Primary
          </div>
          <div
            onClick={() => setFriendsection("Suggested")}
            className="text-lg font-body cursor-pointer"
          >
            Suggested
          </div>
        </div>
        <div>{friendSection === "Primary" && <PrimaryComp />}</div>
        <div>{friendSection === "Suggested" && <SuggestedFriends />}</div>
      </div>
      {friendReq.length > 0 && (
        <div className="mt-8">
          <span className="text-primary w-full flex justify-center text-xl">
            Requests
          </span>
          <div>
            <Request friendReq={friendReq} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FriendsPanel;
