import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const BlogEdit = () => {
    const navigate = useNavigate();
    const blogId_from_url = useParams();
    const blogid = blogId_from_url.blogid;
    // console.log("Blogid", blogId_from_url.blogid);


    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const userId = JSON.parse(localStorage.getItem('userId'));

    const fetchBlogData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:3000/getSingleBlog/${blogid}`);
            // console.log("blogtitle", response.data.blog);
            reset(response.data.blog);
        } catch (error) {
            console.log(error, 'This is error');
        }
    }

    useEffect(() => {
        fetchBlogData();
    }, [blogid]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`http://127.0.0.1:3000/updateBlog/${blogid}`, data);
            console.log("response", response.data);
            // window.location.reload();
        } catch (error) {
            console.log(error, "error");
        }
        navigate('/profile');
        reset();
    };

    return (
        <>
            <div className="container d-flex justify-content-center">
                <div className='w-50' >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-3 mt-5'>
                            <input
                                type="text"
                                id="title"
                                className='fs-1 border w-100 p-2'
                                {...register('title', { required: 'Title is required' })}
                                style={{ fontFamily: 'Times New Roman' }}
                                placeholder='Title'
                            />
                            {errors.title && (
                                <small className="text-danger">{errors.title.message}</small>
                            )}
                        </div>
                        <div className='mb-3 mt-5 d-none'>
                            <input
                                type="text"
                                id="user"
                                value={userId}
                                {...register('user', { required: 'Title is required' })}
                                style={{ fontFamily: 'Times New Roman' }}
                            />

                        </div>
                        <div className='mb-3'>
                            <textarea
                                id="description"
                                className='fs-5 border w-100 p-2'
                                {...register('description', { required: 'Description is required' })}
                                style={{ fontFamily: 'Times New Roman' }}
                                rows="10"
                                placeholder='Tell Your Story...'
                            />
                            {errors.description && (
                                <small className="text-danger">{errors.description.message}</small>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-outline-success rounded-pill px-3"
                            style={{
                                cursor: 'pointer'
                            }}
                            onClick={handleSubmit(onSubmit)}
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BlogEdit;
