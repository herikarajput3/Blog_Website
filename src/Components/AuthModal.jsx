// import axios from 'axios';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { Modal } from 'bootstrap';

// const AuthModal = () => {

//     const [modalType, setModalType] = useState('signIn'); // to toggle between sign in and sign up
//     const [errorMessage, setErrorMessage] = useState(''); // to display error message
//     const [successMessage, setSuccessMessage] = useState(''); // to display success message
//     const navigate = useNavigate(); // to navigate home page

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//     } = useForm();

//     const onSubmit = async (data) => {
//         const endpoint =
//             modalType === 'signIn' ? 'http://127.0.0.1:3000/login' : 'http://127.0.0.1:3000/userRegister';

//         try {
//             const response = await axios.post(endpoint, data);
//             console.log(response.data, "Response from login/register API");

//             if (response.data.message) {
//                 setErrorMessage('');
//                 setSuccessMessage(
//                     modalType === 'signIn' ? 'Login successful!' : 'Registration successful!'
//                 );

//                 // Fetch user details after login/register
//                 try {
//                     const userResponse = await axios.get('http://127.0.0.1:3000/getUser');
//                     const loggedInUser = userResponse.data.find(user => user.email === data.email);

//                     if (loggedInUser) {
//                         console.log("loggedinuser", loggedInUser);

//                         localStorage.setItem('userId', JSON.stringify(loggedInUser._id));

//                         const modalElement = document.getElementById('authModal');
//                         if (modalElement) {
//                             const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
//                             modalInstance.hide();
//                         }

//                     }
//                     else {
//                         console.error("Logged-in user not found in user list.");
//                         setErrorMessage('Unable to find user details. Please try again.');
//                     }

//                 } catch (fetchError) {
//                     console.error("Error fetching user details:", fetchError);
//                     setErrorMessage('Failed to fetch user details. Please try again.');
//                     return;
//                 }

//                 navigate('/home');
//                 window.location.reload();

//             } else {
//                 setSuccessMessage('');
//                 setErrorMessage(response.data.message || 'An error occurred. Please try again.');
//             }
//         } catch (error) {
//             console.log(error, 'This is error');
//             setSuccessMessage('');
//             setErrorMessage('Invalid Email or Password');
//         }
//         reset();
//     };
//     const toggleModalType = () => {
//         setModalType(modalType === 'signIn' ? 'signUp' : 'signIn');
//         setErrorMessage('');
//         setSuccessMessage('');
//         reset();
//     };

//     return (
//         <div
//             className="modal fade"
//             id="authModal"
//             tabIndex="-1"
//             aria-labelledby="authModalLabel"
//             aria-hidden="true"
//         >
//             <div className="modal-dialog modal-dialog-centered">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h5 className="modal-title fs-4" id="authModalLabel">
//                             {modalType === 'signIn' ? 'Sign In' : 'Sign Up'}
//                         </h5>
//                         <button
//                             type="button"
//                             className="btn-close"
//                             data-bs-dismiss="modal"
//                             aria-label="Close"
//                         ></button>
//                     </div>
//                     <div className="modal-body d-flex flex-column">

//                         {successMessage && !errorMessage && (
//                             <div className="alert alert-success" role="alert">
//                                 {successMessage}
//                             </div>
//                         )}

//                         {errorMessage && (
//                             <div className="alert alert-danger" role="alert">
//                                 {errorMessage}
//                             </div>
//                         )}

//                         <form onSubmit={handleSubmit(onSubmit)}>
//                             {modalType === 'signUp' && (
//                                 <div className="mb-3">
//                                     <label htmlFor="firstName" className="form-label">
//                                         First Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="firstName"
//                                         {...register('firstName', {
//                                             required: 'First Name is required',
//                                             minLength: {
//                                                 value: 3,
//                                                 message: 'Must be at least 3 characters',
//                                             },
//                                             pattern: {
//                                                 value: /^[A-Za-z]+$/,
//                                                 message: 'Only letters are allowed',
//                                             },
//                                         })}
//                                     />
//                                     {errors.firstName && (
//                                         <small className="text-danger">{errors.firstName.message}</small>
//                                     )}
//                                 </div>
//                             )}
//                             {modalType === 'signUp' && (
//                                 <div className="mb-3">
//                                     <label htmlFor="lastName" className="form-label">
//                                         Last Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         id="lastName"
//                                         {...register('lastName', {
//                                             required: 'Last Name is required',
//                                             minLength: {
//                                                 value: 3,
//                                                 message: 'Must be at least 3 characters',
//                                             },
//                                             pattern: {
//                                                 value: /^[A-Za-z]+$/,
//                                                 message: 'Only letters are allowed',
//                                             },
//                                         })}
//                                     />
//                                     {errors.lastName && (
//                                         <small className="text-danger">{errors.lastName.message}</small>
//                                     )}
//                                 </div>
//                             )}
//                             <div className="mb-3">
//                                 <label htmlFor="email" className="form-label">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     className="form-control"
//                                     id="email"
//                                     {...register('email', {
//                                         required: 'Email is required',
//                                         pattern: {
//                                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                             message: 'Invalid email address',
//                                         },
//                                     })}
//                                 />
//                                 {errors.email && (
//                                     <small className="text-danger">{errors.email.message}</small>
//                                 )}
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="password" className="form-label">
//                                     Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     className="form-control"
//                                     id="password"
//                                     {...register('password', {
//                                         required: 'Password is required',
//                                         minLength: {
//                                             value: 6,
//                                             message: 'Must be at least 6 characters',
//                                         },
//                                     })}
//                                 />
//                                 {errors.password && (
//                                     <small className="text-danger">{errors.password.message}</small>
//                                 )}
//                             </div>
//                             <div className="d-grid">
//                                 <button type="submit" className="btn btn-dark rounded-pill">
//                                     {modalType === 'signIn' ? 'Sign In' : 'Sign Up'}
//                                 </button>
//                             </div>
//                             <div className="text-center mt-3">
//                                 {modalType === 'signIn' ? (
//                                     <p>
//                                         Not a member?{' '}
//                                         <button
//                                             type="button"
//                                             className="btn btn-link p-0 text-decoration-none text-dark fw-bold"
//                                             onClick={toggleModalType}
//                                         >
//                                             Sign up now
//                                         </button>
//                                     </p>
//                                 ) : (
//                                     <p>
//                                         Already a member?{' '}
//                                         <button
//                                             type="button"
//                                             className="btn btn-link p-0 text-decoration-none text-dark fw-bold"
//                                             onClick={toggleModalType}
//                                         >
//                                             Sign in
//                                         </button>
//                                     </p>
//                                 )}
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AuthModal;

import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'bootstrap';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications.

const AuthModal = () => {
    const [modalType, setModalType] = useState('signIn'); // Toggle between sign in and sign up
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Navigation hook

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // Login function
    const handleLogin = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:3000/login', data);

            if (response.data.message) {
                localStorage.setItem('userId', response.data.user._id);
                localStorage.setItem('email', response.data.user.email);
                toast.success('Login successful!');
                closeModal();
                navigate('/home');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Invalid Email or Password');
        }
    };

    // Registration function
    const handleRegister = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:3000/userRegister', data);

            if (response.data.message) {
                localStorage.setItem('userId', response.data.user._id);
                localStorage.setItem('name', response.data.user.name);
                localStorage.setItem('email', response.data.user.email);
                toast.success('Registration successful!');
                closeModal();
                navigate('/home');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Registration failed. Please try again.');
        }
    };

    const onSubmit = (data) => {
        if (modalType === 'signIn') {
            handleLogin(data);
        } else {
            handleRegister(data);
        }
    };

    const toggleModalType = () => {
        setModalType(modalType === 'signIn' ? 'signUp' : 'signIn');
        setErrorMessage('');
        reset();
    };

    const closeModal = () => {
        const modalElement = document.getElementById('authModal');
        if (modalElement) {
            const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
            modalInstance.hide();
        }
    };

    return (
        <div
            className="modal fade"
            id="authModal"
            tabIndex="-1"
            aria-labelledby="authModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fs-4" id="authModalLabel">
                            {modalType === 'signIn' ? 'Sign In' : 'Sign Up'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body d-flex flex-column">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {modalType === 'signUp' && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            {...register('firstName', {
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
                                        {errors.firstName && (
                                            <small className="text-danger">{errors.firstName.message}</small>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            {...register('lastName', {
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
                                        {errors.lastName && (
                                            <small className="text-danger">{errors.lastName.message}</small>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
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
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 6,
                                            message: 'Must be at least 6 characters',
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <small className="text-danger">{errors.password.message}</small>
                                )}
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-dark rounded-pill">
                                    {modalType === 'signIn' ? 'Sign In' : 'Sign Up'}
                                </button>
                            </div>
                        </form>
                        <div className="text-center mt-3">
                            {modalType === 'signIn' ? (
                                <p>
                                    Not a member?{' '}
                                    <button
                                        type="button"
                                        className="btn btn-link p-0 text-decoration-none text-dark fw-bold"
                                        onClick={toggleModalType}
                                    >
                                        Sign up now
                                    </button>
                                </p>
                            ) : (
                                <p>
                                    Already a member?{' '}
                                    <button
                                        type="button"
                                        className="btn btn-link p-0 text-decoration-none text-dark fw-bold"
                                        onClick={toggleModalType}
                                    >
                                        Sign in
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;

