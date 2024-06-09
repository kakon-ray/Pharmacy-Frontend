import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateCategory = () => {


    const [category, setCategory] = useState({});

    const token = localStorage.getItem('token')
    let { id } = useParams();

    const getSpecificMedicine = async () => {

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/category/getitem/${id = id}`, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setCategory(response.data.category)

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        getSpecificMedicine()
    }, [])


    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/category/edit', {
                category_name: event.target.category_name.value,
                category_slug: event.target.category_slug.value,
                id: id,
            }, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            if (response.data.success) {
                toast.success(response.data.msg)
            } else if (response.data.success) {
                toast.error(response.data.msg)
            }



        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='container'>
            <ToastContainer />
            <div className='card p-4 rounded-0 border-0'>
                <div className='py-4 d-flex justify-content-between'>
                    <h2 className="text-secondary">Medicine Add</h2>
                    <div>
                        <Link to="/admin/medicine" className='btn btn-primary'> Manage Medicine</Link>
                    </div>
                </div>
                <form onSubmit={handleUpdate}>
                    <div className='row gy-3'>

                        <div className='col-lg-6'>
                            <Form.Group>
                                <lebel className="mb-2">Category Name</lebel>
                                <Form.Control type="text" name='category_name' defaultValue={category.category_name} placeholder="Medicine Name" required />
                            </Form.Group>
                        </div>

                        <div className='col-lg-6'>
                            <Form.Group>
                                <lebel className="mb-2">Category Slug</lebel>
                                <Form.Control type="text" name='category_slug' defaultValue={category.category_slug} placeholder="Category Name" required />
                            </Form.Group>
                        </div>


                    </div>


                    <Button variant="primary mt-4" type="submit">
                        Update
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UpdateCategory;

