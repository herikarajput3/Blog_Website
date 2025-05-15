import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserProfileIcon from "./UserProfileIcon";

const StaffPicks = () => {
  const [blogTitles, setBlogTitles] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const navigate = useNavigate();
  const getBlogs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/getBlogs");
      // console.log(response.data, "this is data");
      const allBlogs = response.data;
      const filteredBlogs = allBlogs.filter((blog) => blog.user !== currentUser);
      const titles = filteredBlogs.map((blog) => blog.title).slice(0, 3);
      setBlogTitles(titles);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getBlogs();
  }, []);

  const handlePostClick = async (id) => {
    navigate(`/post/${id}`);
  };
  return (
    <div className="my-4">
      <h4 className="fs-5 fw-bold">Staff Picks</h4>
      <div className="mt-3">
        {blogTitles.map((blog) =>
          <div className="d-flex align-items-center mb-3" key={blog._id || blog}>
            <UserProfileIcon />
            <Link className="m-0 fs-6 text-decoration-none text-dark" style={{ fontWeight: "600" }} onClick={() => handlePostClick(blog._id)}>{blog}</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffPicks;
