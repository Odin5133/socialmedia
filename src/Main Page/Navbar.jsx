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

function Navbar({ userName }) {
  // let [name, setName] = useState("Adrian Lobo");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between fixed w-full items-center z-50 min-h-[5vh] bg-[#000] font-body top-0 left-0 text-text drop-shadow-xl shadow-text">
        <div className="flex gap-3 pl-[max(20px,7vw)] h-full items-center">
          <IconAlignBoxCenterMiddle
            className="sm:hidden"
            onClick={() => setIsMenuOpen(true)}
          />

          <IconTopologyStar3 />
          <span className="text-xl text-accent tracking-wider font-black">
            Sozialen Medien
          </span>
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
              <Link to="" className="text-xl text-text">
                Home
              </Link>
              <Link to="manageFriends" className="text-xl text-text">
                Manage Friends
              </Link>
              <Link to="communities" className="text-xl text-text">
                Communities
              </Link>
              <Link to="new_post" className="text-xl text-text">
                Post
              </Link>
              <Link to="new_community" className="text-xl text-text">
                New Community
              </Link>
            </section>
            <section className="flex flex-col gap-4">
              <div className="text-xl text-text">Saved Posts</div>
              <div className="text-xl text-text">Logout</div>
            </section>
          </div>
        </div>
        <div className="flex gap-3 h-full items-center pr-[max(20px,8vw)]">
          <IconInputSearch />
          <IconBellMinusFilled />
          <IconUserCircle stroke={1} />
          <div className="flex flex-col ">
            <div className=" text-lg">Hello,</div>
            <div className=" text-base ">{userName}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
