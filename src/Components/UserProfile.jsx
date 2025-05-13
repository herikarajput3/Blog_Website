import React from 'react';

const UserProfile = () => {
    return (
        <div
            className="rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{
                width: "8vw", 
                height: "8vw",
                maxWidth: "35px", 
                maxHeight: "35px",
                backgroundColor: "#ccc",
                minWidth: "30px", 
                minHeight: "30px"
            }}
        >
            <i className="fas fa-user fs-6 text-white"></i>
        </div>
    );
};

export default UserProfile;