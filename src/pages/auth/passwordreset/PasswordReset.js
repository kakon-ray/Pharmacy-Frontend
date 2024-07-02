import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordReset = () => {

    const handlePasswordReset = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://testapi.web-builderit.com/api/reset_password', {
                email: event.target.email.value,
            });

            if(response.data.success === true){
                toast.success(response.data.msg)
            }else{
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
                        <form onSubmit={handlePasswordReset}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" />
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

export default PasswordReset;