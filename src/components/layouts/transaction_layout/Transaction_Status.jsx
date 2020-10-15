import React, { Component } from 'react';
import Qs from 'query-string'
import Axios from 'axios';
import Success from './Success';
import Pending from './Pending';
import { toast } from 'react-toastify';

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
        isSuccess: false,
        isLoading: true
    }

    componentDidMount() {
        if (localStorage.getItem('userData')) {
            const userData = localStorage.getItem('userData');
            let decoded = JSON.parse(userData);
            
            const param = {
                invoiceNumber: localStorage.invoiceNo
            }

            // const urlGetInvoiceStatus = "http://localhost:8085/sangbango-microservices/payment/v1/invoice/getbyinvoiceNumber?" + Qs.stringify(param)
            // const urlGetInvoiceStatus = "https://qrispayments.herokuapp.com/invoice/getbyinvoiceNumber?" + Qs.stringify(param)
            const urlGetInvoiceStatus = "https://bangomicroservices.site/bango-backend-dev/invoice/getbyinvoiceNumber?" + Qs.stringify(param)

            Axios.get(urlGetInvoiceStatus, {
                headers: {
                    Authorization: decoded.token
                }
            })
            .then((response) => {

                let res = response.data.content;

                var amount = res.invoiceNominal;
                var reverse = amount.toString().split('').reverse().join(''),
                amount_format = reverse.match(/\d{1,3}/g);
                amount_format = amount_format.join('.').split('').reverse().join('');

                var price = res.product.price;
                var reverseprice = price.toString().split('').reverse().join(''),
                price_format = reverseprice.match(/\d{1,3}/g);
                price_format = price_format.join('.').split('').reverse().join('');

                var admin = res.product.adminPrice;
                var reverseadmin = admin.toString().split('').reverse().join(''),
                admin_format = reverseadmin.match(/\d{1,3}/g);
                admin_format = admin_format.join('.').split('').reverse().join('');

                this.setState({
                    adminFee: res.adminFee,
                    content: res.content,
                    currency: res.currency,
                    description: res.description,
                    dueTime: res.dueTime,
                    invoiceDate: res.invoiceDate,
                    invoiceName: res.invoiceName,
                    invoiceNominal: amount_format,
                    invoiceNumber: res.invoiceNumber,
                    adminPrice: admin_format,
                    categorize: res.product.categorize,
                    productDesc: res.product.productDesc,
                    productImage: res.product.productImage,
                    productName: res.product.productName,
                    price: price_format,
                    qty: res.qty,
                    status: res.status,
                    isLoading: false,
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
                // console.log(error.response.status)
                if (error.response.status === 403) {
                    toast.info('access expired, please login again', 
                    {
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: true,
                        className: "custom-toast",
                        autoClose: 2000,
                    })
                    this.setState({
                        isLoggedin: false
                    })
                    localStorage.clear()
                    this.props.history.push("/login")
                }
            });
        } else {
            toast.info('please login to continue', 
            {
                position: toast.POSITION.TOP_CENTER,
                hideProgressBar: true,
                className: "custom-toast",
                autoClose: 2000,
            })
            localStorage.clear()
            this.props.history.push("/login")
        }
        
    }
    render() {
        return (
            <div>
                {this.state.isLoading ? (
                    <div style={{textAlign: "center"}}>
                        <img src={require('../dist/img/main_loader.gif')} alt="loader"/>
                    </div>
                ) : (
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
                                loading = {this.state.isLoading}
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
                                loading = {this.state.isLoading}
                            />
                        )}
                    </div>
                    </div>
                </div>
                </section>
                )}
            </div>
        );
    }
}

export default Transaction_Status;
