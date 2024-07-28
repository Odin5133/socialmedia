import React, { useState, useEffect, useRef } from "react";
import Temp from "/back1.jpg";
import {
  IconArrowBigUpLine,
  IconArrowBigDownLine,
  IconArrowBigDownLineFilled,
  IconArrowBigUpLineFilled,
  IconBookmarks,
  IconBookmarksFilled,
} from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";

// Posttemplate.jsx
function Posttemplate({ post }) {
  const [imageSrc, setImageSrc] = useState(Temp);
  const [liked, setLiked] = useState(post.userReacted === 1 ? true : false);
  const [animate, setAnimate] = useState(false);
  const [disliked, setDisliked] = useState(
    post.userReacted === 2 ? true : false
  );
  const [dislikeAnimate, setDislikeAnimate] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likesCount);
  const [dislikeCount, setDislikeCount] = useState(post.dislikesCount);
  const [bookmarked, setBookmarked] = useState(false);

  // console.log(post);

  const likePost = (flag) => {
    console.log(flag, post.id);
    axios
      .post(
        "http://127.0.0.1:8000/api/likePost/",
        { addORremove: flag, postID: post.id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  const DislikePost = (flag) => {
    axios
      .post(
        "http://127.0.0.1:8000/api/dislikePost/",
        { addORremove: flag, postID: post.id },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  const loadImage = () => {
    setImageSrc(post.image);
  };

  const toggleLike = () => {
    // console.log(likeCount);
    if (liked) {
      setLikeCount(likeCount - 1);
      likePost(false);
    } else {
      setLikeCount(likeCount + 1);
      likePost(true);
    }
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
      setDislikeCount(dislikeCount - 1);
      DislikePost(false);
    }
    // console.log(likeCount);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500); // Reset animation to allow re-triggering
  };

  const toggleDislike = () => {
    if (disliked) {
      setDislikeCount(dislikeCount - 1);
      DislikePost(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      DislikePost(true);
    }

    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
      likePost(false);
    }
    setDislikeAnimate(true);
    setTimeout(() => setDislikeAnimate(false), 500); // Reset animation to allow re-triggering
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
        </div>
      )}
      {post.body && (
        <p className=" text-[#899bad]  text-[0.95rem] mt-1 px-8">{post.body}</p>
      )}
      <div className="flex px-8 justify-between mb-4 mt-[10px] ">
        <div className="flex items-center">
          <div className="border bg-slate-500 flex rounded-[10px] py-1 px-2">
            <div className="">
              {liked ? (
                <IconArrowBigUpLineFilled
                  onClick={toggleLike}
                  color="#8220e1"
                  className={`${animate ? "animate-like" : ""} cursor-pointer`}
                />
              ) : (
                <IconArrowBigUpLine
                  onClick={toggleLike}
                  className={`${animate ? "animate-like" : ""} cursor-pointer`}
                />
              )}
            </div>
            {likeCount}
            <div className=" ml-2 flex">
              <div className="">
                {disliked ? (
                  <IconArrowBigDownLineFilled
                    onClick={toggleDislike}
                    color="#899bad"
                    className={`${
                      dislikeAnimate ? "animate-dislike" : ""
                    } cursor-pointer`}
                  />
                ) : (
                  <IconArrowBigDownLine
                    onClick={toggleDislike}
                    className={`${
                      dislikeAnimate ? "animate-dislike" : ""
                    } cursor-pointer`}
                  />
                )}
              </div>
              {dislikeCount}
            </div>
          </div>
          <div className="ml-4">
            {bookmarked ? (
              <IconBookmarksFilled
                onClick={() => setBookmarked(!bookmarked)}
                className="cursor-pointer active:scale-105 duration-75"
              />
            ) : (
              <IconBookmarks
                onClick={() => setBookmarked(!bookmarked)}
                className="cursor-pointer active:scale-110 duration-75"
              />
            )}
            {/* <IconBookmarks/> */}
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

// body:"Kandy"
// community:"DayzOutGang"
// created_at:"2024-07-22T13:57:12.421155Z"
// dislikesCount:0
// id:7
// image:"/socialmed/files/postpics/uploaded_image.jpg"
// imgorvid:1
// likesCount:0
// nsfw:false
// title:"Hello"
// user:1003
// userReacted:0
