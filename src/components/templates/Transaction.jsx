import React, { Component } from 'react'
import Footer from './Footer';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { SkeletonTheme } from 'react-loading-skeleton';
import Header from './Header';
import axios from "axios";

class Transaction extends Component {
    state = {
        loading: true,
        transactions: []
    }
    
    componentDidMount() {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const token = decoded.token

        const urlGetTransaction = "http://localhost:8085/sangbango-microservices/payment/v1/transaction/all"

        axios.get(urlGetTransaction, {
            headers: {
                Authorization: token
            }
        })
        .then((response) => {
            let res = response.data;
            console.log(res);
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
          console.log(error.response.data);
        });
    }
    render() {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        if (decoded.role !== "Administrator") {
          this.props.history.push('payaja')
        }

        if (this.state.loading) {
            return <div>Loading ...</div>
        }

        if (!this.state.transactions) {
            return <div>didn't get transactions</div>
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
                            <table
                                style={{ fontSize: "12px" }}
                                id="transactions"
                                className="table table-bordered table-hover"
                            >
                                <thead>
                                <tr>
                                    <th>Verif</th>
                                    <th>Invoice Number</th>
                                    <th>Product Name</th>
                                    <th>Amount (IDR)</th>
                                    <th>Transaction Date</th>
                                    <th>Status</th>
                                    <th>Description</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.transactions.map((transaction, i) => (
                                    <tr key={i}>
                                    <td>
                                        {transaction.isConfirmed ? (
                                            <button className="btn btn-primary" disabled={true}>
                                                <i className="far fa-check-circle"></i>
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary">
                                                <i className="far fa-check-circle"></i>
                                            </button>
                                        )}
                                    </td>
                                    <td>{transaction.invoice.invoiceNumber}</td>
                                    <td>{transaction.invoice.product.productName}</td>
                                    <td>Rp{transaction.amount}</td>
                                    <td>{transaction.transactionDate}</td>
                                    <td>{transaction.status}</td>
                                    <td>{transaction.description}</td>
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
export default Transaction;