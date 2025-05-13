import React from "react";
import Navbar from "../../Components/Navbar";
import { Link } from "react-router-dom";
import PostDetail from "../../Components/PostDetail";
import StaffPicks from "../../Components/StaffPicks";
import RecommendedTopics from "../../Components/RecommendedTopics";
import WhoToFollow from "../../Components/WhomToFollow";
import Footer from "../../Components/Footer";

const Home = () => {
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {/* First Part */}
          <div className="col-lg-8 col-md-7">
            <div className="p-3">
              <Navbar />
              <PostDetail />

            </div>
          </div>

          {/* Second Part */}
          <div className="col-lg-4 col-md-5">
            <div className="p-3">
              <StaffPicks />
              <RecommendedTopics />
              <WhoToFollow />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
