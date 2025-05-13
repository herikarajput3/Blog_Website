import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:3000/userRegister', data);
            if (response.data.message) {
                toast.success('Registration successful!');
                navigate('/home');
            }
            reset();
        } catch (error) {
            console.log(error);
            setErrorMessage('Invalid Email or Password');
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Register</h2>
                    {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                {...register('name', {
                                    required: 'First Name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Must be at least 3 characters',
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: 'Only letters are allowed',
                                    },
                                })}
                            />
                            {errors.name && (
                                <small className="text-danger">{errors.name.message}</small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lname" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lname"
                                {...register('lname', {
                                    required: 'Last Name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Must be at least 3 characters',
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/,
                                        message: 'Only letters are allowed',
                                    },
                                })}
                            />
                            {errors.lname && (
                                <small className="text-danger">{errors.lname.message}</small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <small className="text-danger">{errors.email.message}</small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must be at least 6 characters',
                                    },
                                })}
                            />
                            {errors.password && (
                                <small className="text-danger">{errors.password.message}</small>
                            )}
                        </div>
                        <button type="submit" className="btn btn-dark w-100">Sign Up</button>
                    </form>
                    <p className="mt-3 text-center">
                        Already a member? <Link to="/login" className='text-decoration-none fw-bold text-dark'>Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
