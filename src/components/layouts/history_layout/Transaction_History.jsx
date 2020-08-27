import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Axios from 'axios';
import Qs from 'query-string'
import Modal from 'react-modal';

class Transaction_History extends Component {
    state = {
        invoices: [],
        modalIsOpen: false,
        amount: "",
        description: "",
        status: "",
        transactionDate: "",
        transactionId: "",
        adminFee: "",
        currency: "",
        invoiceDate: "",
        invoiceId: "",
        invoiceName: "",
        invoiceNumber: "",
        qty: "",
        adminPrice: "",
        productImage: "",
        productName: "",
        price: ""
    }

    componentDidMount() {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const param = {
            createdBy: decoded.name
        }
        const urlTrxHistory = "http://localhost:8085/sangbango-microservices/payment/v1/invoice/getbycreatedby?" + Qs.stringify(param)

        Axios.get(urlTrxHistory, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            let res = response.data.content
            console.log(res);
            this.setState ({
                invoices: res
            })   
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    }

    transactionDetail(invoiceNumber) {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const param = {
            invoiceNumber: invoiceNumber
        }
        const urlTrxHistory = "http://localhost:8085/sangbango-microservices/payment/v1/transaction?" + Qs.stringify(param)

        Axios.get(urlTrxHistory, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            let res = response.data.content
            console.log(res);
            var amount = res.amount;
            var reverse = amount.toString().split('').reverse().join(''),
            amount_format = reverse.match(/\d{1,3}/g);
            amount_format = amount_format.join('.').split('').reverse().join('');

            var price = res.invoice.product.price;
            var reverse = price.toString().split('').reverse().join(''),
            price_format = reverse.match(/\d{1,3}/g);
            price_format = price_format.join('.').split('').reverse().join('');

            var admin = res.invoice.product.adminPrice;
            var reverse = admin.toString().split('').reverse().join(''),
            admin_format = reverse.match(/\d{1,3}/g);
            admin_format = admin_format.join('.').split('').reverse().join('');

            var str = res.transactionDate;
            var my = str.split(".").slice(0, -1).join(" ");

            console.log(my);

            this.setState ({
                amount: amount_format,
                description: res.description,
                status: res.status,
                transactionDate: my,
                transactionId: res.transactionId,
                adminFee: res.invoice.adminFee,
                currency: res.invoice.currency,
                invoiceDate: res.invoice.invoiceDate,
                invoiceId: res.invoice.invoiceId,
                invoiceName: res.invoice.invoiceName,
                invoiceNumber: res.invoice.invoiceNumber,
                qty: res.invoice.qty,
                adminPrice: admin_format,
                productImage: res.invoice.product.productImage,
                productName: res.invoice.product.productName,
                price: price_format
            })   
        })
        .catch((error) => {
            console.log(error.response.data);
        });

        this.setState ({
            modalIsOpen: true
        })
    }

    closeModal = () => {
        this.setState({
          modalIsOpen: false
        })
    }

    customStyles = {
        content : {
          top                   : '55%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          border                : '0',
        }
      };
    render() {
        return (
            <div>
                <Header />
                <section className="course_details_area section_padding" style={{padding: "120px 0"}}>
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 course_details_left">
                        <div className="content_history">
                        <div className="justify-content-between d-flex" style={{background: "#cacaca"}}>
                            <small style={{fontWeight: "bold"}}>TRANSACTION HISTORY</small>
                        </div>
                        
                        <div className="blog_right_sidebar" >
                        {this.state.invoices.map((invoice, i) => (
                            <aside className="single_sidebar_widget popular_post_widget border-bottom pb-4" key={i} style={{background: "#fff"}}>
                                <div className="row justify-content-between d-flex details">
                                    <div className="col-sm-4"><small>No. Invoice</small></div>
                                    <div className="col-sm-4"><small style={{textTransform:"capitalize"}}>Invoice Date</small></div>
                                    <div className="col-sm-4"><span className="badge badge-success" style={{textTransform:"capitalize", float:"right"}}>{invoice.status}</span></div>
                                </div>
                                <div className="row justify-content-between d-flex details">
                                    <div className="col-sm-4"><small style={{fontWeight:"bold"}}>{invoice.invoice.invoiceNumber}</small></div>
                                    <div className="col-sm-4"><small style={{textTransform:"capitalize"}}>{invoice.invoice.invoiceDate}</small></div>
                                    <div className="col-sm-4"></div>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <small>{invoice.invoice.product.productName}</small>
                                </div>
                                <div className="row justify-content-between d-flex details">
                                    <div className="col-sm-4"><small>x{invoice.invoice.qty}</small></div>
                                    <div className="col-sm-4"><small style={{textTransform:"capitalize"}}>Total</small></div>
                                    <div className="col-sm-4"></div>
                                </div>
                                <div className="row justify-content-between d-flex details">
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-4"><small>Rp {invoice.invoice.product.price}</small></div>
                                    <div className="col-sm-4"><span onClick={() => this.transactionDetail(invoice.invoice.invoiceNumber)} style={{cursor:"pointer", float:"right"}}><i className="far fa-eye"></i> Click to detail</span></div>
                                </div>
                            </aside>
                        ))}                      
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                <Footer />
                <Modal
                parentSelector={() => document.querySelector('#root')}
                overlayRef={node => (this.overlayRef = node)}
                contentRef={node => (this.contentRef = node)}
                isOpen={this.state.modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={this.closeModal}
                style={this.customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
                >
                    <div className="content_modal">
                    <div className="justify-content-between d-flex" style={{background: "#cacaca"}}>
                        <span>Transaction Detail </span>
                    </div>
                    <div className="blog_right_sidebar">
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="justify-content-between d-flex details">
                                <small>Invoice Date</small>
                            </div>  
                            <div className="justify-content-between d-flex details">
                                <span>{this.state.invoiceDate}</span>
                                <span className="badge badge-success" style={{textTransform:"capitalize"}}>{this.state.status} </span>
                            </div>
                            <div className="media post_item">
                                <img style={{maxWidth:"25%"}} src={this.state.productImage} alt="" />
                                <div className="media-body">
                                    <div className="justify-content-between d-flex details">
                                        <small>Product Name</small>
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        <span style={{maxWidth: "50%"}}>{this.state.productName}</span>
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        <small>Qty </small>
                                        <small>{this.state.qty} </small>
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        <small>Price </small>
                                        <small style={{fontWeight:"bold"}}>Rp {this.state.price}</small>
                                    </div>
                                    <div className="justify-content-between d-flex details">
                                        <small>No. Invoice</small>
                                        <small style={{fontWeight:"bold"}}>{this.state.invoiceNumber}</small>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <small>SubTotal</small>
                                    <small>Rp {this.state.price}</small>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <small>Admin Fee ({this.state.adminFee})</small>
                                    <small>Rp {this.state.adminPrice}</small>
                                </div>
                            </div>
                            <div className="widget_title"> </div>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <small style = {{fontWeight: "bold"}} >Price Total</small>
                                    <small style = {{fontWeight: "bold"}} >Rp {this.state.amount}</small>
                                </div>
                            </div>
                            <br/>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details mb-2">
                                    <small style = {{fontWeight: "bold"}} >Payment</small>
                                </div>
                            </div>
                            <div className="media-body">
                            <div className="justify-content-between d-flex details">
                                    <small>Transaction Date</small>
                                    <small>{this.state.transactionDate}</small>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <small>Transaction ID</small>
                                    <small>{this.state.transactionId}</small>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <small>Price Total</small>
                                    <small>Rp {this.state.amount}</small>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <small>Payment Total</small>
                                    <small>Rp {this.state.amount}</small>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <small>Payment Method</small>
                                    <small>QRIS (QR Payment)</small>
                                </div>
                            </div>
                            <div className="media-body">
                                <div className="pending load_more mb-2 mt-5">
                                    <div className="btn_4" onClick={this.closeModal}>Close</div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
                </Modal>
            </div>
        );
    }
}

export default Transaction_History;
