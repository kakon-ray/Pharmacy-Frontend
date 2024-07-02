import axios from 'axios';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from '../../../context/TokenContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const navigate = useNavigate();
    const [token, setToken] = useContext(TokenContext);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://testapi.web-builderit.com/api/user_login', {
                email: event.target.email.value,
                password: event.target.password.value,
            });
            console.log(response)

            if (response.data.token) {
                
                localStorage.setItem("token", response.data.token);
                setToken(response.data)
                if(response.data.role === 'user'){
                    navigate("/user/manage/medicine");
                   
                }else{
                    navigate("/");
                }
               
                
            } else {
                toast.error('Login faild please try again')
            }

        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='container mt-5 pt-5'>
            <ToastContainer />
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    <div className='card p-5'>
                    <h2 className="text-center pb-5 text-secondary">Login In Your Account</h2>
                        <form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" />
                            </Form.Group>

                            <div className='text-center py-4'>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </form>

                        <div className="card-body text-center">
                            <Link to='/password/reset' className='nav-link'>Forget Password Password Reset</Link>
                        </div>

                        <div className="card-body text-center">
                            <Link to='/registration' className='nav-link'>Do not have any Account Registration</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;