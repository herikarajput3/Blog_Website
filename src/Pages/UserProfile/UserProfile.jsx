import React, { useEffect, useState } from 'react';
import UserBlog from '../../Components/UserBlog';
import EditUserProfile from '../../Components/EditUserProfile';
import UserProfileIcon from '../../Components/UserProfileIcon';
import axios from 'axios';

// Sample data for demonstration
const sampleUser = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    followers: 243,
    following: 118,
    avatar: null // Placeholder for user avatar
};

const samplePosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        excerpt: "Learn how to use React Hooks to simplify your components and manage state effectively.",
        date: "May 10, 2025",
        readTime: "5 min read",
        likes: 24,
        coverImage: "https://via.placeholder.com/800x400"
    },
];


// Main UserProfile component with enhanced styling
const UserProfile = () => {
    const [userDetails, setUserDetails] = useState('');
    const userId = JSON.parse(localStorage.getItem('userId'));

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/getParticularUser/${userId}`);
            setUserDetails(response.data);


        } catch (error) {
            console.log(error, 'This is error');
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [userId]);


    const [posts, setPosts] = useState(samplePosts);
    const [activeTab, setActiveTab] = useState('posts');
    const handleEditPost = (postId) => {
        console.log(`Editing post with ID: ${postId}`);
    };

    const handleDeletePost = (postId) => {
        setPosts(posts.filter((post) => post.id !== postId));
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4 mb-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <div className="text-center">
                                {/* User Profile Details */}
                                <div className="position-relative d-inline-block mb-3">
                                    <UserProfileIcon />
                                </div>
                                {userDetails && (
                                    <>
                                        <h4 className="fw-bold mb-1">{userDetails.name} {userDetails.lname}</h4>
                                        <p className="text-muted mb-3">{userDetails.email}</p>

                                    </>
                                )}
                                <div className="d-flex justify-content-center mb-4">
                                    <div className="px-3 border-end">
                                        <h5 className="fw-bold mb-0">10M</h5>
                                        <small className="text-muted">Followers</small>
                                    </div>
                                    <div className="px-3">
                                        <h5 className="fw-bold mb-0">118</h5>
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

                {/* Content Area */}
                <div className="col-lg-8">
                    {/* Navigation Tabs */}
                    <ul className="nav nav-tabs mb-4 border-0">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'posts' ? 'active fw-bold' : 'text-muted'}`}
                                onClick={() => setActiveTab('posts')}
                            >
                                <i className="fa fa-file-text me-2"></i>My Posts
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'drafts' ? 'active fw-bold' : 'text-muted'}`}
                                onClick={() => setActiveTab('drafts')}
                            >
                                <i className="fa fa-pencil-square-o me-2"></i>Drafts
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'liked' ? 'active fw-bold' : 'text-muted'}`}
                                onClick={() => setActiveTab('liked')}
                            >
                                <i className="fa fa-heart me-2"></i>Liked
                            </button>
                        </li>
                    </ul>

                    {/* Post List Section */}
                    <div>
                        {activeTab === 'posts' && (
                            posts.length > 0 ? (
                                posts.map((post) => (
                                    <UserBlog
                                        key={post.id}
                                        post={post}
                                        onEdit={handleEditPost}
                                        onDelete={handleDeletePost}
                                    />
                                ))
                            ) : (
                                <div className="text-center p-5 bg-light rounded">
                                    <i className="fa fa-file-text fa-3x text-muted mb-3"></i>
                                    <p className="text-muted">You haven't written any posts yet.</p>
                                    <button className="btn btn-dark mt-2">
                                        <i className="fa fa-plus me-2"></i>Create New Post
                                    </button>
                                </div>
                            )
                        )}

                        {activeTab === 'drafts' && (
                            <div className="text-center p-5 bg-light rounded">
                                <i className="fa fa-pencil-square-o fa-3x text-muted mb-3"></i>
                                <p className="text-muted">No drafts found.</p>
                                <button className="btn btn-dark mt-2">
                                    <i className="fa fa-plus me-2"></i>Create New Draft
                                </button>
                            </div>
                        )}

                        {activeTab === 'liked' && (
                            <div className="text-center p-5 bg-light rounded">
                                <i className="fa fa-heart fa-3x text-muted mb-3"></i>
                                <p className="text-muted">You haven't liked any posts yet.</p>
                                <button className="btn btn-outline-dark mt-2">
                                    <i className="fa fa-search me-2"></i>Explore Posts
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <EditUserProfile

            />
        </div>
    );
};

export default UserProfile;