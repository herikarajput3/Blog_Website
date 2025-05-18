import axios, { all } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LikeButton from "../Components/LikeButton";


const PostDetail = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [commentCounts, setCommentCounts] = useState([]);


  const fetchBlogPost = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/getBlogs`);
      const allBlogs = response.data;
      const shuffleBlogs = allBlogs.sort(() => Math.random() - 0.5); // math
      setBlogs(shuffleBlogs);
      const commentCounts = allComments.filter(comment => comment.userId._id === userId).length;
      setCommentCounts(commentCounts);

      const allComments = [];
      for (const blog of allBlogs) {
        allComments.push(...blog.comments);
      }


    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogPost();
  }, []);

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div>
      {blogs.length === 0 ? (
        <p>Loading...</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="row border-bottom" onClick={() => handlePostClick(blog._id)} style={{ cursor: "pointer" }}>
            <div className="col-lg-12 p-3">
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <Link className="fs-6 text-decoration-none text-dark" to="/">
                    <i className="fa-regular fa-user me-2"></i>
                    {blog.user.name} {blog.user.lname}
                  </Link>
                </div>
                <h2 className="fw-bold mt-2 fs-4">{blog.title}</h2>
                <p
                  className="overflow-hidden text-secondary fs-6"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {blog.description}
                </p>
                <div className="d-flex align-items-center mt-2">
                  {/* <i
                    className="fa-regular fa-heart tex me-1 fs-6 text-secondary"
                    style={{ cursor: "pointer" }}
                  ></i> <span className="text-secondary">100</span> */}
                  <LikeButton blogId={blog._id} />
                  <i
                    className="fa-regular fa-comment ms-3 me-1 fs-6 text-secondary"
                    style={{ cursor: "pointer" }}
                  ></i> <span className="text-secondary">{blog.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostDetail;

/*

const PostDetail = ({ userId }) => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const fetchBlogPost = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/getBlogs`, {
        params: { userId }, // Assuming your API supports filtering by user ID
      });
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBlogPost();
    }
  }, [userId]);

  const handlePostClick = (id) => {
    navigate(`/post/${id}`);
  };

  return (
    <div>
      {blogs.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="row border-bottom"
            onClick={() => handlePostClick(blog._id)}
            style={{ cursor: "pointer" }}
          >
            <div className="col-lg-12 p-3">
              <div>
                <div className="d-flex align-items-center justify-content-between">
                  <Link className="fs-6 text-decoration-none text-dark" to="/">
                    <i className="fa-regular fa-user me-2"></i>
                    {blog.user.name} {blog.user.lname}
                  </Link>
                </div>
                <h2 className="fw-bold mt-2 fs-4">{blog.title}</h2>
                <p
                  className="overflow-hidden text-secondary fs-6"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {blog.description}
                </p>
                <div className="d-flex align-items-center mt-2">
                  <i
                    className="fa-regular fa-thumbs-up me-3 fs-6 text-secondary"
                    style={{ cursor: "pointer" }}
                  ></i>
                  <i
                    className="fa-regular fa-comment me-3 fs-6 text-secondary"
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostDetail;
*/