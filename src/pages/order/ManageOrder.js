/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '../../components/svg/EditIcon'
import DeleteIcon from '../../components/svg/DeleteIcon'
import { TokenContext } from '../../context/TokenContext';
import Loading from '../../components/loading/Loading';
import { usePDF } from 'react-to-pdf';

const ManageCompany = () => {

    const [orders, setOrders] = useState([]);
    const [user, setToken] = useContext(TokenContext);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setFinalFilterData] = useState(orders);


    const token = localStorage.getItem('token')

    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });

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


    useEffect(() => {
        getOrders()
    }, [])


    const handleSearchChange = (event) => {
        const filteredData = orders?.filter(item =>
            item.medicine.medicine_name.toLowerCase().includes(event.target.value.toLowerCase()) || item.order_type.toLowerCase().includes(event.target.value.toLowerCase())
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


    if (!orders) {
        return <Loading />
    }


    const totalPurchasePrice = data?.reduce((accumulator, item) => {
        return parseFloat(accumulator) + parseFloat(item.purchase_price);
    }, 0);

    const totalSellingPrice = data?.reduce((accumulator, item) => {
        return parseFloat(accumulator) + parseFloat(item.selling_price);
    }, 0);

    console.log(totalSellingPrice)

    return (
        <div className='container-fluid'>
            <ToastContainer />
            <div className='card p-3 rounded-0 border-0'>
                <div className='py-4 d-flex justify-content-between'>
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

                    <div className='d-flex align-items-center gap-3'>
                        <button className='btn btn-primary' onClick={() => toPDF()}>Download PDF</button>
                        {
                            user.role === 'admin' ? <div>
                                <Link to="/medicine" className='btn btn-primary'> + Add Order</Link>
                            </div> : ''
                        }
                    </div>


                </div>

                <div ref={targetRef} className='p-3'>
                    <div className='d-flex justify-content-between my-4 responsive-filter'>

                        <h2 className="text-secondary">Medicine Order History</h2>

                        <div className='search-medicine'>
                            <Form.Control type="text" name='search_medicine' placeholder="Search Medicine"
                                onChange={(event) => handleSearchChange(event)} />
                        </div>
                    </div>
                    <div className='table-responsive'>

                        <Table striped bordered hover className='table-dark'>
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
                                            <tr className='text-center' key={index}>
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

                                <tr className='text-center'>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total </td>
                                    <td>{totalSellingPrice} TK</td>
                                    <td>{totalPurchasePrice} TK</td>
                                    <td></td>
                                    <td></td>

                                </tr>

                            </tbody>
                        </Table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageCompany;