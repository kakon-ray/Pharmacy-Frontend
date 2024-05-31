import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedicineAdd = () => {

    const token = localStorage.getItem('token')


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/medicine/add', {
                medicine_name: event.target.medicine_name.value,
                category: event.target.category.value,
                brand_name: event.target.brand_name.value,
                purchase_date: event.target.purchase_date.value,
                price: event.target.price.value,
                expired_date: event.target.expired_date.value,
                stock: event.target.stock.value,
            }, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });


            if (response.data.success) {
                toast.success(response.data.success)
            } else if (response.data.error) {
                toast.error(response.data.error)
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
                        <Link to="/medicine" className='btn btn-primary'> Manage Medicine</Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='row gy-3'>
                        <div className='col-lg-6'>
                            <Form.Group>
                                <lebel className="mb-2">Medicine Name</lebel>
                                <Form.Control type="text" name='medicine_name' placeholder="Medicine Name" required />
                            </Form.Group>
                        </div>

                        <div className='col-lg-6'>
                            <Form.Group>
                                <lebel className="mb-2">Company Name</lebel>
                                <Form.Control type="text" name='brand_name' placeholder="Company" required />
                            </Form.Group>
                        </div>


                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Category</lebel>
                                <Form.Control type="text" name='category' placeholder="Category" required />
                            </Form.Group>
                        </div>


                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Purchase Date</lebel>
                                <Form.Control type="date" name='purchase_date' placeholder="Purchase Date" required />
                            </Form.Group>
                        </div>

                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Price</lebel>
                                <Form.Control type="number" name='price' placeholder="Price" required />
                            </Form.Group>
                        </div>

                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Medicine Date</lebel>
                                <Form.Control type="date" name='expired_date' placeholder="Medicine Date" required />
                            </Form.Group>

                        </div>

                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Quantity</lebel>
                                <Form.Control type="number" name='stock' placeholder="Quantity" required />
                            </Form.Group>

                        </div>

                    </div>


                    <Button variant="primary mt-4" type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default MedicineAdd;