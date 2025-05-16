import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const EditUserProfile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const userId = JSON.parse(localStorage.getItem('userId'));
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/getParticularUser/${userId}`);
            // console.log(response.data, 'This is response');
            // console.log(response.data.name, 'This is name');
            reset(response.data); // to reset the form and display the data

        } catch (error) {
            console.log(error, 'This is error');
        }
    }

    useEffect(() => {
        fetchUserData();
    }, [userId]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`http://127.0.0.1:3000/updateUser/${userId}`, data);
            window.location.reload();
            // console.log("response", response.data);

        } catch (error) {
            console.log(error);
            
        }
        console.log("Form submitted: ", data);
    };


    return (
        <div
            className="modal fade"
            id="editUserProfileModal"
            tabIndex="-1"
            aria-labelledby="editUserProfileLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow">
                    <div className="modal-header border-0">
                        <h5 className="modal-title fw-bold" id="editUserProfileLabel">Edit Profile</h5>
                        <button type="button" className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label htmlFor="name" className="form-label">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        {...register('name', { required: 'First name is required' })}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name.message}</div>
                                    )}
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="lname" className="form-label">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lname"
                                        className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
                                        {...register('lname', { required: 'Last name is required' })}
                                    />
                                    {errors.lname && (
                                        <div className="invalid-feedback">{errors.lname.message}</div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email.message}</div>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button
                                type="button"
                                className="btn btn-light"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button type="submit" className="btn btn-dark" data-bs-dismiss="modal">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserProfile;
