import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {


    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/sign_up', {
                name: event.target.name.value,
                email: event.target.email.value,
                password: event.target.password.value,
            });

            if (response.data.success) {
                toast.success(response.data.success)
            } else {
                toast.error('Registration Faild')
            }



        } catch (error) {
            console.log(error);

        }

    }

    return (
        <div>
            <div className='container mt-5 pt-5'>
                <ToastContainer />
                <div className='row'>
                    <div className='col-lg-6 mx-auto'>
                        <div className='card p-5'>
                            <h2 className="text-center pb-5 text-secondary">Registration In Your Account</h2>
                            <form onSubmit={handleLogin}>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder="Your Name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" name="password_confirmation" placeholder="Confirm Password" />
                                </Form.Group>

                                <div className='text-center py-4'>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </div>
                            </form>

                            <div className="card-body text-center">
                                <Link to='/login' className='nav-link'>Login Your Account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;