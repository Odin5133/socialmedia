import React, { useState, useEffect } from "react";
import axios from "axios";

function SuggestedFriends() {
  const [curFriends, setcurFriends] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users?limit=5&select=firstName,lastName")
      .then((res) => {
        const usersWithQuotes = res.data.users;
        axios.get("https://type.fit/api/quotes").then((quoteRes) => {
          usersWithQuotes.forEach((user, index) => {
            user.quote = quoteRes.data[index]?.text || "No quote found";
          });
          setcurFriends(usersWithQuotes);
        });
      });
  }, []);

  return (
    <div className="h-[36vh] overflow-y-scroll no-scrollbar">
      {curFriends.map((x) => (
        <div
          key={`${x.firstName}-${x.lastName}`}
          className="flex gap-2 border-2 border-accent bg-background p-2 m-2 rounded-xl overflow-hidden text-ellipsis items-center "
        >
          <img
            src="https://avatar.iran.liara.run/public"
            alt="Avatar"
            className="h-[8vh] "
          />
          <div className=" flex flex-col items-center w-full">
            <div className="text-text font-body">
              {x.firstName} {x.lastName}
            </div>
            <button className="text-text bg-accent py-1 mt-2 px-2 rounded-lg">
              Follow
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SuggestedFriends;
