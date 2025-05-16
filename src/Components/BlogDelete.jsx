import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const BlogDelete = ({ blogId }) => {
    const navigate = useNavigate();

    const deleteBlog = async () => {
        try {
            const response = await axios.delete(`http://127.0.0.1:3000/deleteBlog/${blogId}`);
            // console.log("Blog deleted successfully:", response.data);
            navigate('/home');
            window.location.reload();
        } catch (error) {
            console.error("Error deleting blog:", error);
        }

    }
    return (
        <>
            <div className="modal fade"
                id="deleteBlogModal"
                tabIndex="-1"
                aria-labelledby="deleteBlogModalLabel"
                aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            <h5 className="modal-title ms-auto fs-2">Delete Blog</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-center fs-6 text-muted">
                            <p>Are you sure you want to delete this blog?</p>
                        </div>
                        <div className="modal-footer border-0 d-flex justify-content-center">
                            <button type="button" className="btn btn-outline-dark rounded-pill" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger rounded-pill" onClick={deleteBlog}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDelete