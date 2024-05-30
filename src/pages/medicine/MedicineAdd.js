import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MedicineAdd = () => {
    return (
        <div className='container'>
            <div className='card p-4 rounded-0 border-0'>
            <div className='py-4 d-flex justify-content-between'>
                    <h2 className="text-secondary">Medicine Add</h2>
                    <div>
                        <Link to="/medicine" className='btn btn-primary'> Manage Medicine</Link>
                    </div>
                </div>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default MedicineAdd;