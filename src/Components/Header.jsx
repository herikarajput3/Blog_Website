// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [userName, setUserName] = useState('');

    const userId = JSON.parse(localStorage.getItem('userId'));
    const fetchUserName = async () => {

        try {
            const response = await axios.get(`http://127.0.0.1:3000/getParticularUser/${userId}`);
            setUserName(response.data.name);
        } catch (error) {
            console.log(error, 'This is error');
        }
    }

    useEffect(() => {
        fetchUserName();
    }, [])



    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-1 border-dark border-bottom">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-2 ms-lg-5" to="/home" style={{ fontFamily: "Anton" }}>Thinker</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex ms-5">
                            <input
                                className="form-control me-2 rounded-pill w-100 bg-light border-0"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </form>
                    </div>
                    <div className='d-flex align-items-center justify-content-evenly gap-3 me-lg-5'>
                        <Link className='fs-6 text-decoration-none text-dark' to={'/blog-create'}><i className="fa-regular fa-pen-to-square me-2"></i>Write</Link>
                        <Link className='fs-6 text-decoration-none text-dark' to="/"><i className="fa-regular fa-bell"></i></Link>
                        <Link className='fs-6 text-decoration-none text-dark' to="/profile" ><i className="fa-regular fa-user me-2"></i>{userName}</Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
