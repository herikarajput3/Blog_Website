import React, { useEffect, useState } from "react";
import UserProfile from "../../Components/UserProfile";
import axios from "axios";
import { useParams } from "react-router-dom";

const Post = () => {
    const { id } = useParams();
    const [inputValue, setInputValue] = useState("");
    const [blog, setBlog] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [userName, setUserName] = useState('');


    const displayBlog = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/getSingleBlog/${id}`);
            console.log(response.data, "this is data");
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
            // console.log(response.data.lname, 'This is lname');
            
            
        } catch (error) {
            console.log(error, 'This is error');
        }
    }

    useEffect(() => {
        fetchUserName();
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
                                disabled={!inputValue}>
                                Respond
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="border-bottom pb-1">

                    <div className="d-flex flex-column justify-content-start mb-2">
                        <div className="d-flex align-items-center mb-2">
                            <UserProfile />
                            <span className="" style={{ fontSize: "0.9rem" }}>User Name</span>
                        </div>
                        <div className="py-1" style={{ fontSize: "0.9rem" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis veniam quidem libero, assumenda officiis animi veritatis a! Repellendus quas rerum sapiente! Molestias soluta fugit, mollitia necessitatibus nihil natus deserunt dicta.
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default Post;
