import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Posttemplate from "./Posttemplate";
import FriendsPanel from "./FriendsPanel";
import NavPanel from "./NavPanel";
import Navbar from "./Navbar";

function Feed() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-evenly pt-[calc(8vh)] w-full bg-[#000] relative">
        <NavPanel />
        {/* <div className="flex flex-col items-center text-text font-body relative">
          {posts.map((post) => (
            <Posttemplate key={post.id} post={post} />
          ))}
        </div> */}
        <Outlet />
        {/* <FriendsPanel /> */}
      </div>
    </div>
  );
}

export default Feed;
