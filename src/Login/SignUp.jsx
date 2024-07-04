import React, { useState, useEffect } from "react";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className=" w-2/5 h-[98vh]  bg-background rounded-xl font-heading ">
      <div className="ml-8">
        <div className="  pt-32  text-5xl  text-primary leading-[0.9]">
          Let's Get Started
        </div>
        <div className="text-secondary text-xl">Ready for a new chapter!</div>
        <div className=" mt-12 text-text">
          <div className="">Username</div>
          <input
            type="text"
            className=" mt-2 rounded-md px-2 py-1 w-[90%] bg-background border-2 border-primary text-text focus:outline-none focus:border-accent"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <div className=" mt-8">E-Mail</div>
          <input
            type="text"
            className=" mt-2 rounded-md px-2 py-1 w-[90%] bg-background border-2 border-primary text-text focus:outline-none focus:border-accent"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className=" mt-8">Password</div>
          <input
            type="password"
            className="mt-2 rounded-md px-2 py-1 w-[90%] bg-background border-2 border-primary text-text focus:outline-none focus:border-accent"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button className="mt-12 rounded-lg bg-accent px-4 py-1 text-xl border-2 border-primary text-text hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
