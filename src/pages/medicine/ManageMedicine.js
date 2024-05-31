/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '../../components/svg/EditIcon'
import DeleteIcon from '../../components/svg/DeleteIcon'

const ManageMedicine = () => {

    const [medicine, setMedicine] = useState([]);

    const token = localStorage.getItem('token')

    const getMedicine = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/medicine', {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setMedicine(response.data.medicine)

        } catch (error) {
            console.log(error);

        }

    }

    const medicineDelete = async (id) => {

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/medicine/delete/${id=id}`, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            if (response.data.success) {
                toast.success(response.data.success)

                const newMedicine = medicine.filter(item => item.id !== id ? item : '')
                setMedicine(newMedicine);

            }else if(response.data.error){
                toast.error(response.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        getMedicine()
    }, [])

    return (
        <div className='container'>
            <ToastContainer />
            <div className='card p-3 rounded-0 border-0'>
                <div className='py-4 d-flex justify-content-between'>
                    <h2 className="text-secondary">Manage Medicine</h2>
                    <div>
                        <Link to="/medicine/add" className='btn btn-primary'> + Add Medicine</Link>
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Medicine Name</th>
                            <th>Category</th>
                            <th>Brand Name</th>
                            <th>Purchase Date</th>
                            <th>Price</th>
                            <th>Expired Date</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicine?.map((item, index) => {
                                return (
                                    <tr className='text-center'>
                                        <td>{index + 1}</td>
                                        <td>{item.medicine_name}</td>
                                        <td>{item.category}</td>
                                        <td>{item.brand_name}</td>
                                        <td>{item.purchase_date}</td>
                                        <td>{item.price}</td>
                                        <td>{item.expired_date}</td>
                                        <td>{item.stock}</td>
                                        <td className='d-flex align-items-center gap-4 justify-content-center'>
                                            <Link to={`/medicine/update/${item.id}`}><EditIcon/></Link>
                                            <a href='#' onClick={()=>medicineDelete(item.id)} className='text-danger'><DeleteIcon/></a>
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