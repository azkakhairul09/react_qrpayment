import React, { Component } from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import Axios from 'axios';
import Qs from 'query-string'
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

class Print_Transaction extends Component {
    state = {
        invoiceNumber: "",
        payer: "",
        invoiceDate: "",
        productName: "",
        qty: "",
        productPrice: "",
        adminPrice: "",
        adminFee: "",
        amount: "",
        redirect: false
    }

    componentDidMount = () => {
        const invoiceNumber = localStorage.invoiceNumber

        if (!invoiceNumber) {
            this.setState({
                redirect: true
            })  
        }
        
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const param = {
            invoiceNumber: invoiceNumber
        }
        // const urlTrxHistory = "http://localhost:8085/sangbango-microservices/payment/v1/transaction?" + Qs.stringify(param)
        const urlTrxHistory = "https://qrispayments.herokuapp.com/transaction?" + Qs.stringify(param)

        Axios.get(urlTrxHistory, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            let res = response.data.content
            console.log(res)
            var amount = res.amount;
            var reverse = amount.toString().split('').reverse().join(''),
            amount_format = reverse.match(/\d{1,3}/g);
            amount_format = amount_format.join('.').split('').reverse().join('');

            var price = res.invoice.product.price;
            var reverseprice = price.toString().split('').reverse().join(''),
            price_format = reverseprice.match(/\d{1,3}/g);
            price_format = price_format.join('.').split('').reverse().join('');

            var admin = res.invoice.product.adminPrice;
            var reverseadmin = admin.toString().split('').reverse().join(''),
            admin_format = reverseadmin.match(/\d{1,3}/g);
            admin_format = admin_format.join('.').split('').reverse().join('');

            this.setState ({
                amount: amount_format,
                adminFee: res.invoice.adminFee,
                invoiceDate: res.invoice.invoiceDate,
                invoiceNumber: res.invoice.invoiceNumber,
                qty: res.invoice.qty,
                adminPrice: admin_format,
                productName: res.invoice.product.productName,
                price: price_format,
                payer: res.invoice.createdBy
            })   
        })
        .catch((error) => {
            console.log(error)
            console.log(error.response.status)
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

    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/history" />
        }
        if (!localStorage.invoiceNumber) {
            return <Redirect to="/history" />
        }
        return (
            <div>
                <section className="course_details_area invoices" style={{padding: "2rem 0"}}>
                    <div className="container " style={{maxWidth: "910px"}}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="container" style={{padding: "3vw"}}>
                                        <div className="row" style={{marginBottom:"2rem"}}>
                                            <div className="col-md-12" style={{textAlign:"center", textDecoration: "underline", fontWeight: "800", fontSize: "x-large", color: "#173767"}}>
                                                <span>e-Invoice</span>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-12">
                                                <img src={require('../dist/img/company-logo.png')} style={{maxWidth:"25%"}} alt="loader"/>
                                                <br/>
                                                <br/>
                                                <p style={{fontWeight:"bold", color:"#212529", fontSize:"16px"}} className="mb-0">Nomor Invoice : <span style={{fontWeight:"bold", color: "#0c2e60", letterSpacing:"2px"}}>{this.state.invoiceNumber}</span></p>
                                                <small>Diterbitkan atas nama:</small><br/>
                                                <p style={{color:"#212529"}} className="mb-0"><span style={{fontWeight:"500"}}>Pembeli &nbsp; </span>&nbsp; {this.state.payer}</p>
                                                <p style={{color:"#212529", borderBottom: "1px dashed #00000057", paddingBottom: "1rem"}} className="mb-0"><span style={{fontWeight:"500"}}>Tanggal &nbsp; </span>&nbsp; {this.state.invoiceDate}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="" style={{boxShadow: "unset", border: "1px dashed #00000080"}}>
                                                    <div className="card-body p-0" style={{overflow: "scroll"}}>
                                                        <table className="table">
                                                            <thead>
                                                                <tr style={{fontSize:"12px"}}>
                                                                    <th scope="col">Nama Produk</th>
                                                                    <th style={{textAlign:"center", width: "15%"}} scope="col">Jumlah</th>
                                                                    <th style={{textAlign:"center", width: "20%"}} scope="col">Metode</th>
                                                                    <th style={{textAlign:"center", width: "15%"}} scope="col">Harga</th>
                                                                    <th style={{textAlign:"right", width: "15%"}} scope="col">Subtotal</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr style={{fontSize:"12px"}}>
                                                                    <td style={{fontWeight:"bold", color: "#0c2e60"}} scope="row">{this.state.productName}</td>
                                                                    <td style={{textAlign:"center"}}>{this.state.qty}</td>
                                                                    <td style={{textAlign:"center"}}>QR Payment</td>
                                                                    <td style={{textAlign:"center"}}>Rp {this.state.price}</td>
                                                                    <td style={{textAlign:"right"}}>Rp {this.state.price}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="5">
                                                                        <div style={{borderBottom: "thin solid #e0e0e0"}}></div>
                                                                    </td>
                                                                </tr>
                                                                <tr style={{fontSize:"12px"}}>
                                                                    <td colSpan="4" style={{fontWeight:"bold", textAlign:"right"}}>Subtotal Harga Produk</td>
                                                                    <td style={{fontWeight:"bold", textAlign:"right"}}>Rp {this.state.price}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div className="invoicess" style={{margin: "1rem 0", boxShadow: "unset", border: "1px dashed #00000080", width:"49%", float:"right"}}>
                                                    <div className="card-body p-0">
                                                        <table className="table">
                                                            <tbody>
                                                                <tr style={{fontSize:"12px"}}>
                                                                    <td style={{paddingBottom: "0"}}>Biaya Admin</td>
                                                                    <td style={{textAlign:"right", paddingBottom: "0"}}>Rp {this.state.adminPrice}</td>
                                                                </tr>
                                                                <tr style={{fontSize:"10px", color:"#6c757d"}}>
                                                                    <td style={{padding: "0 1.5rem .75rem 1.5rem"}}><small>Pembayaran dengan metode QR dikenakan biaya admin sebesar {this.state.adminFee}</small></td>
                                                                    <td style={{padding: "0 1.5rem .75rem 1.5rem"}}></td>
                                                                </tr>
                                                                <tr>
                                                                    <td colSpan="2" style={{padding: "0 1.5rem"}}>
                                                                        <div style={{borderBottom: "thin solid #e0e0e0", padding: "0 1.5rem"}}></div>
                                                                    </td>
                                                                </tr>
                                                                <tr style={{fontSize:"12px"}}>
                                                                    <td style={{fontWeight:"bold"}}>Subtotal Biaya Admin</td>
                                                                    <td style={{fontWeight:"bold", textAlign:"right", width:"30%"}}>Rp {this.state.adminPrice}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="invoicess" style={{boxShadow: "unset", border: "1px solid #00000080", width:"49%", float:"right"}}>
                                                    <div className="card-body p-0">
                                                        <table className="table">
                                                            <tbody>
                                                                <tr style={{fontSize:"12px"}}>
                                                                    <td style={{fontWeight:"bold"}}>Total Bayar</td>
                                                                    <td style={{fontWeight:"bold", textAlign:"right", width:"40%"}}>Rp {this.state.amount}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-12">
                                                <small style={{color:"#6c757d"}}>*Invoice elektronik ini diterbitkan sebagai bukti bayar.</small><br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </section>
            </div>
        );
    }
}
class Example extends React.Component {
    render() {
      return (
        <div>
            <ReactToPrint content={() => this.componentRef}>
                <PrintContextConsumer>
                {({ handlePrint }) => (
                    <div className="d-flex justify-content-center">
                        <div className="col-xl-6 mt-1" style={{textAlign:"right"}}>
                            <button className="btn_4" onClick={handlePrint}>Cetak</button>
                        </div>
                    </div>
                )}
                </PrintContextConsumer>
            </ReactToPrint>
            <Print_Transaction ref={el => (this.componentRef = el)} />
        </div>
      );
    }
}

export default Example;
