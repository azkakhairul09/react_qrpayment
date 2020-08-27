import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
    render() {
        return (
                <div>
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                            <h1 className="m-0 text-dark">Dashboard v2</h1>
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                </div>
        )
    }
}

export default Header;