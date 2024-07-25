// import React from "react";
import React, { useState, useEffect } from "react";
import MyDropzone from "./NewPostComponents/Dropzone";
import clsx from "clsx";
import axios from "axios";
import Cookies from "js-cookie";

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [dataURL, setDataURL] = useState(null);

  const submitPost = (e) => {
    e.preventDefault();

    const matches = dataURL.match(/^data:(.*);base64,(.*)$/);
    if (!matches || matches.length !== 3) {
      console.error("Invalid base64 data URL");
      return;
    }
    const mimeType = matches[1];
    const base64Data = matches[2];

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: mimeType });

    const file = new File([blob], "uploaded_image.jpg", { type: mimeType });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", content);
    formData.append("image", file);

    axios
      .post("http://127.0.0.1:8000/api/createPost/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="text-xl text-text flex flex-col font-body w-[45vw] bg-background border border-accent rounded-xl shadow-lg h-full p-6">
      <div className="mb-2">
        <h1 className="text-4xl font-semibold mb-4">New Post</h1>
        <form className="flex flex-col gap-2">
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            className={clsx(
              "py-1 px-2 rounded-md focus:outline-none border-solid focus:border-accent border-2 border-pseudobackground2 mb-4",
              title === "" ? "bg-background" : "bg-pseudobackground2"
            )}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="content" className="font-medium">
            Content
          </label>
          <textarea
            id="content"
            className={clsx(
              "py-1 px-2 border-pseudobackground2 rounded-md focus:outline-none border-solid focus:border-accent border-2   opacity-95 h-32 mb-4",
              content === "" ? "bg-background" : "bg-pseudobackground2"
            )}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <div className="font-medium">Image/Video</div>
          <MyDropzone dataURL={dataURL} setDataURL={setDataURL} />

          <button
            type="submit"
            className=" mt-12 rounded-lg bg-accent px-4 py-1 text-xl border-2 border-primary text-text hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            onClick={submitPost}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
