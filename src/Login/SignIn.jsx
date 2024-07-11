import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signOps, setSignOps] = useState(1);
  const [usernameSignUp, setUsernameSignUp] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChangeSignUp = (e) => {
    setUsernameSignUp(e.target.value);
  };

  const handleEmailChangeSignUp = (e) => {
    setEmailSignUp(e.target.value);
  };

  const handlePasswordChangeSignUp = (e) => {
    setPasswordSignUp(e.target.value);
  };

  const handleSignUp = () => {
    if (email == "" || password == "") {
      alert("Please fill all the fields");
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/register/", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  // useEffect(() => {
  //   console.log(`Bearer ${Cookies.get("accessToken")}`);
  //   fetch("http://127.0.0.1:8000/api/user/", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${Cookies.get("accessToken")}`,
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((error) =>
  //       console.error(
  //         "There has been a problem with your fetch operation:",
  //         error
  //       )
  //     );
  // }, []);
  useEffect(() => {
    createAccessToken();
  }, []);

  const createAccessToken = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/refresh/",
        { Cookies },
        { withCredentials: true }
      )
      .then((response) => {
        // Cookies.set("accessToken", response.data.token, {
        //   sameSite: "None"
        // });
        // do we need to check response.status == 200?
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["token"]}`;
        console.log("Yippee ki-yay, mother");
        console.log(response.data);
        Cookies.set("accessToken", response.data.token, { expires: 7 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      credentials: "include", // Necessary for cookies to be sent with requests
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login successful:", data);
        // Assuming the accessToken is still being sent in the response body
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data["token"]}`;
        navigate("/feed");
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
    createAccessToken();
  };

  const test = (e) => {
    e.preventDefault();
    // axios
    //   .post("http://127.0.0.1:8000/api/logout/")
    //   .then((response) => {
    //     // axios.defaults.headers.common[
    //     //   "Authorization"
    //     // ] = `Bearer ${response.data["token"]}`;
    //     console.log("Yippee ki-yay, mother");
    //     console.log(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    fetch("http://127.0.0.1:8000/api/logout/", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // return response.json(); // main learning that I got from this is that we need to return response.json() to execute django html code that is being returned
      })
      .then((data) => {
        console.log("Yippee ki-yay, mother");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" bg-[#000] p-[1vh] m-0 h-screen">
      <div className=" w-[35vw] h-[98vh]  bg-background rounded-xl font-heading ">
        <div className="ml-8">
          <div className="  pt-32  text-5xl  text-primary leading-[0.9]">
            {signOps ? "Welcome Back" : "Let's Get Started"}
          </div>
          <div className="text-secondary text-xl">
            {signOps
              ? "Dive into your personalized haven"
              : "Ready for a new chapter!"}
          </div>
          <div className="flex  rounded-md mt-16 gap-2 w-[90%] justify-around px-2 relative items-center text-xl text-text border-primary border-2">
            <motion.div
              className=" absolute w-[49%] rounded-md h-[calc(100%-5px)]  bg-accent "
              initial={{ x: "-50%" }}
              animate={{ x: signOps ? "-50%" : "50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 29 }}
            />
            <div
              className="z-10 w-full flex justify-center cursor-pointer"
              onClick={() => setSignOps(1)}
            >
              Sign In
            </div>
            <div
              className="z-10 w-full flex justify-center cursor-pointer"
              onClick={() => setSignOps(0)}
            >
              Sign Up
            </div>
          </div>
          {signOps ? (
            <div className=" mt-10 text-text">
              <form onSubmit={handleSignIn}>
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
                <motion.button
                  className="mt-12 rounded-lg bg-accent px-4 py-1 text-xl border-2 border-primary text-text hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  type="submit"
                  initial={{ y: "170%" }}
                  animate={{ y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 29 }}
                >
                  Sign In
                </motion.button>
                <br />
                <button
                  className="mt-12 rounded-lg bg-accent px-4 py-1 text-xl border-2 border-primary text-text hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  onClick={test}
                >
                  Sign Out
                </button>
              </form>
            </div>
          ) : (
            <div className=" mt-10 text-text">
              <div className="">Username</div>
              <input
                type="text"
                className=" mt-2 rounded-md px-2 py-1 w-[90%] bg-background border-2 border-primary text-text focus:outline-none focus:border-accent"
                placeholder="Username"
                value={usernameSignUp}
                onChange={handleUsernameChangeSignUp}
              />
              <div className=" mt-8">E-Mail</div>
              <input
                type="text"
                className=" mt-2 rounded-md px-2 py-1 w-[90%] bg-background border-2 border-primary text-text focus:outline-none focus:border-accent"
                placeholder="Email"
                value={emailSignUp}
                onChange={handleEmailChangeSignUp}
              />
              <motion.div
                className=" mt-8"
                initial={{ y: "-170%" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 29 }}
              >
                Password
              </motion.div>
              <motion.input
                type="password"
                className="mt-2 rounded-md px-2 py-1 w-[90%] bg-background border-2 border-primary text-text focus:outline-none focus:border-accent"
                placeholder="Password"
                value={passwordSignUp}
                onChange={handlePasswordChangeSignUp}
                initial={{ y: "-170%" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 29 }}
              />
              <br />
              <motion.button
                initial={{ y: "-170%" }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 29 }}
                className="mt-12 rounded-lg bg-accent px-4 py-1 text-xl border-2 border-primary text-text hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                onClick={handleSignUp}
              >
                Sign Up
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
