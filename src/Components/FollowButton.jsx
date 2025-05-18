import React, { useState, useEffect } from "react";
import axios from "axios";

const FollowButton = ({ followTo }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  // const [followCount, setFollowCount] = useState(0);
  const userId = JSON.parse(localStorage.getItem("userId")); // Current user ID


  useEffect(() => {
    fetchFollows(userId, followTo);
  }, []);

  const fetchFollows = async (currentUser, targetUser) => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/follows");
      const follows = response.data;

      // follow count
      // const totalFollowers = follows.filter((follow) => follow.followTo === targetUser).length;
      // setFollowCount(totalFollowers);

      const matchFollowings = follows.find(
        (follow) => {
          // console.log("follow", follow);
          return follow.followTo === targetUser && follow.followedBy === currentUser;
        }
      )

      if (matchFollowings) {
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error fetching follows:", error);
    }
  };

  const handleFollowToggle = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/follows");
      const follows = response.data;

      const existingFollow = follows.find(
        (follow) => follow.followTo === followTo && follow.followedBy === userId
      );

      if (existingFollow) {
        // Unfollow: Delete from the database
        await axios.delete(`http://127.0.0.1:5000/follows/${existingFollow.id}`);
        setIsFollowing(false);
        // setFollowCount(followCount - 1);
      } else {
        // Follow: Add to the database
        const followData = {
          followTo,
          followedBy: userId,
        };
        await axios.post("http://127.0.0.1:5000/follows", followData);
        setIsFollowing(true);
      }

      // Re-fetch follow status
      await fetchFollows(userId, followTo);
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <button
      className="btn btn-outline-dark rounded-pill px-3"
      style={{ fontSize: "12px" }}
      onClick={handleFollowToggle}
    
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
