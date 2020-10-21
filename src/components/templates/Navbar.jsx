import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { toast } from 'react-toastify';

class Navbar extends Component {
    state = {
        username: "",
        image: "",
        redirect: false
    }
    componentDidMount() {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);
        this.setState({
            username: decoded.name,
            image: decoded.userImage
        })
    }

    // logout= () => {
    //     localStorage.clear()
    //     toast.info('good bye', 
    //         {
    //           position: toast.POSITION.TOP_CENTER,
    //           hideProgressBar: true,
    //           className: "custom-toast",
    //           autoClose: 2000,
    //         })
    //     this.setState({
    //         redirect: true
    //     })
    // }

    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //       return <Redirect to='/login' />
    //     }
    // }
    render() {
        return (
            <div>
                {/* Navbar */}
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <Link
                        className="nav-link"
                        data-widget="pushmenu"
                        to="#"
                        role="button"
                    >
                        <i className="fas fa-bars" />
                    </Link>
                    </li>
                </ul>

                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                    <div className="user-panel d-flex">
                        <div className="image">
                        <img
                            src={this.state.image}
                            className="img-circle elevation-2"
                            alt="User Image"
                        />
                        </div>
                        <div 
                            data-toggle="tooltip" 
                            data-placement="bottom" 
                            title="Logout">
                            {/* {this.renderRedirect()} */}
                            <div
                                className="nav-link d-block"
                                role="button"
                                // onClick={this.logout}
                            >
                                {this.state.username}
                            </div>
                        </div>
                    </div>
                    </li>
                </ul>
                </nav>
                {/* /.navbar */}
            </div>
        )
    }
}
export default Navbar;