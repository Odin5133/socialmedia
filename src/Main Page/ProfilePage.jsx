import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import TempPosttemplate from "./TempPostTemplate";
import { useParams } from "react-router-dom";
import {
  IconMoodPuzzled,
  IconGhost2Filled,
  IconExclamationCircleFilled,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  let { username } = useParams();
  const [realuser, setRealUser] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("token"), username);

    axios
      .get("http://127.0.0.1:8000/api/user/", {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRealUser(res.data.username);
      })
      .catch((err) => {
        console.log(err);
      });

    const fetchData = async () => {
      axios
        .post(
          "http://127.0.0.1:8000/api/profile/",
          {
            user2: username,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data, username);
          setUser(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    fetchData();
  }, [username]);

  const follow = async (namex) => {
    console.log(namex);
    axios
      .post(
        "http://127.0.0.1:8000/api/sendFriendRequest/",
        {
          to_username: namex,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const updatedSuggestedFriends = suggestedFriends.filter(
          (friend) => friend.username !== namex
        );
        setSuggestedFriends(updatedSuggestedFriends);
        console.log(updatedSuggestedFriends);
        toast(
          <span className="flex text-[#3fb041]  gap-1 items-center">
            <IconCircleCheckFilled className="text-[#41b743] " size={19} />
            Friend Request Sent to {namex}
          </span>
        );
        const p = user;
        p.isFriend = true;
        setUser(p);
      })
      .catch((err) => {
        if (
          err &&
          err.response &&
          err.reponse.data &&
          err.response.data.message &&
          err.response.data.message === "Friend request already sent"
        ) {
          const updatedSuggestedFriends = suggestedFriends.filter(
            (friend) => friend.username !== namex
          );
          setSuggestedFriends(updatedSuggestedFriends);
          toast(
            <span className="flex text-[#3fb041]  gap-1 items-center">
              <IconCircleCheckFilled className="text-[#41b743] " size={19} />
              Friend Request Sent to {namex}
            </span>
          );
        } else {
          toast(
            <span className="flex text-[#b03f3f]  gap-1 items-center">
              <IconExclamationCircleFilled
                className="text-[#b74141] "
                size={19}
              />
              An error occured
            </span>
          );
        }
      });
  };

  return (
    <div className="text-text w-[90vw] md:w-[45vw] lg:w-[45w]  font-heading  min-h-[80vh]  flex flex-col mt-8  mb-4">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          Loading...
        </div>
      ) : Object.hasOwn(user, "message") === false ? (
        <div className=" ">
          <div className="w-full flex justify-center flex-col bg-pseudobackground rounded-xl ">
            <img
              src={user.profileBanner}
              alt="Profile Banner"
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="w-full p-4">
              <div className="w-full flex justify-between ">
                <div className="flex ml-[1vw] ">
                  <img
                    src={user.profilePic}
                    alt="Profile Pic"
                    className="rounded-full border-4 border-[#000] shadow-lg h-32 w-32 -mt-16 mb-4"
                  />
                  <div className="text-center -mt-5 ml-4">
                    <h1 className="text-2xl font-semibold mx-2 leading-9 mt-2 text-primary md:3xl">
                      {user.username}
                    </h1>
                    <p className="text-sm md:text-base text-text ">
                      {user.myfriends} friends
                    </p>
                  </div>
                </div>
                {user.isFriend === false && (
                  <div className="mr-8">
                    <motion.button
                      className=" rounded-lg bg-accent px-4 py-1 text-xl text-text duration-200 hover:bg-accent2"
                      type="submit"
                      whileTap={{ scale: 0.85 }}
                      onClick={() => follow(user.username)}
                    >
                      Follow
                    </motion.button>
                  </div>
                )}
              </div>
              <div className="mt-4 ml-[2vw]">
                <p className="text-text text-lg">{user.bio}</p>
              </div>
              {realuser === user.username && (
                <Link
                  to={`/feed/profile/editProfile/${username}`}
                  className="flex justify-end w-full text-background text-sm font-serif underline"
                >
                  Edit Profile
                </Link>
              )}
            </div>
          </div>
          {user.myposts && user.myposts !== null && user.myposts.length > 0 ? (
            <div className="rounded-xl bg-pseudobackground mt-4 py-2">
              <div className="mt-4 ml-[3vw] text-[2rem] tracking-wider font-semibold leading-9">
                Your Posts
              </div>

              <div className=" w-full flex flex-col items-center  ">
                {user.myposts &&
                  user.myposts.map((post) => (
                    <TempPosttemplate key={post.id} post={post} />
                  ))}
              </div>
            </div>
          ) : (
            <EmptyFeed user={user} realuser={realuser} />
          )}
        </div>
      ) : (
        <div className="flex h-[80vh] w-full justify-center items-center flex-col bg-pseudobackground rounded-xl">
          <IconMoodPuzzled size={160} />
          <span className="text-2xl mt-1">Profile not found</span>
        </div>
      )}
    </div>
  );
}

const EmptyFeed = ({ user, realuser }) => {
  return (
    <div className="rounded-xl pt-4 w-[90vw]  mt-8 bg-pseudobackground md:w-[45vw] lg:w-[45vw] font-body min-h-[40vh] flex flex-col justify-evenly items-center ">
      <div>
        <IconGhost2Filled size={150} className=" text-background" />
        <div className="mt-4 font-semibold text-pseudobackground2 text-base text-center">
          Your{" "}
          {realuser !== user.username && user.isFriend
            ? "friend's"
            : realuser !== user.username && `${user.username}'s`}{" "}
          Feed looks....... empty{" "}
        </div>
      </div>
      {realuser === user.username && (
        <div className="mt-2 px-10 text-xl text-center ">
          Time to create New Posts!!!
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
