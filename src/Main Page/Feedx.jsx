// import React from "react";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Posttemplate from "./Posttemplate";
import Cookies from "js-cookie";
import TempPosttemplate from "./TempPostTemplate";
import { IconGhost2Filled } from "@tabler/icons-react";

function Feedx() {
  const [posts, setPosts] = useState([]);
  const observer = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const fetchdata = async () => {
    //   try {
    //     const response = await axios.get("https://dummyjson.com/posts");
    //     if (response.data && Array.isArray(response.data.posts)) {
    //       // Assuming the array is in response.data.posts
    //       const updatedPosts = response.data.posts.map((post) => ({
    //         ...post,
    //         imageUrl: `https://picsum.photos/id/${Math.floor(
    //           Math.random() * 1000
    //         )}/200/300`,
    //       }));
    //       updatedPosts.forEach((post, i) => {
    //         i % 3 === 0
    //           ? (post.imagePresent = true)
    //           : (post.imagePresent = false);
    //       });
    //       updatedPosts.forEach((post, i) => {
    //         !post.imagePresent || i % 4 === 0
    //           ? (post.Description = true)
    //           : (post.Description = false);
    //       });
    //       setPosts(updatedPosts);
    //       console.log(posts);
    //     } else {
    //       console.error("Response is not an array:", response.data);
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    const fetchData = () => {
      axios
        .post(
          "http://127.0.0.1:8000/api/feed/",
          {},
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setPosts(res.data);
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };
    fetchData();
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
      {/* {posts.map((post) => (
        <Posttemplate key={post.id} post={post} userReacted={post.id % 3} />
      ))} */}
      {loading ? (
        <div>Loading...</div>
      ) : posts.length > 0 ? (
        posts.map((post, i) => <Posttemplate key={i} post={post} />)
      ) : (
        <EmptyFeed />
      )}
    </div>
  );
}

const EmptyFeed = () => {
  return (
    <div className="rounded-xl pt-4 w-[90vw]  mt-8 bg-pseudobackground md:w-[45vw] lg:w-[45vw] font-body min-h-[80vh] flex flex-col justify-evenly items-center ">
      <div>
        <IconGhost2Filled size={200} className=" text-background" />
        <div className="mt-4 font-semibold text-pseudobackground2 text-base text-center">
          Your Feed looks....... empty{" "}
        </div>
      </div>
      <div className="mt-2 px-10 text-xl text-center ">
        Follow some people or join some communities to see posts here
      </div>
    </div>
  );
};

export default Feedx;
