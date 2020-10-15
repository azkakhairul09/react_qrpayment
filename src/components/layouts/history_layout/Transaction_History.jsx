import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Axios from 'axios';
import Qs from 'query-string'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Banner from './Banner';

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
        price: "",
        isLoading: true
    }

    componentDidMount() {
        if (localStorage.getItem('userData')) {
            const userData = localStorage.getItem('userData');
            let decoded = JSON.parse(userData);

            const param = {
                createdBy: decoded.name
            }
            // const urlTrxHistory = "http://localhost:8085/sangbango-microservices/payment/v1/invoice/getbycreatedby?" + Qs.stringify(param)
            // const urlTrxHistory = "https://qrispayments.herokuapp.com/invoice/getbycreatedby?" + Qs.stringify(param)
            const urlTrxHistory = "https://bangomicroservices.site/bango-backend-dev/invoice/getbycreatedby?" + Qs.stringify(param)

            Axios.get(urlTrxHistory, {
                headers: {
                    Authorization: decoded.token
                }
            })
            .then((response) => {
                let res = response.data.content
                this.setState ({
                    invoices: res,
                    isLoading: false
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

    transactionDetail(invoiceNumber) {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const param = {
            invoiceNumber: invoiceNumber
        }
        // const urlTrxHistory = "http://localhost:8085/sangbango-microservices/payment/v1/transaction?" + Qs.stringify(param)
        // const urlTrxHistory = "https://qrispayments.herokuapp.com/transaction?" + Qs.stringify(param)
        const urlTrxHistory = "https://bangomicroservices.site/bango-backend-dev/transaction?" + Qs.stringify(param)

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

        this.setState ({
            modalIsOpen: true
        })
    }

    closeModal = () => {
        this.setState({
          modalIsOpen: false
        })
    }

    print = (invoiceNumber) => {
        localStorage.invoiceNumber = invoiceNumber
        this.props.history.push("/invoice_to_pdf")
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
        if (this.state.isLoading) {
            return  <div style={{textAlign: "center"}}>
                        <img src={require('../dist/img/main_loader.gif')} alt="loader"/>
                    </div>
        }
        return (
            <div>
                {this.state.modalIsOpen ? (
                    ""
                ) : (
                    <div>
                    <Header />
                    <Banner />
                    <section className="course_details_area section_padding" style={{padding: "120px 0 0"}}>
                        <div className="container ">
                            <div className="row justify-content-center">
                                <div className="col-xl-5">
                                    <div className="section_tittle text-center">
                                    <h2 className="wow fadeIn">Transactions</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-lg-12 course_details_left">
                                <div className="content_history" style={{padding: "1rem"}}>
                                {this.state.isLoading ? (
                                    <div className="blog_right_sidebar" >
                                        <div style={{textAlign:"center"}}>
                                            <img src={require('../../img/loader.gif')} alt="loader"/>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="blog_right_sidebar" >
                                        {this.state.invoices.map((invoice, i) => (
                                            <aside className="single_sidebar_widget popular_post_widget mb-2" style={{boxShadow: "0px 0px 10px 0px #00000061",
                                                borderRadius: "4px"}} key={i}>
                                                <div className="row justify-content-between d-flex details">
                                                    <div className="col-sm-4"><span></span></div>
                                                    <div className="col-sm-4"><span></span></div>
                                                    <div className="col-sm-4">
                                                        <span className="badge badge-success" style={{textTransform:"capitalize", float:"right"}}>{invoice.status}</span>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-between d-flex details">
                                                    <div className="col-sm-4 pl-3 pr-3 justify-content-between d-flex details">
                                                        <span>No. Invoice</span><span style={{fontWeight:"bold"}}>{invoice.invoice.invoiceNumber}</span>
                                                    </div>
                                                    <div className="col-sm-4 pl-3 pr-3 justify-content-between d-flex details">
                                                        <span style={{textTransform:"capitalize"}}>Invoice Date</span><span>{invoice.invoice.invoiceDate}</span>
                                                    </div>
                                                    <div className="col-sm-4"><span></span></div>
                                                </div>
                                                <div className="justify-content-between d-flex details">
                                                    <span>{invoice.invoice.product.productName}</span>
                                                </div>
                                                <div className="row justify-content-between d-flex details">
                                                    <div className="col-sm-4"><span>x{invoice.invoice.qty}</span></div>
                                                    <div className="col-sm-4 pl-3 pr-3 justify-content-between d-flex details">
                                                        <span style={{textTransform:"capitalize"}}>Total</span>
                                                        <span>Rp {invoice.invoice.product.price}</span>
                                                    </div>
                                                    <div className="col-sm-4"></div>
                                                </div>
                                                <div className="row justify-content-between d-flex details mt-3">
                                                    <div className="col-sm-4"></div>
                                                    <div className="col-sm-8 pl-3 pr-3 justify-content-between d-flex details mt-3">
                                                        <span onClick={() => this.transactionDetail(invoice.invoice.invoiceNumber)} style={{cursor:"pointer", color:"#6c757d"}}><i className="far fa-eye"></i> Click to detail</span>
                                                        <span onClick={() => this.print(invoice.invoice.invoiceNumber)} style={{cursor:"pointer", float:"right", color:"#6c757d"}}><i class="fas fa-radiation-alt"></i> Print</span>
                                                    </div>
                                                </div>
                                            </aside>
                                        ))}                      
                                    </div>
                                )}
                                
                                
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
                <SkeletonTheme color="#6e6b6b" highlightColor="#fff">
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
                                {this.state.invoiceDate ? (
                                    <span>{this.state.invoiceDate}</span>
                                ) : (
                                    <span><Skeleton width={60} /></span>
                                )}
                                {this.state.description ? (
                                    <span className="badge badge-success" style={{textTransform:"capitalize"}}>{this.state.description} </span>
                                ) : (
                                    <span><Skeleton width={60} /></span>
                                )}
                                
                            </div>
                            <div className="media post_item">
                                {this.state.productImage ? (
                                        <img style={{maxWidth:"25%"}} src={this.state.productImage} alt="" />
                                ) : (
                                    <div className="img-fluid" style={{margin:"auto", textAlign:"center"}}>
                                        {/* <img src={require('../../../img/loader.gif')} alt="loader"/> */}
                                        <Skeleton width={150} height={150} />
                                    </div>
                                )}
                                
                                <div className="media-body">
                                    <div className="justify-content-between d-flex details">
                                        <span>Product Name</span>
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        {this.state.productName ? (
                                            <span style={{maxWidth: "50%"}}>{this.state.productName}</span>
                                        ) : (
                                            <span><Skeleton width={60} /></span>
                                        )}
                                        
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        <span>Qty </span>
                                        {this.state.qty ? (
                                            <span>{this.state.qty} </span>
                                        ) : (
                                            <Skeleton width={60} />
                                        )}
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        <span>Price </span>
                                        {this.state.price ? (
                                            <span style={{fontWeight:"bold"}}>Rp {this.state.price}</span>
                                        ) : (
                                            <Skeleton width={60} />
                                        )}
                                    </div>
                                    <div className="justify-content-between d-flex details">
                                        <span>No. Invoice</span>
                                        {this.state.invoiceNumber ? (
                                            <span style={{fontWeight:"bold"}}>{this.state.invoiceNumber}</span>
                                        ) : (
                                            <Skeleton width={60} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <span>SubTotal</span>
                                    {this.state.price ? (
                                        <span>Rp {this.state.price}</span>
                                    ) : (
                                        <Skeleton width={60} />
                                    )}
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <span>Admin Fee ({this.state.adminFee})</span>
                                    {this.state.adminPrice ? (
                                        <span>Rp {this.state.adminPrice}</span>
                                    ) : (
                                        <Skeleton width={60} />
                                    )}
                                </div>
                            </div>
                            <div className="widget_title"> </div>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <span style = {{fontWeight: "bold"}} >Price Total</span>
                                    {this.state.amount ? (
                                        <span style = {{fontWeight: "bold"}} >Rp {this.state.amount}</span>
                                    ) : (
                                        <Skeleton width={60} />
                                    )}
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
                                    {this.state.transactionDate ? (
                                        <span>{this.state.transactionDate}</span>
                                    ) : (
                                        <Skeleton width={60} />
                                    )}
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <span>Transaction ID</span>
                                    {this.state.transactionId ? (
                                        <span>{this.state.transactionId}</span>
                                    ) : (
                                        <Skeleton width={60} />
                                    )}
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <span>Price Total</span>
                                    {this.state.amount ? (
                                        <span>Rp {this.state.amount}</span>
                                    ) : (
                                        <Skeleton width={60} />
                                    )}
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <span>Payment Total</span>
                                    {this.state.amount ? (
                                        <span>Rp {this.state.amount}</span>
                                    ) : (
                                        <Skeleton width={60} />
                                    )}
                                    
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
                </SkeletonTheme>
                </Modal>
            </div>
        );
    }
}

export default Transaction_History;
