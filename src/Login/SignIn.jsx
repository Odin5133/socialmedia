import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      });
  });

  const handleSignIn = () => {
    let user = username;
    let pass = password;
    axios
      .post("https://api.escuelajs.co/api/v1/auth/login", {
        email: "john@mail.com",
        password: "changeme",
      })
      .then((response) => {
        console.log(response.data);
        Cookies.set("accessToken", response.data.access_token, {
          expires: 7,
          secure: true,
        });
        Cookies.set("refreshToken", response.data.refresh_token, {
          expires: 30,
          secure: true,
        });
      });
  };

  return (
    <div className=" w-2/5 h-[98vh]  bg-background rounded-xl font-heading ">
      <div className="ml-8">
        <div className="  pt-32  text-5xl  text-primary leading-[0.9]">
          Welcome Back
        </div>
        <div className="text-secondary text-xl">
          Dive into your personalized haven
        </div>
        <div className=" mt-24 text-text">
          <div className="">Username / E-Mail</div>
          <input
            type="text"
            className=" mt-2 rounded-md px-2 py-1 w-[90%] bg-background border-2 border-primary text-text focus:outline-none focus:border-accent"
            placeholder="InvincibleMe3"
            value={username}
            onChange={handleUsernameChange}
          />
          <div className=" mt-8">Password</div>
          <input
            type="password"
            className="mt-2 rounded-md px-2 py-1 w-[90%] bg-background border-2 border-primary text-text focus:outline-none focus:border-accent"
            placeholder="SuperSecretPassword123"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button
            className="mt-12 rounded-lg bg-accent px-4 py-1 text-xl border-2 border-primary text-text hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
