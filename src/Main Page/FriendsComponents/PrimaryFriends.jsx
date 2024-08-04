import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PrimaryComp({ curFriends }) {
  return (
    <div className="h-[36vh] overflow-y-scroll no-scrollbar">
      {curFriends.map((x) => (
        <Link
          to={`profile/${x.username}`}
          key={x.username}
          className="flex gap-2 border-1 border border-primary bg-background text-text p-2 m-2 rounded-xl overflow-hidden text-ellipsis h-[8vh]"
        >
          <img
            src={x.userPic}
            alt={x.userPic}
            className=" h-full rounded-full"
          />
          <div className="">
            <div className="font-body text-lg">{x.username}</div>
            <div className=" text-ellipsis truncate text-sm ">{x.bio}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PrimaryComp;
