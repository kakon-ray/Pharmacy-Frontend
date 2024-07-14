import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MedicineUpdate = () => {


    const [medicine, setMedicine] = useState({});
    const [categories, setCategory] = useState([]);
    const [companyes, setCompany] = useState([]);

    const token = localStorage.getItem('token')
    let { id } = useParams();

    const getSpecificMedicine = async () => {

        try {
            const response = await axios.get(`https://testapi.web-builderit.com/api/medicine/getitem/${id = id}`, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setMedicine(response.data.medicine)
            setCategory(response.data.categories)
            setCompany(response.data.companyes)

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        getSpecificMedicine()
    }, [])


    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://testapi.web-builderit.com/api/medicine/edit', {
                medicine_name: event.target.medicine_name.value,
                category_id: event.target.category_id.value,
                company_id: event.target.company_id.value,
                purchase_date: event.target.purchase_date.value,
                purchase_price: event.target.purchase_price.value,
                selling_price: event.target.selling_price.value?event.target.selling_price.value:0,
                expired_date: event.target.expired_date.value?event.target.expired_date.value:0,
                stock: event.target.stock.value,
                id: id,
            }, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

         console.log(response)
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
                <form onSubmit={handleUpdate}>
                    <div className='row gy-3'>
                        <div className='col-lg-6'>
                            <Form.Group>
                                <lebel className="mb-2">Medicine Name</lebel>
                                <Form.Control type="text" defaultValue={medicine.medicine_name} name='medicine_name' placeholder="Medicine Name" />
                            </Form.Group>
                        </div>
                        
                        <div className='col-lg-6'>
                            <Form.Group>
                                <lebel className="mb-2">Company Name</lebel>
                                <select className="form-select" name='company_id' aria-label=".form-select-lg example" required>
                                    {
                                        companyes?.map(company => {
                                            return <option key={company.id} value={company.id} selected={company.id == medicine.company_id}>{company.company_name}</option>
                                        })
                                    }
                                    
                                </select>
                            </Form.Group>
                        </div>


                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Category</lebel>
                                <select className="form-select" name='category_id' aria-label=".form-select-lg example" required>
                                    {
                                        categories.map(category => {
                                            return <option key={category.id} value={category.id} selected={category.id == medicine.category_id}>{category.category_name}</option>
                                        })
                                    }
                                    
                                </select>
                       
                            </Form.Group>
                        </div>


                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Purchase Date</lebel>
                                <Form.Control type="date" defaultValue={medicine.purchase_date} name='purchase_date' placeholder="Purchase Date" />
                            </Form.Group>
                        </div>

                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Purchase Price</lebel>
                                <Form.Control type="number" defaultValue={medicine.purchase_price} name='purchase_price' placeholder="Price" />
                            </Form.Group>
                        </div>

                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Selling Price</lebel>
                                <Form.Control type="number" defaultValue={medicine.selling_price} name='selling_price' placeholder="Price" />
                            </Form.Group>
                        </div>

                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Expired Date</lebel>
                                <Form.Control type="date" defaultValue={medicine.expired_date} name='expired_date' placeholder="Medicine Date" />
                            </Form.Group>

                        </div>

                        <div className='col-lg-3'>
                            <Form.Group>
                                <lebel className="mb-2">Quantity</lebel>
                                <Form.Control type="number" defaultValue={medicine.stock} name='stock' placeholder="Quantity" />
                            </Form.Group>

                        </div>

                    </div>


                    <Button variant="primary mt-4" type="submit">
                        Update
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default MedicineUpdate;