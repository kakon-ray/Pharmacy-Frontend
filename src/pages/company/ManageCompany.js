/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '../../components/svg/EditIcon'
import DeleteIcon from '../../components/svg/DeleteIcon'

const ManageCompany = () => {

    const [company, setcompany] = useState([]);

    const token = localStorage.getItem('token')

    const getcompany = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/company', {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setcompany(response.data.companys)

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

                const newcompany = company.filter(item => item.id !== id ? item : '')
                setcompany(newcompany);

            }else{
                toast.error(response.data.msg)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        getcompany()
    }, [])

    

    return (
        <div className='container'>
            <ToastContainer />
            <div className='card p-3 rounded-0 border-0'>
                <div className='py-4 d-flex justify-content-between'>
                    <h2 className="text-secondary">Manage company</h2>
                    <div>
                        <Link to="/admin/company/add" className='btn btn-primary'> + Add company</Link>
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>company</th>
                            <th>company Slug</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            company?.map((item, index) => {
                                return (
                                    <tr className='text-center'>
                                        <td>{index + 1}</td>
                                        <td>{item.company_name}</td>
                                        <td>{item.company_slug}</td>
                                        <td className='d-flex align-items-center gap-4 justify-content-center'>
                                            <Link to={`/admin/company/update/${item.id}`}><EditIcon/></Link>
                                            <a href='#' onClick={()=>companyDelete(item.id)} className='text-danger'><DeleteIcon/></a>
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

export default ManageCompany;