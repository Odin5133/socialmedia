import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import Posttemplate from "./Posttemplate";
import FriendsPanel from "./FriendsPanel";
import NavPanel from "./NavPanel";
import Navbar from "./Navbar";

function Feed() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    console.log(`Bearer ${Cookies.get("accessToken")}`);
    fetch("http://127.0.0.1:8000/api/user/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUserName(data.username);
        console.log(data.username);
      })
      .catch((error) =>
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
      );
  }, []);

  return (
    <div>
      <Navbar userName={userName} />
      <div className="flex justify-evenly pt-[calc(8vh)] w-full bg-[#000] relative">
        <NavPanel userName={userName} />
        {/* <div className="flex flex-col items-center text-text font-body relative">
          {posts.map((post) => (
            <Posttemplate key={post.id} post={post} />
          ))}
        </div> */}
        <Outlet />
        <FriendsPanel />
      </div>
    </div>
  );
}

export default Feed;
