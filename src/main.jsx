import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SignIn from "./Login/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import Feed from "./Main Page/Feed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/feed",
    element: <ProtectedRoute Component={Feed} />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />;
  </React.StrictMode>
);
