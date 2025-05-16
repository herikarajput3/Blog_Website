import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlogDelete from './BlogDelete';

const UserBlog = ({ post }) => {
    // const [blogs, setBlogs] = useState([]);
    const [showOptions, setShowOptions] = useState(null);
    const userId = JSON.parse(localStorage.getItem('userId'));
    const navigate = useNavigate();

    // const fetchUserData = async () => {
    //     try {
    //         const response = await axios.get(`http://127.0.0.1:3000/getParticularUser/${userId}`);
    //         setBlogs(response.data.blog || []);
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //     }
    // };

    const fetchBlogPost = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/getSingleBlog/${post._id}`);
            console.log("blog id", post._id);

            // setBlogs((prevBlogs) => [...prevBlogs, response.data]); 

        } catch (error) {
            console.error('Error fetching blog post:', error);
        }
    };

    useEffect(() => {
        // fetchUserData();
        fetchBlogPost();
    }, []);

    const handlePostClick = (id) => {
        navigate(`/post/${id}`);
    };

    return (
        <>
            {blogs.map((post) => (
                <div className="mb-2 border-bottom" key={post._id}>
                    <div
                        className="row"
                        onClick={() => handlePostClick(post._id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="col-md-12 pb-3 pe-md-5">
                            <h2 className="mt-2 fs-4 fw-bold">{post.title}</h2>
                            <p
                                className="overflow-hidden text-secondary fs-6"
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: '2',
                                    WebkitBoxOrient: 'vertical',
                                }}
                            >
                                {post.description}
                            </p>
                            <div className="d-flex align-items-center mt-2">
                                <span className="me-3">
                                    <i className="fa fa-heart text-danger me-1"></i>100
                                </span>
                                <span>
                                    <i className="fa-regular fa-comment me-1 fs-6 text-secondary"></i>13
                                </span>
                                <div className="position-relative ms-auto me-2">
                                    <button
                                        className="btn btn-sm btn-link text-dark"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowOptions(showOptions === post._id ? null : post._id);
                                        }}
                                    >
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                    {showOptions === post._id && (
                                        <div
                                            className="position-absolute end-0 bg-white rounded border shadow-md mt-2 z-3"
                                            style={{ minWidth: '150px' }}
                                        >
                                            <Link
                                                className="btn btn-link text-dark text-decoration-none d-block w-100 text-start py-2"
                                                to={`/blog-edit/${post._id}`}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <i className="fa fa-pencil me-2"></i>Edit post
                                            </Link>
                                            <button
                                                className="btn btn-link text-danger text-decoration-none d-block w-100 text-start py-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteBlogModal"
                                                value={post._id}
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                }}
                                            >
                                                <i className="fa fa-trash me-2"></i>Delete post
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <BlogDelete />
        </>
    );
};

export default UserBlog;
