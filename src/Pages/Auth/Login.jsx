import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
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
            const response = await axios.post('http://127.0.0.1:3000/login', data);            
            // console.log(response.data.userId, "Response from login API");

            localStorage.setItem("userId", JSON.stringify(response.data.userId));
            if (response.data.message) {
                toast.success('Login successful!');
                navigate('/home');
            }
        } catch (error) {
            console.log(error);
            setErrorMessage('Invalid Email or Password');
            toast.error('Invalid Email or Password');
        }


    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Login</h2>
                    {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <button type="submit" className="btn btn-dark w-100">Sign In</button>
                    </form>
                    <p className="mt-3 text-center">
                        Not a member? <Link to="/register" className='text-decoration-none text-dark fw-bold'>Sign up now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
