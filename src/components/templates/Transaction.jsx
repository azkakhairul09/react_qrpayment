import React, { Component } from 'react'
import Footer from './Footer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { SkeletonTheme } from 'react-loading-skeleton';
import Header from './Header';
import axios from "axios";
import { toast } from 'react-toastify';

class Transaction extends Component {
    state = {
        loading: true,
        transactions: []
    }
    
    getData = () => {
        this.setState ({
            loading: true
        })

        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const token = decoded.token

        // const urlGetTransaction = "http://localhost:8085/sangbango-microservices/payment/v1/transaction/all"
        const urlGetTransaction = "https://qrispayments.herokuapp.com/transaction/all"

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

    componentDidMount() {
        this.getData()
    }

    confirmation = (transactionId) => {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const token = decoded.token

        // const urlConfirmation = "http://localhost:8085/sangbango-microservices/payment/v1/transaction/confirmation?transactionId="+transactionId
        const urlConfirmation = "https://qrispayments.herokuapp.com/transaction/confirmation?transactionId="+transactionId

        const data = {}
        axios.put(urlConfirmation, data, {
            headers: {
                Authorization: token
            }
        })
        .then((response) => {
            let res = response.data;
            console.log(res);
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
            console.log(error.response.data);
            this.setState ({
                loading: true
            })
        });
    }
    render() {
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
                                                <th>Invoice No.</th>
                                                <th>Merchant ID</th>
                                                <th>Product Name</th>
                                                <th>Amount (IDR)</th>
                                                <th>Admin (IDR)</th>
                                                <th>Total_Settled (IDR)</th>
                                                <th>Transaction Date</th>
                                                <th>Status</th>
                                                <th>Description</th>
                                                <th>Trx Id</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.transactions.map((transaction, i) => (
                                                <tr key={i}>
                                                <td>
                                                    {transaction.isConfirmed ? (
                                                        <div style={{color:"#212529"}}>{transaction.invoice.invoiceNumber}</div>
                                                    ):(
                                                        <div style={{color:"#007bff", cursor:"pointer"}} onClick={() => this.confirmation(transaction.transactionId)}>{transaction.invoice.invoiceNumber}</div>
                                                    )}
                                                </td>
                                                <td>{transaction.merchantId}</td>
                                                <td>{transaction.invoice.product.productName}</td>
                                                <td>Rp{transaction.amount}</td>
                                                <td>Rp{transaction.invoice.product.adminPrice}</td>
                                                <td>Rp{transaction.invoice.product.price}</td>
                                                <td>{transaction.transactionDate}</td>
                                                <td>{transaction.status}</td>
                                                <td>{transaction.description}</td>
                                                <td>{transaction.transactionId}</td>
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