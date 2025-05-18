import React, { useEffect, useState } from "react";
import UserProfileIcon from "./UserProfileIcon";
import axios from "axios";
import FollowButton from "./FollowButton";

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
            {/* <button
              className="btn btn-outline-success rounded-pill px-3 "
              style={{ fontSize: "12px" }}
            >
              Follow
            </button> */}
            <FollowButton followTo={user._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhoToFollow;

// import React, { useEffect, useState } from "react";
// import UserProfileIcon from "./UserProfileIcon";
// import axios from "axios";

// const WhoToFollow = () => {
//   const [users, setUsers] = useState([]);
//   const [following, setFollowing] = useState([]);
//   const currentUser = JSON.parse(localStorage.getItem("userId"));

//   const getUsers = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:3000/getUser");
//       const filterUsers = response.data.filter((user) => user._id !== currentUser);
//       setUsers(filterUsers);

//       // Fetch the current user's "following" list
//       const currentUserData = await axios.get(`http://127.0.0.1:3000/getUser/${currentUser}`);
//       setFollowing(currentUserData.data.following || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleFollow = async (followUserId) => {
//     try {
//       // Update the current user's "following" list in the database
//       await axios.put(`http://127.0.0.1:3000/updateUser/${currentUser}`, {
//         following: [...following, followUserId],
//       });

//       // Optionally update the followed user's "followers" list (if your schema supports it)
//       await axios.put(`http://127.0.0.1:3000/updateUser/${followUserId}`, {
//         $push: { followers: currentUser },
//       });

//       // Update the local state for "following"
//       setFollowing((prev) => [...prev, followUserId]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   return (
//     <div className="my-4">
//       <h4 className="fs-5 fw-bold">Who to follow</h4>
//       <div className="mt-3">
//         {users.map((user) => (
//           <div
//             key={user._id}
//             className="d-flex align-items-center justify-content-between mb-3"
//           >
//             <div className="d-flex align-items-center">
//               <UserProfileIcon />
//               <p className="m-0">{user.name}</p>
//             </div>
//             <button
//               className="btn btn-outline-success rounded-pill px-3"
//               style={{ fontSize: "12px" }}
//               onClick={() => handleFollow(user._id)}
//               disabled={following.includes(user._id)} // Disable button if already following
//             >
//               {following.includes(user._id) ? "Following" : "Follow"}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WhoToFollow;
