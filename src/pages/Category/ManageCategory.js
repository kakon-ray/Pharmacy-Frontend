/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '../../components/svg/EditIcon'
import DeleteIcon from '../../components/svg/DeleteIcon'

const ManageCategory = () => {

    const [category, setCategory] = useState([]);

    const token = localStorage.getItem('token')

    const getCategory = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/category', {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setCategory(response.data.categories)

        } catch (error) {
            console.log(error);

        }

    }

    const categoryDelete = async (id) => {

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/category/delete/${id=id}`, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            if (response.data.success) {
                toast.success(response.data.success)

                const newCategory = category.filter(item => item.id !== id ? item : '')
                setCategory(newCategory);

            }else if(response.data.error){
                toast.error(response.data.error)
            }

        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        getCategory()
    }, [])

    

    return (
        <div className='container'>
            <ToastContainer />
            <div className='card p-3 rounded-0 border-0'>
                <div className='py-4 d-flex justify-content-between'>
                    <h2 className="text-secondary">Manage Category</h2>
                    <div>
                        <Link to="/category/add" className='btn btn-primary'> + Add Category</Link>
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>No</th>
                            <th>Category</th>
                            <th>Category Slug</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            category?.map((item, index) => {
                                return (
                                    <tr className='text-center'>
                                        <td>{index + 1}</td>
                                        <td>{item.category_name}</td>
                                        <td>{item.category_slug}</td>
                                        <td className='d-flex align-items-center gap-4 justify-content-center'>
                                            <Link to={`/category/update/${item.id}`}><EditIcon/></Link>
                                            <a href='#' onClick={()=>categoryDelete(item.id)} className='text-danger'><DeleteIcon/></a>
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

export default ManageCategory;