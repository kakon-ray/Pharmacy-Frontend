/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '../../components/svg/EditIcon'
import DeleteIcon from '../../components/svg/DeleteIcon'

const ManageCompany = () => {

    const [orders, setOrders] = useState([]);

    
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setFinalFilterData] = useState(orders);


    const token = localStorage.getItem('token')

    const getOrders = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/getorder', {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setOrders(response.data.orders)
            setFinalFilterData(response.data.orders)

        } catch (error) {
            console.log(error);

        }

    }

    const companyDelete = async (id) => {

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/company/delete/${id=id}`, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            if (response.data.success) {
                toast.success(response.data.msg)
            }else{
                toast.error(response.data.msg)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        getOrders()
    }, [])


    const handleSearchChange = (event) => {
        const filteredData = orders?.filter(item =>
            item.medicine.medicine_name.toLowerCase().includes(event.target.value.toLowerCase())
        );

        setFinalFilterData(filteredData)

    };



    const handleFilter = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const filtered = orders.filter(item => {
            const itemDate = new Date(item.created_at);
            return itemDate >= start && itemDate <= end;
        });
        setFinalFilterData(filtered);
    };

    

    return (
        <div className='container-fluid'>
            <ToastContainer />
            <div className='card p-3 rounded-0 border-0'>
                <div className='py-4 d-flex justify-content-between'>
                    <h2 className="text-secondary">Order History</h2>
                    <div>
                        <Link to="/admin/medicine" className='btn btn-primary'> + Add Order</Link>
                    </div>
                </div>

                <div className='d-flex justify-content-between my-4 responsive-filter'>
                    <div className='d-flex align-items-center gap-2'>

                        <input
                            type="date"
                            className='form-control'
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                        />


                        <input
                            type="date"
                            className='form-control'
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                        />

                        <button className='btn btn-primary' onClick={handleFilter}>Filter</button>
                    </div>

                    <div className='search-medicine'>
                        <Form.Control type="text" name='search_medicine' placeholder="Search Medicine"
                            onChange={(event) => handleSearchChange(event)} />
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Medicine</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Quantity</th>
                            <th>Selling Price</th>
                            <th>Purchase Price</th>
                            <th>Expired Date</th>
                            <th>Order Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((item, index) => {
                                return (
                                    <tr className='text-center'>
                                        <td>{index + 1}</td>
                                        <td>{item.medicine.medicine_name}</td>
                                        <td>{item.category.category_name}</td>
                                        <td>{item.company.company_name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.selling_price}</td>
                                        <td>{item.purchase_price}</td>
                                        <td>{item.expired_date}</td>
                                        <td>{item.order_type}</td>
                                        
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default ManageCompany;