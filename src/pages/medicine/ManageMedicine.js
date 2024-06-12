/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '../../components/svg/EditIcon'
import DeleteIcon from '../../components/svg/DeleteIcon'

const ManageMedicine = () => {

    const [medicine, setMedicine] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const token = localStorage.getItem('token')

    const getMedicine = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/medicine', {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setMedicine(response.data.medicine)
            console.log(response)

        } catch (error) {
            console.log(error);

        }

    }

    const medicineDelete = async (id) => {

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/medicine/delete/${id = id}`, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            if (response.data.success) {
                toast.success(response.data.success)

                const newMedicine = medicine.filter(item => item.id !== id ? item : '')
                setMedicine(newMedicine);


            } else if (response.data.error) {
                toast.error(response.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        getMedicine()
    }, [])

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredData = medicine?.filter(item =>
        item.medicine_name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className='container'>
            <ToastContainer />
            <div className='card p-3 rounded-0 border-0'>
                <div className='py-4 d-flex justify-content-end me-4'>
                    <div>
                        <Link to="/admin/medicine/add" className='btn btn-primary'> + Add Medicine</Link>
                    </div>
                </div>

                <div className='d-flex justify-content-between m-4'>
                <h2 className="text-secondary">Manage Medicine</h2>
                    <div className='w-25'>
                        <Form.Control type="text" name='search_medicine' placeholder="Search Medicine" value={searchQuery}
                            onChange={handleSearchChange} />
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Medicine Name</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Purchase Date</th>
                            <th>Purchase Price</th>
                            <th>Selling Price</th>
                            <th>Expired Date</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredData?.map((item, index) => {
                                return (
                                    <tr className='text-center'>
                                        <td>{index + 1}</td>
                                        <td>{item.medicine_name}</td>
                                        <td>{item?.category?.category_name}</td>
                                        <td>{item?.company?.company_name}</td>
                                        <td>{item.purchase_date}</td>
                                        <td>{item.purchase_price}</td>
                                        <td>{item.selling_price}</td>
                                        <td>{item.expired_date}</td>
                                        <td>{item.stock}</td>
                                        <td className='d-flex align-items-center gap-4 justify-content-center'>
                                            <Link to={`/admin/medicine/update/${item.id}`}><EditIcon /></Link>
                                            <a href='#' onClick={() => medicineDelete(item.id)} className='text-danger'><DeleteIcon /></a>
                                        </td>
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

export default ManageMedicine;