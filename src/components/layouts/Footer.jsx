import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div>
                {/* footer part start*/}
                <footer className="footer-area">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="copyright_part_text text-center">
                        <div className="row">
                            <div className="col-lg-12">
                            <p className="footer-text m-0">{/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                                Copyright © All rights reserved | This template is made with <i className="ti-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </footer>
                {/* footer part end*/}

            </div>
        )
    }
}
