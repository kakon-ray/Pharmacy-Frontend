
import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from "react-router-dom";
import axios from 'axios';

const EmailVerified = () => {
    const [response, setResponse] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token')
    const email = searchParams.get('email')

    const count = useRef(null);

    const handleRequest = async () => {
        try {
            const response = await axios.post('http://testapi.web-builderit.com/api/email-verified', {
                token,
                email
            });

            if(response.data.success){
                setResponse(response.data.msg)
            }

        } catch (error) {
            console.log(error);

        }
    };


    useEffect(() => {
   
        if(count.current == null){
            handleRequest()
        }

        return () => { count.current = 1; }
    }, [response]);




    return (
        <main className="text-center mt-5 pt-5">

            {response ? <div className="card mx-auto mt-5" style={{ 'width': '18rem' }}>
                <div className="card-body">
                    <div className="alert alert-success mb-0" role="alert">
                        <h4 className="alert-heading">Well done!</h4>
                        <p>{response}</p>
                        <hr />
                        <Link to='/' className='nav-link'>Login Your Account</Link>
                    </div>
                   
                </div>
            </div> : <div className="card mx-auto mt-5" style={{ 'width': '18rem' }}>
                <div className="card-body">
                    <div className="alert alert-success mb-0" role="alert">
                        <h4 className="alert-heading">Sorry</h4>
                        <p>Your Token is Expired</p>
                       
                    </div>
                   
                </div>
            </div>}

        </main>
    );
};

export default EmailVerified;