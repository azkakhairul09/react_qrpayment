import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Qs from 'query-string'
import Axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

class Success extends Component {
    state = {
        isClicked: false,
        disabled: false,
        transactionId: "",
        transactionDate: "",
        description: "",
        amount: "",
        status: "",
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
        });
    }
    render() {
        return (
            <div>
                <SkeletonTheme color="#6e6b6b" highlightColor="#fff">
                    <div className="content_status">
                        <nav style={{padding: ".5rem .5rem", paddingBottom: "2rem"}} className="navbar navbar-expand-lg navbar-light">
                            <Link className="navbar-brand" to=""> <img src={require("../dist/img/company-logo.png")} style={{maxWidth:"50% !important"}} alt="logo" /> </Link>
                        </nav>
                        <div className="justify-content-between d-flex" style={{background: "#cacaca"}}>
                            <span>INVOICE </span>
                            {this.props.invoiceNumber ? (
                                <span>{this.props.invoiceNumber}</span>
                            ) : (
                                <span><Skeleton width={60} /></span>
                            )}
                            
                        </div>
                        <div className="blog_right_sidebar">
                            <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                                <div className="justify-content-between d-flex details">
                                    {this.props.invoiceDate ? (
                                        <span>{this.props.invoiceDate}</span>
                                    ) : (
                                        <span><Skeleton width={60} /></span>
                                    )}
                                    {this.props.status ? (
                                        <span className="badge badge-success" style={{textTransform:"capitalize"}}>{this.props.status}</span>
                                    ) : (
                                        <span><Skeleton width={60} /></span>
                                    )}
                                </div>
                                <br/>
                                <h3 className="widget_title">Transaction Detail</h3>
                                <div className="media post_item">
                                    <img style={{maxWidth:"25% !important"}} src={this.props.productImage} alt="" />
                                    <div className="media-body">
                                        {this.props.categorize ? <h3 style={{textTransform: "capitalize"}}>{this.props.categorize}</h3> : <Skeleton width={60} />}                                        
                                        <div className="justify-content-between d-flex details">
                                            {this.props.productName ? <span style={{maxWidth: "50%"}}>{this.props.productName}</span> : <Skeleton width={60} />}  
                                        </div>
                                        <div className="justify-content-between d-flex details">
                                        {this.props.qty ? <span>Qty : {this.props.qty} </span> : <Skeleton width={60} />}  
                                        {this.props.price ? <span>Rp {this.props.price}</span> : <Skeleton width={60} />}  
                                        </div>
                                    </div>
                                </div>
                            </aside>
                            <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                                <div className="media-body">
                                    <div className="justify-content-between d-flex details">
                                        <span>SubTotal</span>
                                        {this.props.price ? <span>Rp {this.props.price}</span> : <Skeleton width={60} />}
                                    </div>
                                    <div className="justify-content-between d-flex details">
                                        <span>Admin Fee ({this.props.adminFee})</span>
                                        {this.props.admin ? <span>Rp {this.props.admin}</span> : <Skeleton width={60} />}
                                    </div>
                                </div>
                                <div className="widget_title"> </div>
                                <div className="media-body">
                                    <div className="justify-content-between d-flex details">
                                        <span style = {{fontWeight: "bold"}} >Total Harga</span>
                                        {this.props.invoiceNominal ? <span style = {{fontWeight: "bold"}} >Rp {this.props.invoiceNominal}</span> : <Skeleton width={60} />}
                                    </div>
                                </div>
                            </aside>
                            <aside className="single_sidebar_widget popular_post_widget" style={{background: "#fff"}}>
                                <div className="media-body">
                                    <div className="justify-content-between d-flex details">
                                        <span>Payment Method</span>
                                        <span>QRIS (QR Payment)</span>
                                    </div>
                                    <div className="pending load_more mb-2 mt-5">
                                        {this.state.disabled ? (
                                            <button className="btn_4" style={{cursor:"not-allowed"}}>Check Status</button>
                                        ) : (
                                            <button className="btn_4" onClick={() => this.checkStatus(this.props.invoiceNumber)}>Check Status</button>
                                        )}
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
                                                    {this.state.description ? <span className="badge badge-warning" style={{textTransform:"capitalize"}}>{this.state.description}</span> : <Skeleton width={60} />}
                                                </div>
                                                {this.state.transactionDate ? <p>{this.state.transactionDate}</p> : <Skeleton width={60} />}
                                            </div>
                                            <div className="media-body mb-4">
                                                <div className="justify-content-between d-flex details">
                                                    <small>Transaction ID</small>
                                                </div>
                                                {this.state.transactionId ? <p style = {{fontWeight: "bold"}}>{this.state.transactionId}</p> : <Skeleton width={60} />}
                                                <div className="justify-content-between d-flex details">
                                                    <small>Transaction Total</small>
                                                </div>
                                                {this.state.amount ? <p style = {{fontWeight: "bold"}}>{this.state.amount}</p> : <Skeleton width={60} />}
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
                </SkeletonTheme>
            </div>
        );
    }
}

export default Success;
