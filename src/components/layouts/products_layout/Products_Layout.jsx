import React, { Component } from 'react'
import Header from '../Header'
import Banner from './Banner'
import Products from './Products'
import Footer from '../Footer'
import "../dist/css/animate.css"
import "../dist/css/themify-icons.css"
import "../dist/css/magnific-popup.css"
import "../dist/css/slick.css"
import "../dist/css/style.css"

class Layout extends Component {
    render() {
        const script = document.createElement("script");

        script.src = "js/fixed_menu.js";
        script.async = true;
    
        document.body.appendChild(script);  
        return (
            <div>
                <Header />
                <Banner />
                <Products />
                <Footer />
            </div>
        )
    }
}
export default Layout;