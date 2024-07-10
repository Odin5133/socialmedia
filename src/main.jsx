import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SignIn from "./Login/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />;
  </React.StrictMode>
);
