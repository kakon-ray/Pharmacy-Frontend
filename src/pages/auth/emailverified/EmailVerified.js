
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import axios from 'axios';

const EmailVerified = () => {
    const [response, setResponse] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token')
    const email = searchParams.get('email')


    const handleRequest = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/email-verified', {
                token,
                email
            });

            setResponse(response.data.success)

            console.log(response.data)

        } catch (error) {
            console.log(error);

        }
    };


    useEffect(() => {
        handleRequest()
    }, [response]);




    return (
        <main className="text-center mt-5 pt-5">

            {response ? <div class="card mx-auto mt-5" style={{ 'width': '18rem' }}>
                <div class="card-body">
                    <div class="alert alert-success mb-0" role="alert">
                        <h4 class="alert-heading">Well done!</h4>
                        <p>Successfully verified your email please login your account</p>
                        <hr />
                        <Link to='/' className='nav-link'>Login Your Account</Link>
                    </div>
                   
                </div>
            </div> : ""}

        </main>
    );
};

export default EmailVerified;