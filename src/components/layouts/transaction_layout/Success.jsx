import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Qs from 'query-string'
import Axios from 'axios';

class Success extends Component {
    state = {
        isClicked: false,
        disabled: false,
        transactionId: "",
        transactionDate: "",
        description: "",
        amount: "",
        status: ""
    }

    checkStatus = (invoiceNumber) => {
        this.setState ({
            isClicked: true,
            disabled: true
        })      

        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const param = {
            invoiceNumber: invoiceNumber
        }

        const urlGetTransaction = "https://qrispayments.herokuapp.com/transaction?" + Qs.stringify(param)
        // const urlGetTransaction = "http://localhost:8085/sangbango-microservices/payment/v1/transaction?" + Qs.stringify(param)

        Axios.get(urlGetTransaction, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            let res = response.data.content;
            console.log(res);
            var angka = res.amount;
            var reverse = angka.toString().split('').reverse().join(''),
            ribuan = reverse.match(/\d{1,3}/g);
            ribuan = ribuan.join('.').split('').reverse().join('');

            var str = res.transactionDate;
            var my = str.split(".").slice(0, -1).join(" ");

            this.setState ({
                transactionDate: my,
                transactionId: res.transactionId,
                description: res.description,
                amount: ribuan,
                status: res.status
            })      
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    render() {
        return (
            <div>
                <div className="content_status">
                    <nav style={{padding: ".5rem .5rem", paddingBottom: "2rem"}} className="navbar navbar-expand-lg navbar-light">
                        <Link className="navbar-brand" to=""> <img src={require("../dist/img/logo.png")} alt="logo" /> </Link>
                    </nav>
                    <div className="justify-content-between d-flex" style={{background: "#cacaca"}}>
                        <small>INVOICE </small>
                        <small>{this.props.invoiceNumber}</small>
                    </div>
                    <div className="blog_right_sidebar">
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="justify-content-between d-flex details">
                                <span>{this.props.invoiceDate}</span>
                                <span className="badge badge-success" style={{textTransform:"capitalize"}}>{this.props.status} </span>
                            </div>
                            <br/>
                            <h3 className="widget_title">Transaction Detail</h3>
                            <div className="media post_item">
                                <img style={{maxWidth:"25%"}} src={this.props.productImage} alt="" />
                                <div className="media-body">
                                    <h3 style={{textTransform: "capitalize"}}>{this.props.categorize}</h3>
                                    <div className="justify-content-between d-flex details">
                                        <small style={{maxWidth: "50%"}}>{this.props.productName}</small>
                                    </div>
                                    <div className="justify-content-between d-flex details">
                                        <small>Qty : {this.props.qty} </small>
                                        <small>Rp {this.props.price}</small>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <small>SubTotal</small>
                                    <small>Rp {this.props.price}</small>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <small>Admin Fee ({this.props.adminFee})</small>
                                    <small>Rp {this.props.admin}</small>
                                </div>
                            </div>
                            <div className="widget_title"> </div>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <small style = {{fontWeight: "bold"}} >Total Harga</small>
                                    <small style = {{fontWeight: "bold"}} >Rp {this.props.invoiceNominal}</small>
                                </div>
                            </div>
                        </aside>
                        <aside className="single_sidebar_widget popular_post_widget" style={{background: "#fff"}}>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <small>Payment Method</small>
                                    <small>QRIS (QR Payment)</small>
                                </div>
                                <div className="pending load_more mb-2 mt-5">
                                    <button className="btn_4" onClick={() => this.checkStatus(this.props.invoiceNumber)} disabled={this.state.disabled}>Check Status</button>
                                </div>
                            </div>
                        </aside>
                        {this.state.isClicked ? (
                            <div>
                                <div style={{borderRadius:"0", marginBottom: "0", padding: ".75rem .75rem"}} className="alert alert-success">
                                    Congratulation, your transaction have been successfully!
                                </div>
                                <div className="blog_right_sidebar">
                                    <aside className="single_sidebar_widget popular_post_widget" style={{background: "#fff"}}>
                                        <h3 className="widget_title">Transaction Status</h3>
                                        <div className="media-body">
                                            <div className="justify-content-between d-flex details">
                                                <small>Transaction Date</small>
                                                <small className="badge badge-warning" style={{textTransform:"capitalize"}}>{this.state.description}</small>
                                            </div>
                                            <p>{this.state.transactionDate}</p>
                                        </div>
                                        <div className="media-body mb-4">
                                            <div className="justify-content-between d-flex details">
                                                <small>Transaction ID</small>
                                            </div>
                                            <p style = {{fontWeight: "bold"}}>{this.state.transactionId}</p>
                                            <div className="justify-content-between d-flex details">
                                                <small>Transaction Total</small>
                                            </div>
                                            <p style = {{fontWeight: "bold"}}>Rp {this.state.amount}</p>
                                        </div>
                                    <Link to="/payaja"> Back to home page </Link>
                                    </aside>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Success;
