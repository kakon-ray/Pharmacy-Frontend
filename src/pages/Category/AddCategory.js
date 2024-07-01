import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCategory = () => {

    const token = localStorage.getItem('token')


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/category/add', {
                category_name: event.target.category_name.value,
            }, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });


            if (response.data.success) {
                toast.success(response.data.success)
            } else if (response.data.error) {
                toast.error(response.data.error)
            }



        } catch (error) {
            console.log(error);

        }

    }

    return (
        <div className='container'>
            <ToastContainer />
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    <div className='card p-4 rounded-0 border-0'>
                        <div className='py-4 d-flex justify-content-between'>
                            <h2 className="text-secondary">Category Add</h2>
                            <div>
                                <Link to="/admin/category" className='btn btn-primary'> Manage Category</Link>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='row gy-3'>
                                <div className='col-lg-12'>
                                    <Form.Group>
                                        <lebel className="mb-2">Category Name</lebel>
                                        <Form.Control type="text" name='category_name' placeholder="Category Name" required />
                                    </Form.Group>
                                </div>
                            </div>
                            <Button variant="primary mt-4" type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;