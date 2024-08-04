// import React from "react";
import React, { useState, useEffect } from "react";

import {
  IconAlignBoxCenterMiddle,
  IconTopologyStar3,
  IconInputSearch,
  IconBellMinusFilled,
  IconUserCircle,
  IconX,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar({ userName, profilePic }) {
  // let [name, setName] = useState("Adrian Lobo");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect(() => {
  //   console.log(profilePic);
  // }, []);

  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    // axios
    //   .post("http://127.0.0.1:8000/api/logout/")
    //   .then((response) => {
    //     // axios.defaults.headers.common[
    //     //   "Authorization"
    //     // ] = `Bearer ${response.data["token"]}`;
    //     console.log("Yippee ki-yay, mother");
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    fetch("http://127.0.0.1:8000/api/logout/", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // return response.json(); // main learning that I got from this is that we need to return response.json() to execute django html code that is being returned
      })
      .then((data) => {
        Cookies.remove("accessToken");
        console.log("Yippee ki-yay, mother");
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createAccessToken = () => {
    console.log("Creating access token");
    axios
      .post(
        "http://127.0.0.1:8000/api/refresh/",
        { Cookies },
        { withCredentials: true }
      )
      .then((response) => {
        // Cookies.set("accessToken", response.data.token, {
        //   sameSite: "None"
        // });
        // do we need to check response.status == 200?
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["token"]}`;
        console.log("Yippee ki-yay, mother");
        console.log(response.data);
        Cookies.set("accessToken", response.data.token, { expires: 7 });
        return 1;
      })
      .catch((err) => {
        console.log(err, "error");
        navigate("/");
        return 0;
      });
  };

  const isLoggedIn = () => {
    // console.log(`Bearer ${Cookies.get("accessToken")}`);
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
        console.log(data);
        return 1;
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        createAccessToken();
      });
  };

  return (
    <div>
      <div className="flex justify-between fixed w-full items-center z-20 min-h-[5vh] bg-[#000] font-body top-0 left-0 text-text drop-shadow-xl shadow-text py-4 md:py-0">
        <div className="flex gap-3 pl-[max(20px,7vw)] h-full items-center">
          <IconAlignBoxCenterMiddle
            className="sm:hidden"
            onClick={() => setIsMenuOpen(true)}
          />

          <IconTopologyStar3 />
          <Link
            to=""
            className="text-xl text-accent tracking-wider font-black "
          >
            Sozialen Medien
          </Link>
        </div>
        <div
          className={clsx(
            "fixed h-screen w-screen sm:hidden  backdrop-blur-lg transition-all top-0 right-0 z-50   -translate-x-full ",
            isMenuOpen && "translate-x-0 bg-background/50"
          )}
        >
          <div className="flex flex-col justify-between absolute left-0 top-0 w-56 items-start h-full p-4 bg-pseudobackground ">
            <div className="text-2xl text-accent flex items-center gap-1">
              <IconX
                className="text-text"
                onClick={() => setIsMenuOpen(false)}
              />
              Menu
            </div>
            <section className="flex flex-col gap-4">
              <Link to="" onClick={isLoggedIn} className="text-xl text-text">
                Home
              </Link>
              <Link
                to="manageFriends"
                onClick={isLoggedIn}
                className="text-xl text-text"
              >
                Manage Friends
              </Link>
              <Link
                to="communities"
                onClick={isLoggedIn}
                className="text-xl text-text"
              >
                Communities
              </Link>
              <Link to="" onClick={isLoggedIn} className="text-xl text-text">
                Search{" "}
              </Link>
              <Link
                to="new_post"
                onClick={isLoggedIn}
                className="text-xl text-text"
              >
                New Post
              </Link>
              <Link
                to="new_community"
                onClick={isLoggedIn}
                className="text-xl text-text"
              >
                New Community
              </Link>
            </section>
            <section className="flex flex-col gap-4">
              <div className="text-xl text-text">Saved Posts</div>
              <div className="text-xl text-text" onClick={logout}>
                Logout
              </div>
            </section>
          </div>
        </div>
        <div className="flex gap-3 h-full items-center pr-[max(20px,8vw)]">
          <IconInputSearch className="hidden md:block" />
          {/* <IconBellMinusFilled /> */}
          <Link
            to={`profile/${userName}`}
            onClick={isLoggedIn}
            className="flex gap-2 h-full items-center pl-4"
          >
            {/* <IconUserCircle stroke={1} /> */}
            <img src={profilePic} className=" rounded-full  h-10" />
            <div className="flex flex-col ">
              <div className=" text-lg hidden md:block">Hello,</div>
              <div className=" text-base ">{userName}</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
