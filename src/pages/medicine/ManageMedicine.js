/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import EditIcon from '../../components/svg/EditIcon'
import DeleteIcon from '../../components/svg/DeleteIcon'
import AddIcon from '../../components/svg/AddIcon'
import CloseModal from '../../components/svg/CloseModal'
import './ManageMedicine.css'


import { Checkbox, Label, Modal, TextInput } from "flowbite-react"

const ManageMedicine = () => {

    const [medicine, setMedicine] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [medicineItem, setMedicineItem] = useState([]);
    const [categories, setCategory] = useState([]);
    const [companyes, setCompany] = useState([]);

    const [orderType, setOrderType] = useState('sell');


    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setFinalFilterData] = useState(medicine);

    const token = localStorage.getItem('token')

    const getMedicine = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/medicine', {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setMedicine(response.data.medicine)
            setFinalFilterData(response.data.medicine)


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
        const filteredData = medicine?.filter(item =>
            item.medicine_name.toLowerCase().includes(event.target.value.toLowerCase())
        );

        setFinalFilterData(filteredData)

    };



    const handleFilter = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const filtered = medicine.filter(item => {
            const itemDate = new Date(item.purchase_date);
            return itemDate >= start && itemDate <= end;
        });
        setFinalFilterData(filtered);
    };

    const totalPurchasePrice = data?.reduce((accumulator, item) => {
        return parseFloat(accumulator) + parseFloat(item.purchase_price);
    }, 0);

    const totalSellingPrice = data?.reduce((accumulator, item) => {
        return parseFloat(accumulator) + parseFloat(item.selling_price);
    }, 0);


    function onCloseModal() {
        setOpenModal(false);
    }

    const orderOperation = (id) => {
        const getSpecificMedicine = async () => {

            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/medicine/getitem/${id = id}`, {
                    headers: {
                        Authorization: 'Bearer' + ' ' + token,
                    },
                });

                setMedicineItem(response.data.medicine)
                setCategory(response.data.categories)
                setCompany(response.data.companyes)

            } catch (error) {
                console.log(error);

            }

        }

        getSpecificMedicine()
        setOpenModal(true)
    }

    const orderSubmit = async (event) => {
        event.preventDefault();

        const category_id = event.target.category_id.value;
        const company_id = event.target.company_id.value;
        const medicine_id = event.target.medicine_id.value;
        const quantity = event.target.quantity.value;
        const sellingPrice = event.target.selling_price?.value;
        const purchasePrice = event.target.purchase_price?.value;
        const expired_date = event.target.expired_date.value;
        const order_type = orderType;

        //    console.log('Category ID=' + category_id + 'Company ID=' + company_id + 'Medicine ID=' + medicine_id + 'Quantity=' + quantity + 'Purchase Price=' + purchase_price + 'Selling Price=' + selling_price + 'Expired Date=' + expired_date + 'Order Type=' + order_type)

        if (!category_id) {
            toast.error('Please select Category')
        } else if (!company_id) {
            toast.error('Please select Company')
        } else if (!medicine_id) {
            toast.error('Please select Medicine')
        } else if (!quantity) {
            toast.error('Please select Quantity')
        } else if (!expired_date) {
            toast.error('Please select expired date')
        }


        if (orderType === 'sell') {
            if (parseInt(quantity) > parseInt(medicineItem.stock)) {
                toast.error('Your Stock is not available')
                return 0
            }

            var totalQuantity = parseInt(medicineItem.stock) - parseInt(quantity);
            var totalPurchasePrice = event.target.purchase_price?.value;
            var totalSellingPrice = parseFloat(medicineItem.selling_price) + parseFloat(event.target.selling_price?.value);
        }

        if (orderType === 'buy') {
            var totalQuantity = parseInt(medicineItem.stock) + parseInt(quantity);
            var totalPurchasePrice = parseFloat(medicineItem.purchase_price) + parseFloat(event.target.purchase_price?.value);
            var totalSellingPrice = event.target.selling_price?.value;
        }


        try {
            const response = await axios.post('http://127.0.0.1:8000/api/order', {
                category_id,
                company_id,
                medicine_id,
                quantity,
                sellingPrice:sellingPrice ? sellingPrice : 0,
                purchasePrice:purchasePrice ? purchasePrice : 0,
                expired_date,
                order_type,
                totalQuantity:totalQuantity,
                totalPurchasePrice:totalPurchasePrice?totalPurchasePrice:medicineItem.purchase_price,
                totalSellingPrice:totalSellingPrice?totalSellingPrice:medicineItem.selling_price
            }, {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            console.log(response)
            if(response.data.success){
                toast.success(response.data.msg)
                setOpenModal(false)
                
                
                
            }else{
                toast.error(response.data.msg)
            }

        } catch (error) {
            console.log(error);

        }

    }


    return (
        <div className='container-fluid'>
            <ToastContainer />
            <div className='card p-3 rounded-0 border-0'>
                <div className='py-4 d-flex justify-content-between'>
                    <h2 className="text-secondary">Manage Medicine</h2>
                    <div>
                        <Link to="/admin/medicine/add" className='btn btn-primary'> + Add Medicine</Link>
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
                <div className='table-responsive'>
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
                                data?.map((item, index) => {
                                    return (
                                        <tr className='text-center' key={index}>
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
                                                <a href='#' onClick={() => orderOperation(item.id)} className='text-primary'><AddIcon /></a>
                                                <Link to={`/admin/medicine/update/${item.id}`}><EditIcon /></Link>
                                                <a href='#' onClick={() => medicineDelete(item.id)} className='text-danger'><DeleteIcon /></a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }

                            <tr className='text-center'>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='font-weight-bold'>Total</td>
                                <td className='font-weight-bold'>{totalPurchasePrice} Tk</td>
                                <td className='font-weight-bold'>{totalSellingPrice} Tk</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>

                        </tbody>
                    </Table>


                </div>
            </div>
            <Modal show={openModal} size="md" className='mt-5 w-100 mx-auto' onClose={onCloseModal} popup>
                <div className='d-flex justify-content-end'>
                    <a href='#' onClick={() => onCloseModal(true)} className='text-primary p-4'><CloseModal /></a>
                </div>
                <Modal.Body>
                    <div className='px-5 pb-5'>
                        <h2 className="py-3">Order Now</h2>
                        <form onSubmit={orderSubmit}>
                            <div className='row gy-3'>

                                <div className='col-lg-6'>
                                    <Form.Group>
                                        <lebel className="mb-2">Medicine Select</lebel>
                                        <select class="form-select" name='medicine_id' aria-label=".form-select-lg example" required>
                                            <option >Select Medicine Company</option>
                                            {
                                                medicine?.map(item => {
                                                    return <option value={item.id} selected={item.id === medicineItem.id}>{item.medicine_name}</option>
                                                })
                                            }


                                        </select>
                                    </Form.Group>
                                </div>


                                <div className='col-lg-6'>
                                    <Form.Group>
                                        <lebel className="mb-2">Company Name</lebel>
                                        <select class="form-select" name='company_id' aria-label=".form-select-lg example" required>
                                            <option selected>Select Medicine Company</option>
                                            {
                                                companyes?.map(company => {
                                                    return <option value={company.id} selected={company.id === medicineItem.company_id}>{company.company_name}</option>
                                                })
                                            }


                                        </select>
                                    </Form.Group>
                                </div>


                                <div className='col-lg-3'>
                                    <Form.Group>
                                        <lebel className="mb-2">Category</lebel>
                                        <select class="form-select" name='category_id' aria-label=".form-select-lg example" required>
                                            <option selected>Select Medicine Category</option>
                                            {
                                                categories.map(category => {
                                                    return <option value={category.id} selected={category.id === medicineItem.category_id}>{category.category_name}</option>
                                                })
                                            }
                                        </select>

                                    </Form.Group>
                                </div>

                                <div className='col-lg-3'>
                                    <Form.Group>
                                        <lebel className="mb-2">Order Type</lebel>
                                        <select class="form-select" name='order_type' onChange={e => setOrderType(e.target.value)} required>
                                            <option selected>Select Type</option>
                                            <option value="sell">Sell</option>
                                            <option value="buy">Buy</option>
                                        </select>
                                    </Form.Group>
                                </div>


                                <div className='col-lg-3'>
                                    {
                                        orderType === 'sell' ? <Form.Group>
                                            <lebel className="mb-2">Selling Price</lebel>
                                            <Form.Control type="number" name='selling_price' placeholder='Selling Price'/>
                                        </Form.Group> : <Form.Group>
                                            <lebel className="mb-2">Purchase Price</lebel>
                                            <Form.Control type="number" name='purchase_price' placeholder='Purchase Price'/>
                                        </Form.Group>
                                    }

                                </div>



                                <div className='col-lg-3'>
                                    <Form.Group>
                                        <lebel className="mb-2">Expired Date</lebel>
                                        <Form.Control type="date" name='expired_date' required />
                                    </Form.Group>

                                </div>


                                <div className='col-lg-3'>
                                    <Form.Group>
                                        <lebel className="mb-2">Quantity</lebel>
                                        <Form.Control type="number" name='quantity' required />
                                    </Form.Group>

                                </div>

                            </div>


                            <Button variant="primary mt-4" type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default ManageMedicine;