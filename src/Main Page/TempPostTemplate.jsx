import React, { useState, useEffect } from "react";
import Temp from "/back1.jpg";
import {
  IconArrowBigUpLine,
  IconArrowBigDownLine,
  IconArrowBigDownLineFilled,
  IconArrowBigUpLineFilled,
  IconBookmarks,
  IconBookmarksFilled,
} from "@tabler/icons-react";

// Posttemplate.jsx
function Posttemplate({ post }) {
  const [imageSrc, setImageSrc] = useState(Temp);

  // console.log(post);

  const loadImage = () => {
    setImageSrc(post.image);
  };

  return (
    <div className=" rounded-xl pt-4 w-[90vw] border border-gray-600 mt-[10px] bg-pseudobackground md:w-[45vw] lg:w-[45w]">
      <h2 className=" text-xl  px-8 text-bold">{post.title}</h2>
      {post.image && (
        <div className="mt-1 mx-8 flex justify-center bg-[#22272b]">
          <img
            src={imageSrc}
            alt={post.title}
            onLoad={loadImage}
            data-src={post.image}
            className=" "
          />
          {/* <img src={post.image} alt={post.title} className=" " /> */}
          {/* {post.image} */}
        </div>
      )}
      {post.body && (
        <p className=" text-[#899bad]  text-[0.95rem] mt-1 px-8">{post.body}</p>
      )}
      <div className="flex px-8 justify-between mb-4 mt-[10px] ">
        <div className="flex items-center">
          <div className="border bg-slate-500 flex rounded-[10px] py-1 px-2">
            <IconArrowBigUpLine />
            {post.likesCount}
            <div className=" ml-2 flex">
              <IconArrowBigDownLine />
              {post.dislikesCount}
            </div>
          </div>
          <div className="ml-4">
            <IconBookmarks />
          </div>
        </div>
        <div className="flex items-center">
          <div>Report</div>
        </div>
      </div>
    </div>
  );
}

export default Posttemplate;
