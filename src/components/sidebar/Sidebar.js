/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import Medicine from '../svg/Medicine';
import LogoutIcon from '../svg/LogoutIcon';
import UsersIcon from '../svg/UsersIcon';
import { Link } from 'react-router-dom';
import CustomLink from '../customeLink/CustomLink';
import { useNavigate } from "react-router-dom";
import { TokenContext } from '../../context/TokenContext';
import Category from '../svg/Category';
import Create from '../svg/Create';
import Navbar from '../navbar/Navbar';


const Sidebar = () => {

  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(true);

  const handleLogout = () => {

    const getToken = localStorage.getItem('token')
    if (getToken) {
      localStorage.removeItem('token');
      setToken({})
      navigate("/login");
    }

  }


  return (
   <>
    <Navbar setIsOn={setIsOn} isOn={isOn}/>
   {
    isOn ?  <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white mt-3">
    <div className="position-sticky">
      <div className="list-group list-group-flush">
        {
          token.role === 'admin' ? <>
            <CustomLink
              to='/'
              aria-current="true"
            >
              <i className="fas fa-tachometer-alt fa-fw me-3"></i><span>Dashboard</span>
            </CustomLink>

            <CustomLink to='/manage/order'>
              <UsersIcon /> <span className='ps-2'>Manage Order</span>
            </CustomLink>

            <CustomLink to='/category'>
              <Category /> <span className='ps-2'>Category</span>
            </CustomLink>

            <CustomLink to='/category/add'>
              <Create /> <span className='ps-2'>Add Category</span>
            </CustomLink>

            <CustomLink to='/company'>
              <Category /> <span className='ps-2'>Company</span>
            </CustomLink>

            <CustomLink to='/company/add'>
              <Create /> <span className='ps-2'>Add Company</span>
            </CustomLink>

            <CustomLink to='/medicine'>
              <Medicine /> <span className='ps-2'>Medicine</span>
            </CustomLink>

            <CustomLink to='/medicine/add'>
              <Create /> <span className='ps-2'>Medicine Add</span>
            </CustomLink>

            <CustomLink to='/manage/user'>
              <UsersIcon /> <span className='ps-2'>Manage Users</span>
            </CustomLink>
          </> : <>
            <CustomLink to='/user/manage/medicine'>
              <UsersIcon /> <span className='ps-2'>Manage Medicine</span>
            </CustomLink>
            <CustomLink to='/user/manage/order'>
              <UsersIcon /> <span className='ps-2'>Manage Order</span>
            </CustomLink>
          </>
        }




        <button className='list-group-item list-group-item-action py-2 ripple d-flex' onClick={handleLogout}>
          <LogoutIcon /> <span className='ps-2'>Logout</span>
        </button>

      </div>
    </div>
  </nav> : ""
   }
   </>

  );
};

export default Sidebar;