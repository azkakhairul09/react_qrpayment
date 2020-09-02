import React, { Component } from 'react'
import Header from '../../Header'
import Detail from './Product_Detail'
import Footer from '../../Footer'
import "../../dist/css/animate.css"
import "../../dist/css/themify-icons.css"
import "../../dist/css/magnific-popup.css"
import "../../dist/css/slick.css"
import "../../dist/css/style.css"
import WOW from "wow.js"

class Detail_Layout extends Component {
    componentDidMount() {
        const wow = new WOW();
        wow.init();
        return () => {
        };
    }
    render() {
        return (
            <div>
                <Header />
                <Detail />
                <Footer />
            </div>
        )
    }
}
export default Detail_Layout;