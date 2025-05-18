import React, { useEffect, useState } from 'react';
import EditUserProfile from '../../Components/EditUserProfile';
import UserProfileIcon from '../../Components/UserProfileIcon';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BlogDelete from '../../Components/BlogDelete';
import LikeButton from '../../Components/LikeButton';

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [showOptions, setShowOptions] = useState(null);
    const [blogId, setBlogId] = useState('');

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const userId = JSON.parse(localStorage.getItem('userId'));
    const navigate = useNavigate();

    const fetchFollowers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/follows');
            const follows = response.data;

            const followers = follows.filter(follow => follow.followTo === userId);
            setFollowers(followers);
        } catch (error) {
            console.error('Error fetching followers:', error);
        }
    }

    const fetchFollowing = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/follows');
            const follows = response.data;

            const following = follows.filter(follow => follow.followedBy === userId);
            setFollowing(following);
        } catch (error) {
            console.error('Error fetching following:', error);
        }
    }


    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/getParticularUser/${userId}`);
            setUserDetails(response.data);
            setBlogs(response.data.blog || []);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchFollowers();
        fetchFollowing();
    }, [userId]);

    const handlePostClick = (id) => {
        navigate(`/post/${id}`);
    };

    const handleDeleteClick = (id) => {
        setBlogId(id);
    };
    return (
        <div className="container mt-4">
            <div className="row">
                {/* User Profile Details */}
                <div className="col-lg-4 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="text-center">
                                <div className="position-relative d-inline-block mb-3">
                                    <UserProfileIcon />
                                </div>
                                {userDetails && (
                                    <>
                                        <h4 className="fw-bold mb-1">
                                            {userDetails.name} {userDetails.lname}
                                        </h4>
                                        <p className="text-muted mb-3">{userDetails.email}</p>
                                    </>
                                )}
                                <div className="d-flex justify-content-center mb-4">
                                    <div className="px-3 border-end">
                                        <h5 className="fw-bold mb-0">{followers.length}</h5>
                                        <small className="text-muted">Followers</small>
                                    </div>
                                    <div className="px-3">
                                        <h5 className="fw-bold mb-0">{following.length}</h5>
                                        <small className="text-muted">Following</small>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-dark px-4 py-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editUserProfileModal"
                                >
                                    <i className="fa fa-pencil me-2"></i>Edit Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Blogs Section */}
                <div className="col-lg-8">
                    <ul className="nav nav-tabs mb-4 border-0">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'posts' ? 'active fw-bold' : 'text-muted'
                                    }`}
                                onClick={() => setActiveTab('posts')}
                            >
                                <i className="fa fa-file-text me-2"></i>My Posts
                            </button>
                        </li>
                        {/* <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'liked' ? 'active fw-bold' : 'text-muted'
                                    }`}
                                onClick={() => setActiveTab('liked')}
                            >
                                <i className="fa fa-heart me-2"></i>Liked
                            </button>
                        </li> */}
                    </ul>

                    <div>
                        {activeTab === 'posts' && (
                            blogs.length > 0 ? (
                                blogs.map((post) => (
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
                                                        <LikeButton blogId={post._id} />
                                                    </span>
                                                    <span>
                                                        <i className="fa fa-comment me-1 fs-6 text-secondary"></i>
                                                        {post.comments.length}
                                                    </span>
                                                    <div className="position-relative ms-auto me-2">
                                                        <button
                                                            className="btn btn-sm btn-link text-dark"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setShowOptions(
                                                                    showOptions === post._id ? null : post._id
                                                                );
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
                                                                        handleDeleteClick(post._id);
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
                                ))
                            ) : (
                                <div className="text-center p-5 bg-light rounded">
                                    <i className="fa fa-file-text fa-3x text-muted mb-3"></i>
                                    <p className="text-muted">You haven't written any posts yet.</p>
                                    <Link to={"/blog-create"} className="btn btn-dark mt-2">
                                        <i className="fa fa-plus me-2"></i>Create New Post
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                    {/* <div>
                        {activeTab === 'liked' && (
                            <div className="text-center p-5 bg-light rounded">
                                <i className="fa fa-heart fa-3x text-muted mb-3"></i>
                                <p className="text-muted">You haven't liked any posts yet.</p>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditUserProfile />

            {/* Delete Blog Modal */}
            <BlogDelete blogId={blogId} />
        </div>
    );
};

export default UserProfile;
