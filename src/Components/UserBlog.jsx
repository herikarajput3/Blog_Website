import React, { useState } from 'react'

const UserBlog = ({ post, onEdit, onDelete }) => {
    const [showOptions, setShowOptions] = useState(false);
    return (
        <div className="card mb-4 border-0 shadow-sm">
            <div className="row g-0">
                <div className="col-md-12">
                    <div className="card-body position-relative">
                        <div className="d-flex justify-content-between">
                            <h5 className="card-title fw-bold">{post.title}</h5>
                            <div className="position-relative">
                                <button
                                    className="btn btn-sm btn-link text-dark"
                                    onClick={() => setShowOptions(!showOptions)}
                                >
                                    <i className="fa fa-ellipsis-h"></i>
                                </button>
                                {showOptions && (
                                    <div className="position-absolute end-0 bg-white border rounded shadow-sm mt-2 z-3" style={{ minWidth: "150px" }}>
                                        <button
                                            className="btn btn-link text-dark d-block w-100 text-start py-2"
                                            onClick={() => {
                                                onEdit(post.id);
                                                setShowOptions(false);
                                            }}
                                        >
                                            <i className="fa fa-pencil me-2"></i>Edit post
                                        </button>
                                        <button
                                            className="btn btn-link text-danger d-block w-100 text-start py-2"
                                            onClick={() => {
                                                onDelete(post.id);
                                                setShowOptions(false);
                                            }}
                                        >
                                            <i className="fa fa-trash me-2"></i>Delete post
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <p className="card-text">{post.excerpt}</p>
                        <div className="card-text d-flex align-items-center text-muted small mt-3">
                            <span>{post.date}</span>
                            <span className="mx-2">·</span>
                            <span>{post.readTime}</span>
                            <span className="mx-2">·</span>
                            <span><i className="fa fa-heart text-danger me-1"></i>{post.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



};


export default UserBlog