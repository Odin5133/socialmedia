// import React from "react";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Posttemplate from "./Posttemplate";

function Feedx() {
  const [posts, setPosts] = useState([]);
  const observer = useRef(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/posts");
        if (response.data && Array.isArray(response.data.posts)) {
          // Assuming the array is in response.data.posts
          const updatedPosts = response.data.posts.map((post) => ({
            ...post,
            imageUrl: `https://picsum.photos/id/${Math.floor(
              Math.random() * 1000
            )}/200/300`,
          }));
          updatedPosts.forEach((post, i) => {
            i % 3 === 0
              ? (post.imagePresent = true)
              : (post.imagePresent = false);
          });
          updatedPosts.forEach((post, i) => {
            !post.imagePresent || i % 4 === 0
              ? (post.Description = true)
              : (post.Description = false);
          });
          setPosts(updatedPosts);
          console.log(posts);
        } else {
          console.error("Response is not an array:", response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const options = {
      root: null, // observing changes in the viewport
      rootMargin: "0px",
      threshold: 0.1, // trigger callback when 10% of the element is visible
    };

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          observer.current.unobserve(lazyImage); // Stop observing the current target
        }
      });
    }, options);

    const images = document.querySelectorAll("[data-src]");
    images.forEach((img) => observer.current.observe(img));

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [posts]);
  return (
    <div className="flex flex-col items-center text-text font-body w-[45vw] relative">
      {posts.map((post) => (
        <Posttemplate key={post.id} post={post} userReacted={post.id % 3} />
      ))}
    </div>
  );
}

export default Feedx;
