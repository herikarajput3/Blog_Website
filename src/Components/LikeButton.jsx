import React, { useState, useEffect } from "react";
import axios from "axios";
import { set } from "react-hook-form";

const LikeButton = ({ blogId }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const userId = JSON.parse(localStorage.getItem("userId"));

    const fetchLikes = async (currentUser, targetBlog) => {
        // console.log("blogid", blogId, "userid", userId);
        try {
            const response = await axios.get("http://127.0.0.1:5000/likes");
            const likes = response.data;

            // like count
            const totalLikes = likes.filter((like) => like.blogId === targetBlog).length;
            setLikeCount(totalLikes);

            const matchLikes = likes.find(
                (like) => {
                    // console.log("like", like);
                    return like.blogId === targetBlog && like.likedBy === currentUser;
                }
            )
            if (matchLikes) {
                setIsLiked(true);            }
        }
        catch (error) {
            console.error("Error fetching likes:", error);
        }
    };

    useEffect(() => {
        fetchLikes(userId, blogId);
    }, []);

    const handleLikeToggle = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/likes");
            const likes = response.data;

            const existingLike = likes.find(
                (like) => like.blogId === blogId && like.likedBy === userId
            );

            if (existingLike) {
                await axios.delete(`http://127.0.0.1:5000/likes/${existingLike.id}`);
                setIsLiked(false);
                setLikeCount(likeCount - 1);
            } else {
                const likeData = {
                    blogId,
                    likedBy: userId,
                };
                await axios.post("http://127.0.0.1:5000/likes", likeData);
                setIsLiked(true);
            }
            await fetchLikes(userId, blogId);

        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <div>
            <i
                className={`me-1 fs-6 ${isLiked ? "fa-solid fa-heart text-danger" : "fa-regular fa-heart text-secondary"}`}
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleLikeToggle();
                }}
            ></i>
            <span className="text-secondary">{likeCount}</span>
        </div>
    );
};

export default LikeButton;
