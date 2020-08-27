import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Footer extends Component {
    render() {
        return (
            <div>
                {/* Main Footer */}
                <footer className="main-footer">
                <strong>Copyright © 2014-2019 <Link to="http://adminlte.io">AdminLTE.io</Link>.</strong>
                All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 3.0.4
                </div>
                </footer>
            </div>
        )
    }
}
export default Footer;