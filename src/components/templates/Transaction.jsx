import React, { Component } from 'react'
import Footer from './Footer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { SkeletonTheme } from 'react-loading-skeleton';
import Header from './Header';
import axios from "axios";
import { toast } from 'react-toastify';

class Transaction extends Component {

    constructor() {
        super();

        this.state = {
            loading: true,
            transactions: [],
            invoiceNumber: "",
            message: "",
            sukses: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    getData = () => {
        this.setState ({
            loading: true
        })

        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const token = decoded.token

        // const urlGetTransaction = "http://localhost:8085/sangbango-microservices/payment/v1/transaction/all"
        // const urlGetTransaction = "https://qrispayments.herokuapp.com/transaction/all"
        const urlGetTransaction = "https://bangomicroservices.site/bango-backend-dev/transaction/all"

        axios.get(urlGetTransaction, {
            headers: {
                Authorization: token
            }
        })
        .then((response) => {
            let res = response.data;
            this.setState ({
                transactions: response.data.content,
                loading: false
            })
            const script = document.createElement("script");

            script.src = "js/main.js";
            script.async = true;
      
            document.body.appendChild(script);            
        })
        .catch((error) => {
            console.log(error)
            if (!error.response.data) {
                this.setState({
                    redirect: true
                })  
            }
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
            }
            this.setState ({
                loading: true
            })
        });
    }

    componentDidMount() {
        this.getData()
    }

    confirmation = (transactionId) => {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const token = decoded.token

        // const urlConfirmation = "http://localhost:8085/sangbango-microservices/payment/v1/transaction/confirmation?transactionId="+transactionId
        // const urlConfirmation = "https://qrispayments.herokuapp.com/transaction/confirmation?transactionId="+transactionId
        const urlConfirmation = "https://bangomicroservices.site/bango-backend-dev/transaction/confirmation?transactionId="+transactionId

        const data = {}
        axios.put(urlConfirmation, data, {
            headers: {
                Authorization: token
            }
        })
        .then((response) => {
            let res = response.data;
            // console.log(res);
            this.setState ({
                loading: false
            })
            toast.info('transaction confirmed', 
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
            // this.getData()          
        })
        .catch((error) => {
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
            }
            this.setState ({
                loading: true
            })
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        let invoiceNumber = this.state.invoiceNumber
        // console.log(invoiceNumber)

        // const urlProduct = "http://localhost:8085/sangbango-microservices/payment/v1/product"
        // const urlFindTransaction = "https://qrispayments.herokuapp.com/transaction/findTransaction?invoiceNumber="+invoiceNumber
        const urlFindTransaction = "https://bangomicroservices.site/bango-backend-dev/transaction/findTransaction?invoiceNumber="+invoiceNumber

        axios.get(urlFindTransaction, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            let res = response.data;
            console.log(response)
            console.log(res)
            // console.log(res.status)
            if (res.status) {
                if (res.status === "1") {
                    this.setState({
                        message: res.message,
                        sukses: false
                    })
                    toast.info(res.message, 
                    {
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: true,
                        className: "custom-toast",
                        autoClose: 2000,
                    })
                } else if (res.status === 0){
                    this.setState({
                        message: res.message,
                        sukses: true
                    })
                }
            } else {
                if (res.errorCode) {
                    if (res.errorCode === "Err704") {
                        this.setState({
                            message: res.errorDesc,
                            sukses: false
                        })
                        toast.info(res.errorDesc, 
                        {
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: true,
                            className: "custom-toast",
                            autoClose: 2000,
                        })
                    }
                }
            }
            if (res.status === null) {
                this.setState({
                    message: "There is no invoice",
                    sukses: false
                })
                toast.info("There is no invoice", 
                {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    className: "custom-toast",
                    autoClose: 2000,
                })
            }
            if (res === "") {
                this.setState({
                    message: "There is no invoice",
                    sukses: false
                })
                toast.info("There is no invoice", 
                {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    className: "custom-toast",
                    autoClose: 2000,
                })
            }
        })
        .catch((error) => {
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
            }
        });
    }

    addInvoice = () => {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        let invoiceNumber = this.state.invoiceNumber
        // console.log(invoiceNumber)

        // const urlProduct = "http://localhost:8085/sangbango-microservices/payment/v1/product"
        const urlAddinvoice = "https://qrispayments.herokuapp.com/transaction/addInvoice?invoiceNumber="+invoiceNumber
        // const urlAddinvoice = "http://karyabetawi.site/qr-payment/transaction/addInvoice?invoiceNumber="+invoiceNumber

        const data = {

        }
        axios.post(urlAddinvoice, data, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            let res = response.data;
            // console.log(res)
            toast.info('transaction added', 
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
            // console.log(error)
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
            }
        });
    }
    render() {
        // console.log(this.state.invoiceNumber)

        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        if (decoded.role !== "Administrator") {
          this.props.history.push('/payaja')
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
                                <div className="row">
                                    <div className="col-md-4">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="border-bottom pb-2">
                                                <div className="form-group" >
                                                    <input name="invoiceNumber"
                                                    id="invoiceNumber"
                                                    onChange={this.onChange}
                                                    value={this.state.invoiceNumber} type="text" className="form-control" placeholder="Enter invoice number" />
                                                    <small className="form-text text-muted">*Fill the form with invoice number.</small>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Search</button>
                                                {this.state.sukses ? (
                                                    <button onClick={this.addInvoice} className=" ml-1 btn btn-primary">Add Invoice</button>
                                                ):(
                                                    ""
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                {this.state.loading ? (
                                    <div style={{textAlign:"center"}}>
                                        <img src={require('../img/loader.gif')} alt="loader"/>
                                    </div>
                                ) : (
                                    <table
                                        style={{ fontSize: "12px", width: "100%" }}
                                        id="transactions"
                                        className="table table-bordered table-hover"
                                    >
                                        <thead>
                                            <tr>
                                                <th><small style={{fontWeight:"bold"}}>Invoice No.</small></th>
                                                <th><small style={{fontWeight:"bold"}}>Merchant ID</small></th>
                                                <th><small style={{fontWeight:"bold"}}>Product Name</small></th>
                                                <th><small style={{fontWeight:"bold"}}>Amount (IDR)</small></th>
                                                <th><small style={{fontWeight:"bold"}}>Admin (IDR)</small></th>
                                                <th><small style={{fontWeight:"bold"}}>Total_Settled (IDR)</small></th>
                                                <th><small style={{fontWeight:"bold"}}>Transaction Date</small></th>
                                                <th><small style={{fontWeight:"bold"}}>Status</small></th>
                                                <th><small style={{fontWeight:"bold"}}>Description</small></th>
                                                <th><small style={{fontWeight:"bold"}}>Buyer</small></th>
                                                <th><small style={{fontWeight:"bold"}}>Trx Id</small></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.transactions.map((transaction, i) => (
                                                <tr key={i}>
                                                <td><small>
                                                    {transaction.isConfirmed ? (
                                                        <div style={{color:"#212529"}}>{transaction.invoice.invoiceNumber}</div>
                                                    ):(
                                                        <div style={{color:"#007bff", cursor:"pointer"}} onClick={() => this.confirmation(transaction.transactionId)}>{transaction.invoice.invoiceNumber}</div>
                                                    )}</small>
                                                </td>
                                                <td><small>{transaction.merchantId}</small></td>
                                                <td><small>{transaction.invoice.product.productName}</small></td>
                                                <td><small>Rp{transaction.amount}</small></td>
                                                <td><small>Rp{transaction.invoice.product.adminPrice}</small></td>
                                                <td><small>Rp{transaction.invoice.product.price}</small></td>
                                                <td><small>{transaction.transactionDate}</small></td>
                                                <td><small>{transaction.status}</small></td>
                                                <td><small>{transaction.description}</small></td>
                                                <td><small>{transaction.invoice.createdBy}</small></td>
                                                <td><small>{transaction.transactionId}</small></td>
                                                </tr>
                                            ))}
                                            {/* {transactionHistory} */}
                                        </tbody>
                                    </table>
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
export default Transaction;