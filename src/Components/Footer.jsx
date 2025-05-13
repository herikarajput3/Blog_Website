import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center py-3">
      <div className="d-flex flex-wrap justify-content-center gap-3">
        <Link to="#" className="text-secondary text-decoration-none" style={{ fontSize: "14px" }}> Help </Link>
        <Link to="#" className="text-secondary text-decoration-none" style={{ fontSize: "14px" }}> About </Link>
        <Link to="#" className="text-secondary text-decoration-none" style={{ fontSize: "14px" }}> Blog </Link>
        <Link to="#" className="text-secondary text-decoration-none" style={{ fontSize: "14px" }}> Privacy </Link>
        <Link to="#" className="text-secondary text-decoration-none" style={{ fontSize: "14px" }}> Terms & Conditions </Link>
      </div>

      <div className="mt-3">
        <span className="text-secondary" style={{ fontSize: "14px" }}>
          © 2025 Thinker Corporation
        </span>
      </div>
    </footer>
  );
};

export default Footer;
