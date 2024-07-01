/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../components/images/user.png'
import { TokenContext } from '../../context/TokenContext';

const Navbar = () => {
    const [token, setToken] = useContext(TokenContext);

    return (
        <div>
            <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-light fixed-top">

                <div class="container-fluid">

                    <button data-mdb-button-init
                        class="navbar-toggler"
                        type="button"
                        data-mdb-collapse-init
                        data-mdb-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-bars"></i>
                    </button>


                    {
                        token.role === 'admin' ? <Link class="navbar-brand" to="/admin">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                height="25"
                                alt="MDB Logo"
                                loading="lazy"
                            />
                        </Link> : <Link class="navbar-brand" to="/user/manage/medicine">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                height="25"
                                alt="MDB Logo"
                                loading="lazy"
                            />
                        </Link>
                    }




                    <ul class="navbar-nav ms-auto d-flex flex-row">


                        <li class="nav-item dropdown">
                            <a
                                data-mdb-dropdown-init class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                                href="#"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={Image}
                                    class="rounded-circle"
                                    height="22"
                                    alt="Avatar"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                class="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <a class="dropdown-item" href="#">My profile</a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">Settings</a>
                                </li>
                                <li>
                                    <a class="dropdown-item" href="#">Logout</a>
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