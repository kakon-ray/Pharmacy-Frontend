/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Medicine from '../svg/Medicine';
import { Link } from 'react-router-dom';
import CustomLink from '../customeLink/CustomLink';

const Sidebar = () => {
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

          <CustomLink  to='/medicine'>
            <Medicine /> <span className='ps-2'>Medicine</span>
          </CustomLink>

          <CustomLink  to='/medicine/add'>
            <Medicine /> <span className='ps-2'>Medicine Add</span>
          </CustomLink>

        </div>
      </div>
    </nav>

  );
};

export default Sidebar;