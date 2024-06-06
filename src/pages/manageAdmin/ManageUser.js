/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '../../components/svg/EditIcon'
import DeleteIcon from '../../components/svg/DeleteIcon'


const ManageUser = () => {


    const [users, setUsers] = useState([]);

    const token = localStorage.getItem('token');

    const getUserInfo = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/userinfo', {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setUsers(response.data.users)

        } catch (error) {
            console.log(error);

        }

    }

    const userPermission = async (id) => {

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/medicine/delete/${id = id}`, {
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

    useEffect(() => {
        getUserInfo()
    }, [])



    return (
        <div className='container'>
            <ToastContainer />
            <div className='card p-3 rounded-0 border-0'>
                <div className='py-4 d-flex justify-content-between'>
                    <h2 className="text-secondary">Manage Medicine</h2>

                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((item, index) => {
                                return (
                                    <tr className='text-center'>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td className='d-flex align-items-center gap-4 justify-content-center'>
                                            <Link to={`/medicine/update/${item.id}`}><EditIcon /></Link>
                                            <a href='#' onClick={() => userPermission(item.id)} className='text-danger'><DeleteIcon /></a>
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

export default ManageUser;