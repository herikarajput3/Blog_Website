import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const BlogCreate = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const userId = JSON.parse(localStorage.getItem('userId'));
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:3000/blogCreate', data);
            console.log(response.data, "response data");

            if (response.data.message) {
                toast.success('Blog created successfully!');
            }
        } catch (error) {
            console.log(error, "error");
        }
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
                                rows="5"
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
                            Publish
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default BlogCreate;
