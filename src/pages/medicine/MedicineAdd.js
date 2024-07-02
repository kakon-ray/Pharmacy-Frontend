import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedicineAdd = () => {

    const [categories, setCategory] = useState([]);
    const [company, setCompany] = useState([]);
    const token = localStorage.getItem('token')


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://testapi.web-builderit.com/api/medicine/add', {
                medicine_name: event.target.medicine_name.value,
                category_id: event.target.category_id.value,
                company_id: event.target.company_id.value,
                purchase_date: event.target.purchase_date.value,
                purchase_price: event.target.purchase_price.value ? event.target.purchase_price.value : 0,
                selling_price: event.target.selling_price.value ? event.target.selling_price.value : 0,
                expired_date: event.target.expired_date.value,
                stock: event.target.stock.value,
            }, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });


            if (response.data.success) {
                toast.success(response.data.msg)
            } else{
                toast.error(response.data.msg)
            }



        } catch (error) {
            console.log(error);

        }

    }


    const getCompanyCategory= async () => {

        try {
            const response = await axios.get(`https://testapi.web-builderit.com/api/get/company/category`, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setCompany(response.data.companyes)
            setCategory(response.data.categories)

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(()=>{
        getCompanyCategory()
    },[])


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
                                <select className="form-select" name='company_id' aria-label=".form-select-lg example" required>
                                    <option selected>Select Medicine Company</option>
                                    {company.map(item => {
                                        return <option value={item.id}>{item.company_name}</option>
                                    })}
                                    
                                </select>
                            </Form.Group>
                        </div>


                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Category</lebel>
                                <select className="form-select" name='category_id' aria-label=".form-select-lg example" required>
                                    <option selected>Select Medicine Category</option>
                                    {
                                        categories.map(item => {
                                            return <option value={item.id}>{item.category_name}</option>
                                        })
                                    }
                                </select>
                       
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
                                <lebel className="mb-2">Purchase Price</lebel>
                                <Form.Control type="number" name='purchase_price' placeholder="Purchase Price" />
                            </Form.Group>
                        </div>
                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Selling Price</lebel>
                                <Form.Control type="number" name='selling_price' placeholder="Selling Price" />
                            </Form.Group>
                        </div>

                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Expired Date</lebel>
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