import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import $ from "jquery";
import { toast } from 'react-toastify';

class Sidebar extends Component {
    state = {
        redirect: false
    }
    
    logout= () => {
        localStorage.clear()
        toast.info('good bye', 
            {
              position: toast.POSITION.TOP_CENTER,
              hideProgressBar: true,
              className: "custom-toast",
              autoClose: 2000,
            })
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/login' />
        }
    }

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
                        alt="Company Logo"
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
                            {/* <li className="nav-item">
                                <Link to="/payaja" className="nav-link">
                                    <i className="fas fa-home nav-icon"></i>
                                    <p style={{color:"#fff"}}>Homepage</p>
                                </Link>
                            </li> */}

                            <li className="nav-header">ADMINISTRATOR</li>
                            
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
                        </ul>
                        <ul>
                            <div className= "mt-2 mb-2" style={{borderBottom:"1px solid #ffffff1f"}}>

                            </div>
                        </ul>
                        <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                        >
                            {this.renderRedirect()}
                            <li role="button" onClick={this.logout} className="nav-item" style={{textAlign: "left"}}>
                                <div className="nav-link">
                                    <i className="fas fa-sign-out-alt nav-icon"></i>
                                    <p style={{color:"#fff"}}>Logout</p>
                                </div>
                            </li>
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