// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Request({ friendReq }) {
  const [curFriends, setcurFriends] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://dummyjson.com/users?limit=5&select=firstName,lastName")
  //     .then((res) => {
  //       const usersWithQuotes = res.data.users;
  //       setcurFriends(usersWithQuotes);
  //     });
  // }, []);
  useEffect(() => {
    console.log(friendReq);
  }, []);

  const acceptReq = (id) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/acceptFriendRequest/",
        { request_id: id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      )
      .then((res) => {
        // setFriendReq(res.data);
        console.log(res.data);
      });
  };

  const rejectReq = (id) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/declineFriendRequest/",
        { request_id: id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      )
      .then((res) => {
        // setFriendReq(res.data);
        console.log(res.data);
      });
  };

  return (
    <div>
      {friendReq &&
        friendReq.map((x, i) => (
          <div
            className="border-2 border-accent p-3 m-2 rounded-xl bg-background shadow-[5px_6px_15px_0px_rgba(165,_39,_255,_0.48)]"
            key={i}
          >
            <div
              key={`${x.firstName}-${x.lastName}`}
              className="flex gap-2   overflow-hidden text-ellipsis h-[6vh]"
            >
              <img src={x.from_user_pic} alt="Avatar" className=" h-full" />
              <div className="h-full flex flex-col justify-center w-full items-center text-text font-body text-xl">
                {x.from_user_username}
              </div>
            </div>
            <div className="flex w-full mt-3 justify-around">
              <button
                className="text-text bg-accent  rounded-lg w-[47%]"
                onClick={(e) => {
                  e.preventDefault();
                  acceptReq(x.id);
                }}
              >
                Accept
              </button>
              <button
                className="bg-pseudobackground  text-text py-1 rounded-lg w-[47%] "
                onClick={(e) => {
                  e.preventDefault();
                  rejectReq(x.id);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Request;
