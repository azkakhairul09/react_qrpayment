import React, { Component } from 'react'
import { Link } from "react-router-dom";
import $ from "jquery";

class Sidebar extends Component {
    render() {
        $(document).ready(function () {
            var location = window.location.pathname;
            $('ul.nav a[href="' + location + '"]')
              .addClass("active");
        });
        return (
            <div>
                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4" id="collapseExample">
                    {/* Brand Logo */}
                    <Link to="index3.html" className="brand-link">
                    <img
                        src="dist/img/AdminLTELogo.png"
                        alt="AdminLTE Logo"
                        className="brand-image img-circle elevation-3"
                        style={{ opacity: ".8" }}
                    />
                    <span className="brand-text font-weight-light">AdminLTE 3  </span>
                    </Link>
                    {/* Sidebar */}
                    <div className="sidebar">
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                        >
                        {/* Add icons to the links using the .nav-icon className
                                    with font-awesome or any other icon font library */}
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                            <i className="nav-icon fas fa-tachometer-alt" />
                            <p style={{color:"#fff"}}>Dashboard</p>
                            </Link>
                        </li>
                        {/* {
                            true && (
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">
                                <i className="nav-icon fas fa-user" />
                                <p>Profile</p>
                                </Link>
                            </li>

                            )
                        } */}
                        <li className="nav-header">ADMINISTRATOR</li>
                        {/* <li className="nav-item">
                            <Link to="member" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Member List</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="agenda" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Agenda</p>
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <Link to="product" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p style={{color:"#fff"}}>Product</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="transactions" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p style={{color:"#fff"}}>Transaction</p>
                            </Link>
                        </li>
                        {/* <li className="nav-header">MEMBER</li>
                        <li className="nav-item">
                            <Link to="user_agenda" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Agenda</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="products" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Product</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="order_history" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Order History</p>
                            </Link>
                        </li> */}
                        {/* <li classآشةث="nav-header">
                            <button
                            className="btn btn-primary"
                            type="button"
                            id="closeSidebar"
                            >
                            <i className="fas fa-bars" />
                            </button>
                        </li> */}
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                    </div>
                    {/* /.sidebar */}
                </aside>
                </div>
        )
    }
}
export default Sidebar;