import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div>
                {/*::header part start::*/}
                <header className="main_menu home_menu">
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <Link className="navbar-brand" to=""> <img src={require("../dist/img/logo.png")} alt="logo" /> </Link>
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
