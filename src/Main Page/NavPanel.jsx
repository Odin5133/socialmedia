// import React from "react";
import React, { useState, useEffect } from "react";
import { IconUserCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function NavPanel({ userName }) {
  const test = (e) => {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-[min(20vw,200px)] mt-8 hidden md:block sticky top-24 left-0 h-0">
      <div className=" flex-col justify-between h-[calc(100vh-10rem)] sticky border rounded-2xl border-4 border-accent bg-pseudobackground p-4 flex">
        <div className="flex w-full justify-evenly border border-2 bg-text rounded-xl px-2 py-4">
          <IconUserCircle stroke={2} />
          <span className="text-center">{userName}</span>
        </div>
        <ul className="flex flex-col gap-6">
          <Link
            to=""
            className=" hover:border-accent hover:underline- duration-300 hover:tracking-wider text-text font-body flex w-full justify-center text-lg px-2 py-1 rounded-lg bg-pseudobackground text-center cursor-pointer active:tracking-normal "
          >
            Home
          </Link>
          <Link
            to="manageFriends"
            className=" hover:border-accent hover:underline- duration-300 hover:tracking-wider text-text font-body w-full justify-center text-lg px-2 py-1 rounded-lg bg-pseudobackground text-center cursor-pointer active:tracking-normal flex lg:hidden "
          >
            Manage Friends
          </Link>
          <Link
            to="communities"
            className=" hover:border-accent duration-300 hover:tracking-wider text-text font-body flex w-full justify-center text-lg px-2 py-1 rounded-lg bg-pseudobackground text-center cursor-pointer active:tracking-normal "
          >
            Communites
          </Link>
          <Link
            to="new_post"
            className=" hover:border-accent hover:underline- duration-300 hover:tracking-wider text-text font-body flex w-full justify-center text-lg px-2 py-1 rounded-lg bg-pseudobackground text-center cursor-pointer active:tracking-normal "
          >
            Post
          </Link>
          <Link
            to="new_community"
            className=" hover:border-accent hover:underline- duration-300 hover:tracking-wider text-text font-body flex w-full justify-center text-lg px-2 py-1 rounded-lg bg-pseudobackground text-center cursor-pointer active:tracking-normal "
          >
            New Commnunity
          </Link>
          {/* <li>Saved Posts</li> */}
        </ul>
        <div className="flex flex-col gap-2">
          <Link className="border-primary border-2 text-text active:bg-accent2 duration-300 hover:bg-accent hover:border-accent active:tracking-tight font-body flex w-full justify-center text-lg px-2 py-1 rounded-lg bg-pseudobackground text-center ">
            Saved Posts
          </Link>
          <Link
            className="border-2 border-[#a6bfcd]  text-[#a6bfcd] flex w-full justify-center text-base px-2 py-1 rounded-lg bg-pseudobackground text-center active:tracking-normal hover:text-[#000] 
            hover:tracking-wider hover:bg-[#a6bfcd] duration-300 hover:border-bg-[#a6bfcd]"
            onClick={test}
            to="/"
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavPanel;
