import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

const Home = () => {

    const [dashboardData, setDashboardData] = useState({})
    const token = localStorage.getItem('token')

    const getOrders = async () => {

        try {
            const response = await axios.get('http://testapi.web-builderit.com/api/dashboard/data', {
                headers: {
                    Authorization: 'Bearer' + ' ' + token,
                },
            });

            setDashboardData(response.data)


        } catch (error) {
            console.log(error);

        }

    }


    useEffect(() => {
        getOrders()
    }, [])


    return (
        <div className="container-fluid text-light">
            <div className='row'>

                <div className='col-lg-2'>
                    <div className="card text-bg-primary mb-3">
                        <div className="card-header">Total Medicine Item</div>
                        <div className="card-body">
                            <h5 className="card-title">{dashboardData.medicineCount}</h5>
                           
                        </div>
                    </div>
                </div>

                <div className='col-lg-2'>
                    <div className="card text-bg-warning mb-3">
                        <div className="card-header">Total Brand</div>
                        <div className="card-body">
                            <h5 className="card-title">{dashboardData.brandCount}</h5>
                        </div>
                    </div>
                </div>

                <div className='col-lg-2'>
                    <div className="card text-bg-warning mb-3">
                        <div className="card-header">Category</div>
                        <div className="card-body">
                            <h5 className="card-title">{dashboardData.categoryCount}</h5>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2'>
                    <div className={`card ${dashboardData.orderCount === 0 ? 'text-bg-danger' : 'text-bg-warning'} mb-3`}>
                        <div className="card-header">Total Order</div>
                        <div className="card-body">
                            <h5 className="card-title">{dashboardData.orderCount}</h5>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2'>
                    <div className={`card ${dashboardData.sellOrderCount === 0 ? 'text-bg-danger' : 'text-bg-warning'} mb-3`}>
                        <div className="card-header">Selling Order</div>
                        <div className="card-body">
                            <h5 className="card-title">{dashboardData.sellOrderCount}</h5>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2'>
                    <div className={`card ${dashboardData.purchaseOrderCount === 0 ? 'text-bg-danger' : 'text-bg-warning'} mb-3`}>
                        <div className="card-header">Purchase Order</div>
                        <div className="card-body">
                            <h5 className="card-title">{dashboardData.purchaseOrderCount}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;