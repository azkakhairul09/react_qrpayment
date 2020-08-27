import React, { Component } from 'react';
import Qs from 'query-string'
import qrcode from "qrcode";
import SweetAlert from 'react-bootstrap-sweetalert';
import Axios from 'axios';
import Header from './Header';
import Success from './Success';
import Pending from './Pending';

class Transaction_Status extends Component {
    state = {
        adminFee: "",
        content: "",
        currency: "",
        description: "",
        dueTime: "",
        invoiceDate: "",
        invoiceName: "",
        invoiceNominal: 0,
        invoiceNumber: "",
        adminPrice: 0,
        price: "",
        categorize: "",
        createdBy: "",
        createdDate: "",
        productDesc: "",
        productImage: "",
        productName: "",
        updatedDate: "",
        qty: 0,
        status: "",
        isSuccess: false
    }

    componentDidMount() {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);
        
        const param = {
            invoiceNumber: localStorage.invoiceNo
        }

        const urlGetInvoiceStatus = "http://localhost:8085/sangbango-microservices/payment/v1/invoice/getbyinvoiceNumber?" + Qs.stringify(param)

        Axios.get(urlGetInvoiceStatus, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            let res = response.data.content;
            console.log(res);
            this.setState({
                adminFee: res.adminFee,
                content: res.content,
                currency: res.currency,
                description: res.description,
                dueTime: res.dueTime,
                invoiceDate: res.invoiceDate,
                invoiceName: res.invoiceName,
                invoiceNominal: res.invoiceNominal,
                invoiceNumber: res.invoiceNumber,
                adminPrice: res.product.adminPrice,
                categorize: res.product.categorize,
                productDesc: res.product.productDesc,
                productImage: res.product.productImage,
                productName: res.product.productName,
                price: res.product.price,
                qty: res.qty,
                status: res.status
            })
            if (res.status === "success") {
                this.setState({
                    isSuccess: true
                })
            } else if (res.status === "pending") { 
                this.setState({
                    isSuccess: false
                }) 
            } 
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }
    paymentCheck = () => {
        
    }
    render() {
        return (
            <div>
                <section className="course_details_area section_padding" style={{padding: "40px 0"}}>
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 course_details_left">
                        {this.state.isSuccess ? (
                            <Success
                                categorize = {this.state.categorize}
                                invoiceName = {this.state.invoiceName}
                                invoiceNumber = {this.state.invoiceNumber}
                                productImage = {this.state.productImage}
                                productName = {this.state.productName}
                                qty = {this.state.qty}
                                price = {this.state.price}
                                admin = {this.state.adminPrice}
                                adminFee = {this.state.adminFee}
                                invoiceNominal = {this.state.invoiceNominal}
                                invoiceDate = {this.state.invoiceDate}
                                status = {this.state.status}
                                content = {this.state.content}
                            />
                        ) : (
                            <Pending 
                                categorize = {this.state.categorize}
                                invoiceName = {this.state.invoiceName}
                                invoiceNumber = {this.state.invoiceNumber}
                                productImage = {this.state.productImage}
                                productName = {this.state.productName}
                                qty = {this.state.qty}
                                price = {this.state.price}
                                admin = {this.state.adminPrice}
                                adminFee = {this.state.adminFee}
                                invoiceNominal = {this.state.invoiceNominal}
                                invoiceDate = {this.state.invoiceDate}
                                status = {this.state.status}
                                content = {this.state.content}
                            />
                        )}
                    </div>
                    </div>
                </div>
                </section>
            </div>
        );
    }
}

export default Transaction_Status;
