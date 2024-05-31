import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user_login', {
                email: event.target.email.value,
                password: event.target.password.value,
            });

            localStorage.setItem("token", response.data.token);
            if(response.data.token){
                navigate("/");
            }

            

        } catch (error) {
            console.log(error);

        }

    }

    
    return (
        <div className='container mt-5 pt-5'>
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    <div className='card p-5'>
                        <form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;