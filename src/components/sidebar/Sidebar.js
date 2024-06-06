/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import Medicine from '../svg/Medicine';
import LogoutIcon from '../svg/LogoutIcon';
import { Link } from 'react-router-dom';
import CustomLink from '../customeLink/CustomLink';
import { useNavigate } from "react-router-dom";
import { TokenContext } from '../../context/TokenContext';


const Sidebar = () => {

  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();

  const handleLogout = () => {
   
    const getToken = localStorage.getItem('token')
    if(getToken){
      localStorage.removeItem('token');
      setToken({})
      navigate("/login");
    }

  }


  return (
    <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white mt-3">
      <div class="position-sticky">
        <div class="list-group list-group-flush">
          <CustomLink
            to='/'
            aria-current="true"
          >
            <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Dashboard</span>
          </CustomLink>

          <CustomLink to='/medicine'>
            <Medicine /> <span className='ps-2'>Medicine</span>
          </CustomLink>

          <CustomLink to='/medicine/add'>
            <Medicine /> <span className='ps-2'>Medicine Add</span>
          </CustomLink>

          <CustomLink to='/manage/user'>
            <Medicine /> <span className='ps-2'>Manage Users</span>
          </CustomLink>

          <button className='list-group-item list-group-item-action py-2 ripple d-flex' onClick={handleLogout}>
            <LogoutIcon /> <span className='ps-2'>Logout</span>
          </button>

        </div>
      </div>
    </nav>

  );
};

export default Sidebar;