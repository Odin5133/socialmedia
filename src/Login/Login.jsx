import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Login() {
  return (
    <div className=" bg-[#000] p-[1vh] m-0 h-screen">
      <SignIn />
      {/* <div className="flex justify-end">
        <SignUp />
      </div> */}
    </div>
  );
}

export default Login;
