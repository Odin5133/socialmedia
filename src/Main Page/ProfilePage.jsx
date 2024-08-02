import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ProfileBanner from "/profileBanner.jpg";
import ProfilePic from "/Billy.jpeg";
import TempPosttemplate from "./TempPostTemplate";
import Posttemplate from "./Posttemplate";
import { useParams } from "react-router-dom";
import { IconMoodPuzzled } from "@tabler/icons-react";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  let { username } = useParams();

  useEffect(() => {
    console.log(localStorage.getItem("token"), username);
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
          console.log(res.data);
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

  return (
    <div className="text-text w-[90vw] md:w-[62vw] lg:w-[62w] lg:mr-[8vw] font-heading bg-pseudobackground min-h-[80vh]  flex flex-col mt-8 rounded-xl mb-4">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          Loading...
        </div>
      ) : Object.hasOwn(user, "message") === false ? (
        <div className="w-full flex justify-center flex-col">
          <img
            src={user.profileBanner}
            alt="Profile Banner"
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <div className="w-full p-4">
            <div className="flex ml-[1vw]">
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

            <div className="mt-4 ml-[2vw]">
              <p className="text-text text-lg">{user.bio}</p>
            </div>
            {user.myposts.length > 0 && (
              <div>
                <hr className="border-accent mx-6 mt-8" />
                <div className="mt-4 ml-[2vw] text-2xl font-semibold">
                  Your Posts
                </div>
              </div>
            )}
            <div className=" w-full flex flex-col items-center  ">
              {user.myposts &&
                user.myposts.map((post) => (
                  <Posttemplate key={post.id} post={post} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[80vh] w-full justify-center items-center flex-col">
          <IconMoodPuzzled size={160} />
          <span className="text-2xl mt-1">Profile not found</span>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
