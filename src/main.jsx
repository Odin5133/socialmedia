import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SignIn from "./Login/SignIn";
import ProtectedRoute from "./ProtectedRoute";
import Feed from "./Main Page/Feed";
import Feedx from "./Main Page/Feedx";
import ManageFriends from "./Main Page/FriendsComponents/ManageFriends";
import Communities from "./Main Page/Communities";
import NewPost from "./Main Page/NewPost";
import NewCommunity from "./Main Page/NewCommunity";
import ProfilePage from "./Main Page/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/feed",
    element: <ProtectedRoute Component={Feed} />,
    children: [
      {
        path: "",
        // element: <Feedx />,
        element: <ProfilePage />,
      },
      {
        path: "manageFriends",
        element: <ManageFriends />,
      },
      {
        path: "communities",
        element: <Communities />,
      },
      {
        path: "new_post",
        element: <NewPost />,
      },
      {
        path: "new_community",
        element: <NewCommunity />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
