import React, { useEffect, useState } from "react";
import UserProfileIcon from "./UserProfileIcon";
import axios from "axios";

const WhoToFollow = () => {
  const [users, setUsers] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem('userId'));
  const getUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/getUser");
      // console.log(response.data, "this is data");
      const filterUsers = response.data.filter((user) => user._id !== currentUser);
      setUsers(filterUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="my-4">
      <h4 className="fs-5 fw-bold">Who to follow</h4>
      <div className="mt-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="d-flex align-items-center justify-content-between mb-3"
          >
            <div className="d-flex align-items-center">
              <UserProfileIcon />
              <p className="m-0">{user.name}</p>
            </div>
            <button
              className="btn btn-outline-success rounded-pill px-3 "
              style={{ fontSize: "12px" }}
            >
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhoToFollow;
