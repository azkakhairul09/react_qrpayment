import React, { Component } from 'react'
import Footer from './Footer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { SkeletonTheme } from 'react-loading-skeleton';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

class Product extends Component {
    state = {
        loading: true,
        products: [],
        redirect: false
    }
    
    componentDidMount() {
        this.setState ({
            loading: true
        })

        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        // const urlGetProduct = "http://localhost:8085/sangbango-microservices/payment/v1/product/all"
        const urlGetProduct = "https://qrispayments.herokuapp.com/product/all"

        axios.get(urlGetProduct, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            let res = response.data;
            this.setState ({
                products: response.data.content,
                loading: false
            })
            const script = document.createElement("script");

            script.src = "js/main.js";
            script.async = true;
      
            document.body.appendChild(script);            
        })
        .catch((error) => {
            if (!error.response.data) {
                this.setState({
                    redirect: true
                })  
            }
            this.setState ({
                loading: true
            })
        });
    }

    disactive = (productId) => {
        
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        // const urlDisactive = "http://localhost:8085/sangbango-microservices/payment/v1/product/disactivated?productId="+productId
        const urlDisactive = "https://qrispayments.herokuapp.com/product/disactivated?productId="+productId

        const data = {}

        axios.put(urlDisactive, data, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            this.setState ({
                loading: false
            })
            toast.info('product disactivated', 
            {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                className: "custom-toast",
                autoClose: 2000,
            })
            setTimeout(
                function() {
                    window.location.reload(false);
                },
                500
            );
        })
        .catch((error) => {
            this.setState ({
                loading: true
            })
        });
    }
    render() {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        if (decoded.role !== "Administrator") {
          this.props.history.push('payaja')
        }

        if (this.state.redirect) {
            alert("oops, your session was expired")
            this.props.history.push('payaja')
        }
        return (
            <div>
                <Sidebar />
                <Navbar />
                <SkeletonTheme color="#6e6b6b" highlightColor="#fff">
                <div className="content-wrapper">
                  <Header />
                    {/* Main content */}
                    <section className="content">
                    <div className="row ml-0 mr-0">
                        <div className="col-12">
                        <div className="card">
                            {/* /.card-header */}
                            <div className="card-body">
                            {this.state.loading ? (
                                <div style={{textAlign:"center"}}>
                                    <img src={require('../img/loader.gif')} alt="loader"/>
                                </div>
                            ) : (
                                <div>
                                    <div className="row mb-3">
                                        <div className="col">
                                        <Link
                                            className="btn btn-primary"
                                            to="/product_form"
                                        >
                                            <i className="fas fa-fw fa-plus-circle"></i>
                                            <small> New</small>
                                        </Link>
                                        </div>
                                    </div>
                                    <hr />
                                    <table
                                        style={{ fontSize: "12px", width: "100%" }}
                                        id="products"
                                        className="table table-bordered table-hover"
                                    >
                                        <thead>
                                        <tr>
                                            <th>Active</th>
                                            <th>Categorize</th>
                                            <th>Product ID</th>
                                            <th>Product Name</th>
                                            <th>Price (IDR)</th>
                                            <th>Image</th>
                                            <th>Description</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.products.map((product, i) => (
                                            <tr key={i}>
                                            <td>
                                                <div style={{color:"#007bff", cursor:"pointer"}} onClick={() => this.disactive(product.productId)}><i class="fas fa-minus-circle" style={{color: "red"}}></i></div>
                                            </td>
                                            <td>{product.categorize}</td>
                                            <td>{product.productId}</td>
                                            <td>{product.productName}</td>
                                            <td>Rp{product.price}</td>
                                            <td>{product.productImage}</td>
                                            <td>{product.productDesc}</td>
                                            </tr>
                                        ))}
                                        {/* {transactionHistory} */}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            </div>
                            {/* /.card-body */}
                        </div>
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                    </section>
                    {/* /.content */}
                </div>
                {/* /.content-wrapper */}
                </SkeletonTheme>
                <Footer />
            </div>
        )
    }
}
export default Product;