import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };



const PasswordResetSubmit = () => {

    const query = useQuery();
    const token = query.get('token');
    const navigate = useNavigate();


    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        }
        if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter.';
        }
        if (!hasNumbers) {
            return 'Password must contain at least one number.';
        }
        if (!hasSpecialChars) {
            return 'Password must contain at least one special character.';
        }
        return '';
    };

    const passwordResetSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirm_password = event.target.newpassword.value;

        if (!validateEmail(email)) {
            toast.error('Your email is not valid')
            return 0
        }

        // const validationError = validatePassword(password);
        // if (validationError) {
        //     toast.error(validationError)
        //     return 0
        // }

        if(password !== confirm_password){
            toast.error('Two password does not match')
            return 0
        }



        try {
            const response = await axios.post('http://127.0.0.1:8000/api/new-password', {
                email: email,
                token: token,
                password: password,
            });

            if (response.data.success === true) {
                toast.success(response.data.msg)

                 setTimeout(() => {
                    navigate("/login");
                  }, 1000);


            } else {
                toast.error(response.data.msg)
            }

        } catch (error) {
            console.log(error);

        }
    }


    return (
        <div className='container pt-5 mt-5'>
            <ToastContainer />
            <div className='row'>
                <div className='col-lg-4 mx-auto'>
                    <div className='card p-3'>
                        <h2 className='text-secondary py-4 text-center'>Password Reset</h2>
                        <form onSubmit={passwordResetSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" name="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="********" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="newpassword" placeholder="********" />
                            </Form.Group>

                            <div className='text-center py-4'>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordResetSubmit;