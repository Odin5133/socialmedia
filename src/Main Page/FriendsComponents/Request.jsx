// import React from "react";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Request() {
  const [curFriends, setcurFriends] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users?limit=5&select=firstName,lastName")
      .then((res) => {
        const usersWithQuotes = res.data.users;
        setcurFriends(usersWithQuotes);
      });
  }, []);
  return (
    <div>
      {curFriends.map((x) => (
        <div className="border-2 border-accent p-3 m-2 rounded-xl bg-background shadow-[5px_6px_15px_0px_rgba(165,_39,_255,_0.48)]">
          <div
            key={`${x.firstName}-${x.lastName}`}
            className="flex gap-2   overflow-hidden text-ellipsis h-[6vh]"
          >
            <img
              src="https://avatar.iran.liara.run/public"
              alt="Avatar"
              className=" h-full"
            />
            <div className="h-full flex flex-col justify-center w-full items-center text-text font-body text-xl">
              {x.firstName} {x.lastName}
            </div>
          </div>
          <div className="flex w-full mt-3 justify-around">
            <button className="text-text bg-accent  rounded-lg w-[47%]">
              Accept
            </button>
            <button className="bg-pseudobackground  text-text py-1 rounded-lg w-[47%] ">
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Request;
