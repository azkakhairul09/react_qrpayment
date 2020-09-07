import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Axios from 'axios';
import Qs from 'query-string'
import Modal from 'react-modal';
import { toast } from 'react-toastify';

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
        if (localStorage.getItem('userData')) {
            const userData = localStorage.getItem('userData');
            let decoded = JSON.parse(userData);

            const param = {
                createdBy: decoded.name
            }
            // const urlTrxHistory = "http://localhost:8085/sangbango-microservices/payment/v1/invoice/getbycreatedby?" + Qs.stringify(param)
            const urlTrxHistory = "https://qrispayments.herokuapp.com/invoice/getbycreatedby?" + Qs.stringify(param)

            Axios.get(urlTrxHistory, {
                headers: {
                    Authorization: decoded.token
                }
            })
            .then((response) => {
                let res = response.data.content
                this.setState ({
                    invoices: res
                })   
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
                    this.setState({
                        isLoggedin: false
                    })
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
            this.props.history.push("/login")
        }
    }

    transactionDetail(invoiceNumber) {
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

            var str = res.transactionDate;
            var my = str.split(".").slice(0, -1).join(" ");

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
            }
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
            overFlow              : 'scroll'
        }
      };
    render() {
        return (
            <div>
                {this.state.modalIsOpen ? (
                    ""
                ) : (
                    <div>
                    <Header />
                    <section className="course_details_area section_padding" style={{padding: "120px 0"}}>
                        <div className="container " style={{borderLeft: "2px solid #0000004d", borderRight: "2px solid #0000004d"}}>
                            <div className="row">
                            <div className="col-lg-12 course_details_left">
                                <div className="content_history">
                                <div className="here" style={{fontWeight: "600"}}>
                                    <h4>TRANSACTION HISTORY</h4>
                                    <div className="bor-bottom"></div>
                                </div>
                                
                                <div className="blog_right_sidebar" >
                                {this.state.invoices.map((invoice, i) => (
                                    <aside className="single_sidebar_widget popular_post_widget border-bottom pb-4" key={i} style={{background: "#fff"}}>
                                        <div className="row justify-content-between d-flex details">
                                            <div className="col-sm-4"><span>No. Invoice</span></div>
                                            <div className="col-sm-4"><span style={{textTransform:"capitalize"}}>Invoice Date</span></div>
                                            <div className="col-sm-4"><span className="badge badge-success" style={{textTransform:"capitalize", float:"right"}}>{invoice.status}</span></div>
                                        </div>
                                        <div className="row justify-content-between d-flex details">
                                            <div className="col-sm-4"><span style={{fontWeight:"bold"}}>{invoice.invoice.invoiceNumber}</span></div>
                                            <div className="col-sm-4"><span style={{textTransform:"capitalize"}}>{invoice.invoice.invoiceDate}</span></div>
                                            <div className="col-sm-4"></div>
                                        </div>
                                        <div className="justify-content-between d-flex details">
                                            <span>{invoice.invoice.product.productName}</span>
                                        </div>
                                        <div className="row justify-content-between d-flex details">
                                            <div className="col-sm-4"><span>x{invoice.invoice.qty}</span></div>
                                            <div className="col-sm-4"><span style={{textTransform:"capitalize"}}>Total</span></div>
                                            <div className="col-sm-4"></div>
                                        </div>
                                        <div className="row justify-content-between d-flex details">
                                            <div className="col-sm-4"></div>
                                            <div className="col-sm-4"><span>Rp {invoice.invoice.product.price}</span></div>
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
                    </div>
                )}
                
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
                    <div className="justify-content-between d-flex" style={{background: "#3786bd", color: "#fff"}}>
                        <span>Transaction Detail </span>
                    </div>
                    <div className="blog_right_sidebar">
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="justify-content-between d-flex details">
                                <span>Invoice Date</span>
                            </div>  
                            <div className="justify-content-between d-flex details">
                                <span>{this.state.invoiceDate}</span>
                                <span className="badge badge-success" style={{textTransform:"capitalize"}}>{this.state.description} </span>
                            </div>
                            <div className="media post_item">
                                <img style={{maxWidth:"25%"}} src={this.state.productImage} alt="" />
                                <div className="media-body">
                                    <div className="justify-content-between d-flex details">
                                        <span>Product Name</span>
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        <span style={{maxWidth: "50%"}}>{this.state.productName}</span>
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        <span>Qty </span>
                                        <span>{this.state.qty} </span>
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        <span>Price </span>
                                        <span style={{fontWeight:"bold"}}>Rp {this.state.price}</span>
                                    </div>
                                    <div className="justify-content-between d-flex details">
                                        <span>No. Invoice</span>
                                        <span style={{fontWeight:"bold"}}>{this.state.invoiceNumber}</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <span>SubTotal</span>
                                    <span>Rp {this.state.price}</span>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <span>Admin Fee ({this.state.adminFee})</span>
                                    <span>Rp {this.state.adminPrice}</span>
                                </div>
                            </div>
                            <div className="widget_title"> </div>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <span style = {{fontWeight: "bold"}} >Price Total</span>
                                    <span style = {{fontWeight: "bold"}} >Rp {this.state.amount}</span>
                                </div>
                            </div>
                            <br/>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details mb-2">
                                    <span style = {{fontWeight: "bold"}} >Payment</span>
                                </div>
                            </div>
                            <div className="media-body">
                            <div className="justify-content-between d-flex details">
                                    <span>Transaction Date</span>
                                    <span>{this.state.transactionDate}</span>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <span>Transaction ID</span>
                                    <span>{this.state.transactionId}</span>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <span>Price Total</span>
                                    <span>Rp {this.state.amount}</span>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <span>Payment Total</span>
                                    <span>Rp {this.state.amount}</span>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <span>Payment Method</span>
                                    <span>QRIS (QR Payment)</span>
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
