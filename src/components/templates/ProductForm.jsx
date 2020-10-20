import React, { Component } from 'react'
import Navbar from '../templates/Navbar'
import Sidebar from '../templates/Sidebar'
import Footer from '../templates/Footer'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

class ProductForm extends Component {
    constructor() {
        super();

        this.state = {
            categorize: "",
            productName: "",
            productDesc: "",
            price: "",
            classMandatory: "",
            redirect: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        // const urlProduct = "http://localhost:8085/product"
        // const urlProduct = "https://qrispayments.herokuapp.com/product"
        const urlProduct = "https://bangomicroservices.site/bango-backend-dev/product"

        const product = {
            categorize: this.state.categorize,
            productName: this.state.productName,
            productDesc: this.state.productDesc,
            price: this.state.price,
            classMandatory: this.state.classMandatory
        }

        axios.post(urlProduct, product, {
            headers: {
                Authorization: decoded.token,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        .then((response) => {
            let res = response.data;
            console.log(response)

            if (res.errorCode === "E099") {
                this.setState({
                    redirect: false
                })
                toast.info('Silakan isikan price dengan angka saja!', 
                {
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: true,
                  className: "warning-toast",
                  autoClose: 2000,
                })
            } else {
                this.setState({
                    redirect: true
                })
                toast.info('success', 
                {
                  position: toast.POSITION.TOP_CENTER,
                  hideProgressBar: true,
                  className: "custom-toast",
                  autoClose: 2000,
                })
            }
        })
        .catch((error) => {
            console.log(error)
            if (error.response.status === 403) {
                toast.info('access expired, please login again', 
                {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    className: "custom-toast",
                    autoClose: 2000,
                })
                localStorage.clear()
                this.props.history.push("/login")
            } else {
                toast.info('failed, please try again', 
                {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    className: "custom-toast",
                    autoClose: 2000,
                })
            }
        });
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/product' />
        }
    }
    render() {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        if (decoded.role !== "Administrator") {
          this.props.history.push('payaja')
        }
        return (
            <div>
                {this.renderRedirect()}
                <Navbar></Navbar>
                <Sidebar></Sidebar>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <section className="content-header">
                    <div className="container-fluid">
                        <div className="row">
                        <div className="col-md-12">
                            {/* general form elements disabled */}
                            <div className="card card-dark">
                            <div className="card-header">
                                <h3 className="card-title" style={{color: "#fff"}}>Form Penambahan Produk</h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-sm-4">
                                    {/* text input */}
                                    <div className="form-group">
                                        <label>Categorize</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="categorize"
                                        id="categorize"
                                        onChange={this.onChange}
                                        value={this.state.categorize}
                                        required
                                        placeholder="Example Categoriez of Product ..."
                                        />
                                    </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                    {/* text input */}
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="productName"
                                        id="productName"
                                        onChange={this.onChange}
                                        value={this.state.productName}
                                        required
                                        placeholder="Example name of Product ..."
                                        />
                                    </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea
                                        type="text"
                                        className="form-control"
                                        name="productDesc"
                                        id="productDesc"
                                        onChange={this.onChange}
                                        value={this.state.productDesc}
                                        rows="3"
                                        required
                                        placeholder="Description of Product ..."
                                        />
                                    </div>
                                    </div>
                                    <div className="col-sm-3">
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="price"
                                        id="price"
                                        onChange={this.onChange}
                                        value={this.state.price}
                                        required
                                        placeholder="Numeric only ..."
                                        />
                                    </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                    {/* text input */}
                                    <div className="form-group">
                                        <label>Class Mandatory</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="classMandatory"
                                        id="classMandatory"
                                        onChange={this.onChange}
                                        value={this.state.classMandatory}
                                        required
                                        placeholder="Example : VII or 1"
                                        />
                                    </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    SUBMIT
                                </button>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default ProductForm;