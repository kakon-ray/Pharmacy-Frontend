import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

const Home = () => {

    const [dashboardData, setDashboardData] = useState({})
    const token = localStorage.getItem('token')

    const getOrders = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/dashboard/data', {
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
        <div class="container-fluid text-light">
            <div className='row'>

                <div className='col-lg-2'>
                    <div class="card text-bg-primary mb-3">
                        <div class="card-header">Total Medicine Item</div>
                        <div class="card-body">
                            <h5 class="card-title">{dashboardData.medicineCount}</h5>
                           
                        </div>
                    </div>
                </div>

                <div className='col-lg-2'>
                    <div class="card text-bg-warning mb-3">
                        <div class="card-header">Total Brand</div>
                        <div class="card-body">
                            <h5 class="card-title">{dashboardData.brandCount}</h5>
                        </div>
                    </div>
                </div>

                <div className='col-lg-2'>
                    <div class="card text-bg-warning mb-3">
                        <div class="card-header">Category</div>
                        <div class="card-body">
                            <h5 class="card-title">{dashboardData.categoryCount}</h5>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2'>
                    <div class={`card ${dashboardData.orderCount === 0 ? 'text-bg-danger' : 'text-bg-warning'} mb-3`}>
                        <div class="card-header">Total Order</div>
                        <div class="card-body">
                            <h5 class="card-title">{dashboardData.orderCount}</h5>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2'>
                    <div class={`card ${dashboardData.sellOrderCount === 0 ? 'text-bg-danger' : 'text-bg-warning'} mb-3`}>
                        <div class="card-header">Selling Order</div>
                        <div class="card-body">
                            <h5 class="card-title">{dashboardData.sellOrderCount}</h5>
                        </div>
                    </div>
                </div>
                <div className='col-lg-2'>
                    <div class={`card ${dashboardData.purchaseOrderCount === 0 ? 'text-bg-danger' : 'text-bg-warning'} mb-3`}>
                        <div class="card-header">Purchase Order</div>
                        <div class="card-body">
                            <h5 class="card-title">{dashboardData.purchaseOrderCount}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;