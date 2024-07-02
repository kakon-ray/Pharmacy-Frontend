/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../components/images/user.png'
import { TokenContext } from '../../context/TokenContext';

const Navbar = ({setIsOn,isOn}) => {
    const [token, setToken] = useContext(TokenContext);
   

    const toggleNav = () => {
        setIsOn(!isOn);
    }



    return (
        <div>
            <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-light fixed-top">

                <div className="container-fluid">

                    <button data-mdb-button-init
                        className="navbar-toggler"
                        type="button"
                        data-mdb-collapse-init
                        data-mdb-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={toggleNav}
                    >
                        <i className="fas fa-bars"></i>
                    </button>


                    {
                        token.role === 'admin' ? <Link className="navbar-brand" to="/">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                height="25"
                                alt="MDB Logo"
                                loading="lazy"
                            />
                        </Link> : <Link className="navbar-brand" to="/user/manage/medicine">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                height="25"
                                alt="MDB Logo"
                                loading="lazy"
                            />
                        </Link>
                    }




                    <ul className="navbar-nav ms-auto d-flex flex-row">


                        <li className="nav-item dropdown">
                            <a
                                data-mdb-dropdown-init className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={Image}
                                    className="rounded-circle"
                                    height="22"
                                    alt="Avatar"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <a className="dropdown-item" href="#">My profile</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Settings</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Logout</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </nav>
        </div>
    );
};

export default Navbar;