import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import FriendsPanel from "./FriendsPanel";
import NavPanel from "./NavPanel";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function Feed() {
  const [userName, setUserName] = useState("");
  const [curFriends, setCurFriends] = useState([]);
  const [profilePic, setProfilePic] = useState("");
  const location = useLocation();

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

    axios
      .post(
        "http://127.0.0.1:8000/api/myFriends/",
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      )
      .then((res) => {
        setCurFriends(res.data);
        // console.log(res.data[0].userPic);
        setProfilePic(res.data[0].userPic);
      });
  }, []);

  return (
    <div>
      <Toaster />
      <Navbar userName={userName} profilePic={profilePic} />
      <div className="flex justify-evenly pt-[calc(8vh)] min-h-screen w-full bg-[#000]  bg-cover  relative">
        <NavPanel userName={userName} profilePic={profilePic} />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ y: -20, opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-text font-body relative min-w-[90vw]
md:min-w-[45vw] lg:min-w-[45w]"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        {/* <Outlet /> */}
        <FriendsPanel curFriends={curFriends} />
      </div>
    </div>
  );
}

export default Feed;
