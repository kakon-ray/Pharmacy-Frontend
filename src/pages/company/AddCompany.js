import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddCompany = () => {


    const token = localStorage.getItem('token')


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/company/add', {
                company_name: event.target.company_name.value,
            }, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            console.log(response)
            if (response.data.success) {
                toast.success(response.data.msg)
            } else if (response.data.error) {
                toast.error(response.data.msg)
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
                            <h2 className="text-secondary">Company Add</h2>
                            <div>
                                <Link to="/company" className='btn btn-primary'> Manage Company</Link>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='row gy-3'>
                                <div className='col-lg-12'>
                                    <Form.Group>
                                        <lebel className="mb-2">Company Name</lebel>
                                        <Form.Control type="text" name='company_name' placeholder="Company Name" required />
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

export default AddCompany;