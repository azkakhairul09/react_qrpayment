import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logout from "./LogoutButton"
import Login from './LoginButton'

export default class Header extends Component {
    constructor() {
        super()

        this.state = {
            isLogin: false
        }
    }

    getData(){
        setTimeout(() => {
            if (localStorage.getItem('userData')) {
                this.setState({
                    isLogin: true
                })
            }
        }, 1000)
    }

    componentDidMount(){
        this.getData();
        if (localStorage.getItem('userData')) {
            this.setState({
                isLogin: true
            })
        }
    }

    render() {
        const script = document.createElement("script");

        script.src = "js/fixed_menu.js";
        script.async = true;
    
        document.body.appendChild(script);
        return (
            <div>
                {/*::header part start::*/}
                <header className="main_menu home_menu">
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg navbar-light">
                        <Link className="navbar-brand" to=""> <img src={require("./dist/img/logo.png")} alt="logo" /> </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse main-menu-item justify-content-end" id="navbarSupportedContent">
                            <ul className="navbar-nav align-items-center">
                            <li className="nav-item">
                                <Link className="nav-link" to="/payaja">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/history">History</Link>
                            </li>
                            {this.state.isLogin ? (
                                <Logout />
                            ) : (
                                <Login />
                            )}
                            </ul>
                        </div>
                        </nav>
                    </div>
                    </div>
                </div>
                </header>
                {/* Header part end*/}

            </div>
        )
    }
}
