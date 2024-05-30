import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <>

            <div className='row'>
                <div className='col-xl-2 col-lg-2 col-md-3 col-12 pe-0'>
                    <Sidebar />
                </div>
                <div className='col-xl-10 col-lg-10 col-md-9 col-12 ps-0'>
                    <div className='pt-5 mt-3'>
                       <Outlet />
                    </div>
                </div>
            </div>

        </>
    );
};

export default Dashboard;