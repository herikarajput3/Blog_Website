// src/components/Header.jsx
import React, { useState } from 'react';
import AuthModal from './AuthModal';

const Header = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <header className="d-flex justify-content-between align-items-center p-3 bg-light">
            <h1 style={{fontFamily: "Anton"}}>Medium</h1>
            <button className="btn btn-primary" onClick={openModal}>Login </button>
            <AuthModal isOpen={isModalOpen} onClose={closeModal} />
        </header>
    );
};  

export default Header;
