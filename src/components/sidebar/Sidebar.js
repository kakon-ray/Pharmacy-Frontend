/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Medicine from '../svg/Medicine';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white mt-3">
      <div class="position-sticky">
        <div class="list-group list-group-flush">
          <Link
            to='/'
            class="list-group-item list-group-item-action py-2 ripple active"
            aria-current="true"
          >
            <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Dashboard</span>
          </Link>

          <Link  to='/medicine' class="list-group-item list-group-item-action py-2 ripple">
            <Medicine /> <span className='ps-2'>Medicine</span>
          </Link>

        </div>
      </div>
    </nav>

  );
};

export default Sidebar;