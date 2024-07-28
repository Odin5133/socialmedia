import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ProfileBanner from "/profileBanner.jpg";
import ProfilePic from "/Billy.jpeg";
import TempPosttemplate from "./TempPostTemplate";

function ProfilePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log(localStorage.getItem("token"));
    const fetchData = async () => {
      axios
        .post(
          "http://127.0.0.1:8000/api/profile/",
          {
            user2: "hello",
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
        });
    };
    fetchData();
  }, []);

  return (
    <div className="text-text w-[56vw] bg-pseudobackground  flex flex-col mt-8 rounded-xl">
      <img
        src={user.profileBanner}
        alt="Profile Banner"
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="w-full max-w-4xl p-4">
        <div className="flex ml-[1vw]">
          <img
            src={user.profilePic}
            alt="Profile Pic"
            className="rounded-full border-4 border-[#000] shadow-lg h-32 w-32 -mt-16 mb-4"
          />
          <div className="text-center -mt-5">
            <h1 className="text-2xl font-semibold mx-4 text-primary">
              {user.username}
            </h1>
            <p className="text-sm text-gray-600">{user.myfriends} friends</p>
          </div>
        </div>

        <div className="mt-4 ml-[2vw]">
          <p className="text-gray-800">{user.bio}</p>
        </div>
        <div className="mt-8 w-full flex flex-col items-center">
          {user.myposts &&
            user.myposts.map((post) => (
              <TempPosttemplate key={post.id} post={post} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
