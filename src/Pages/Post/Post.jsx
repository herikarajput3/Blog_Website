import React, { useEffect, useState } from "react";
import UserProfile from "../../Components/UserProfileIcon";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Post = () => {
    const { id } = useParams();
    const [inputValue, setInputValue] = useState("");
    const [blog, setBlog] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [userName, setUserName] = useState('');
    const [comments, setComments] = useState([]);


    const displayBlog = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/getSingleBlog/${id}`);
            // console.log(response.data, "this is data");
            // console.log(response.data.blog.title,"This is blog title");
            if (response.data.success) {
                setBlog(response.data.blog); // Store blog data in state
            } else {
                setError("Blog not found");
            }

            setLoading(false);
        } catch (error) {
            console.log(error, "this is error");
            setError("Failed to load blog");
            setLoading(false);
        }
    }

    const fetchUserName = async () => {
        const userId = JSON.parse(localStorage.getItem('userId'));

        try {
            const response = await axios.get(`http://127.0.0.1:3000/getParticularUser/${userId}`);
            const { name, lname } = response.data;
            setUserName({ name, lname });
            // console.log(response.data.name, 'This is name');
        } catch (error) {
            console.log(error, 'This is error');
        }
    }

    const handleComment = async () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        const comment = inputValue;
        const blogId = id;
        // console.log("userid", userId, "comment", comment, "blogId", blogId);

        try {
            const response = await axios.post('http://127.0.0.1:3000/commentCreate', { userId, comment, blogId });
            // console.log("this is data", response.data);
            setInputValue('');
            getComments();

        } catch (error) {
            console.log(error, "this is error");
        }
    }

    const getComments = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/getAllComments');
            // console.log("this is data", response.data);
            setComments(response.data);

            // console.log("username", response.data[0].commenter.name);
            // console.log("comment", response.data[0].commentText);


        } catch (error) {
            console.log(error, "this is error");

        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3000/deleteComment/${commentId}`);
            // console.log("comment id", commentId);

            // console.log("this is data", response.data);
            getComments();

        } catch (error) {

        }
    }

    useEffect(() => {
        fetchUserName();
        getComments();
    }, [])

    useEffect(() => {

        if (id) {
            displayBlog();
        }
    }, [id])


    return (
        <div className="container w-50 p-4" >
            {/* Loading & Error Handling */}
            {loading && <p>Loading blog...</p>}
            {error && <p className="text-danger">{error}</p>}

            {/* Blog Title */}
            {blog && (
                <>
                    <h1 className="display-5 mb-4" style={{ fontWeight: "600" }}>{blog.title}</h1>

                    {/* User Section */}
                    <div className="d-flex align-items-center mb-3">
                        <UserProfile />
                        <div className="d-flex align-items-center">
                            {/* <span className="me-3">User Name</span> */}
                            <span className="me-3">{blog.user.name} {blog.user.lname}</span>
                            <button className="btn btn-outline-dark rounded-pill" style={{ fontSize: "12px" }}>Follow</button>
                        </div>
                    </div>

                    {/* Blog Content */}
                    <div className="fs-6 mb-3">
                        <p className="m-0">{blog.description}</p>
                    </div>

                </>
            )}

            {/* Comment Section */}
            <div className="comments-section my-4">
                <h2 className="fs-4 fw-bold my-3">Comments (total comments)</h2>

                {/* Input Section */}
                <div className=" d-flex flex-column align-items-start mb-4">
                    {/* User Profile Section */}
                    <div className="d-flex align-items-center mb-2">
                        <UserProfile />
                        <span className="">{userName.name} {userName.lname}</span>
                    </div>

                    {/* Input Box & Buttons */}
                    <div className="w-100 bg-light p-1 rounded">
                        <textarea
                            placeholder="What are your thoughts?"
                            className="form-control mb-2 bg-light border-0 "
                            style={{ resize: "none", fontSize: "14px", }}
                            rows="3"
                            id="comment"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        ></textarea>
                        <div className="d-flex justify-content-end">
                            <button
                                className="btn btn-link text-muted me-2"
                                style={{ textDecoration: "none", fontSize: "0.8rem" }}
                            >
                                Cancel
                            </button>
                            <button className="btn btn-dark rounded-pill" style={{ fontSize: "0.8rem" }}
                                disabled={!inputValue}
                                onClick={handleComment}
                            >
                                Respond
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}

                <div>
                    {comments.map((comment) => (
                        <div className="border-bottom my-3 rounded-lg p-4 position-relative" key={comment.id}>
                            <div className="d-flex flex-column justify-content-start mb-2">
                                {/* Comment Header */}
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <div className="d-flex align-items-center">
                                        <UserProfile />
                                        <span className="ms-2" style={{ fontSize: "0.9rem" }}>
                                            {comment.commenter.name}
                                        </span>
                                    </div>

                                    <button
                                        className="btn btn-white text-danger"
                                        onClick={() => handleDeleteComment(comment.id)}
                                    >
                                        <i className="fa fa-trash me-2"></i>
                                    </button>
                                </div>

                                {/* Comment Text */}
                                <div className="py-2 text-muted" style={{ fontSize: "0.9rem" }}>
                                    {comment.commentText}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div >
    );
};

export default Post;
