import React, { Component } from 'react'
import Header from '../Header'
import Banner from './Banner'
import Someproducts from './Someproducts'
import Footer from '../Footer'
import "../dist/css/animate.css"
import "../dist/css/themify-icons.css"
import "../dist/css/magnific-popup.css"
import "../dist/css/slick.css"
import "../dist/css/style.css"

class Layout extends Component {
    state = {
        loading: true
    }

    componentDidMount() {
        const script = document.createElement("script");

        script.src = "js/fixed_menu.js";
        script.async = true;
    
        document.body.appendChild(script); 
    }
    render() {
        setTimeout(
            function() {
                this.setState({ loading: false });
            }
            .bind(this),
            1500
        );

        localStorage.removeItem('productId');
        localStorage.removeItem('invoiceNo');
        localStorage.removeItem('invoiceNumber');
        return (
            <div>
                {this.state.loading ? (
                    <div style={{textAlign: "center"}}>
                        <img src={require('../dist/img/main_loader.gif')} alt="loader"/>
                    </div>
                ) : (
                    <div>
                        <Header />
                        <Banner />
                        <Someproducts />
                        <Footer />
                    </div>
                )}
            </div>
        )
    }
}
export default Layout;