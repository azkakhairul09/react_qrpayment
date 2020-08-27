import React, { Component } from 'react'
import Footer from './Footer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { SkeletonTheme } from 'react-loading-skeleton';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from "axios";

class Product extends Component {
    state = {
        loading: true,
        products: [],
        redirect: false
    }
    
    componentDidMount() {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const urlGetProduct = "http://localhost:8085/sangbango-microservices/payment/v1/product/all"

        axios.get(urlGetProduct, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            let res = response.data;
            console.log(res);
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
          console.log(error.response.data);
          if (!error.response.data) {
            this.setState({
                redirect: true
            })  
          }
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

        if (this.state.loading) {
            return <div>Loading ...</div>
        }

        if (!this.state.products) {
            return <div>didn't get products</div>
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
                    <div className="row">
                        <div className="col-12">
                        <div className="card">
                            {/* /.card-header */}
                            <div className="card-body">
                            <div className="row mb-3">
                                <div className="col">
                                <Link
                                    className="btn btn-primary"
                                    to="/product_form"
                                >
                                    <small>Add Product</small>
                                    &nbsp;
                                    <i className="fas fa-fw fa-plus-circle"></i>
                                </Link>
                                </div>
                            </div>
                            <hr />
                            <table
                                style={{ fontSize: "12px" }}
                                id="products"
                                className="table table-bordered table-hover"
                            >
                                <thead>
                                <tr>
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