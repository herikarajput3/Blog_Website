import React from 'react';
import { Link } from 'react-router-dom';
import AuthModal from '../../Components/AuthModal';

const PublicHome = () => {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <Link to="/" className="navbar-brand fs-2" style={{ fontFamily: "Anton" }}>
                        Medium
                    </Link>
                    <button
                        type="button"
                        className="btn btn-dark rounded-pill me-5 px-3"
                        data-bs-toggle="modal"
                        data-bs-target="#authModal"
                    >
                        Sign In
                    </button>
                </div>
            </nav>
            <AuthModal />

            {/* Hero Section */}

            <div className="container-fluid p-0 pt-3 bg-light" style={{ overflow: 'hidden' }}>
                <div className="row g-0">
                    {/* Left Content */}
                    <div className="col-lg-6 d-flex align-items-center justify-content-center">
                        <div className="px-5 ms-lg-5">
                            <h1 className="display-1 fw-bold" style={{ fontFamily: "Poppins" }}>Human
                                stories & ideas</h1>
                            <p className="lead" style={{ fontFamily: "Poppins" }}>
                                A place to read, write, and deepen your understanding
                            </p>
                            <button className="btn btn-dark rounded-pill mt-2 py-2 px-3" data-bs-toggle="modal"
                                data-bs-target="#authModal">Start Reading</button>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="col-lg-6 d-none d-lg-block">
                        <div
                            style={{
                                height: '88vh',
                                width: '100%',
                                backgroundImage: `url('../../../public/Images/Home_page.webp')`,
                                backgroundSize: 'contain',
                                backgroundPosition: 'right',
                                backgroundRepeat: 'no-repeat',
                                overflow: 'hidden',
                            }}
                        ></div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default PublicHome;