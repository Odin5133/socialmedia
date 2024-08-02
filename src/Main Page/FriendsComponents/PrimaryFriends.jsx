import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PrimaryComp() {
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
        <Link
          to={`profile/hello1`}
          key={`${x.firstName}-${x.lastName}`}
          className="flex gap-2 border-1 border border-primary bg-background text-text p-2 m-2 rounded-xl overflow-hidden text-ellipsis h-[8vh]"
        >
          <img
            src="https://avatar.iran.liara.run/public"
            alt="Avatar"
            className=" h-full"
          />
          <div className="">
            <div className="font-body text-lg">
              {x.firstName} {x.lastName}
            </div>
            <div className=" text-ellipsis truncate text-sm ">{x.quote}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PrimaryComp;
