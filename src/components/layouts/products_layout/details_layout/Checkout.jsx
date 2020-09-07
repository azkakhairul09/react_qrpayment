import React, { Component } from 'react';
import Axios from 'axios';
import Qs from 'query-string'
import qrcode from "qrcode";
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

class Checkout extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            qrcontent: "",
            price: "",
            invoiceNo: "",
            redirect: false,
            error: false,
            message: "",
            isLoggedin: true
        }
    }
    componentDidMount() {
        if (this.props.isClicked) {
            if (localStorage.getItem('userData')) {
                const userData = localStorage.getItem('userData');
                let decoded = JSON.parse(userData);
        
                const param = {
                    productId: this.props.productId
                }
                // const urlCreateQr = "http://localhost:8085/sangbango-microservices/payment/v1/invoice?" + Qs.stringify(param)
                const urlCreateQr = "https://qrispayments.herokuapp.com/invoice?" + Qs.stringify(param)
        
                const data = {}
        
                Axios.post(urlCreateQr, data, {
                    headers: {
                        Authorization: decoded.token
                    }
                })
                .then((response) => {
                    let res = response.data.content

                    var nominal = res.invoiceNominal;
                    var reverse = nominal.toString().split('').reverse().join(''),
                    format = reverse.match(/\d{1,3}/g);
                    format = format.join('.').split('').reverse().join('');

                    this.setState ({
                        qrcontent: res.content,
                        price: format,
                        invoiceNo: res.invoiceNumber
                    })         
                    let str = res.content;

                    qrcode.toCanvas(document.getElementById("canvas"), str, function (error) {
                    if (error) console.error(error);
                    //   console.log('success!')
                    });
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
                    autoClose: 2000,
                    className: "custom-toast"
                })
                this.setState({
                    isLoggedin: false
                })
            }
        }
    }

    paymentCheck = (invoiceNo) => {
        this.setState({
            redirect: true
        }) 
        window.open('/transactionstatus', "_blank") //to open new page
        localStorage.invoiceNo = invoiceNo
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/transactionstatus' />
        }
    }

    renderLogin = () => {
        if (!this.state.isLoggedin) {
          return <Redirect to='/login' />
        }
    }
    render() {
        return (
            <div>
                {this.renderLogin()}
                <aside className="single_sidebar_widget newsletter_widget">
                    <div>
                    <img src={require("../../dist/img/qris_default.png")} className="widget_title mb-2" style={{width:"35%"}} />
                    <div style={{borderBottom: "1px solid #dee2e6", width: "100%", marginBottom: "0.75rem"}}></div>
                        
                    </div>
                    <div className="main_image mb-3">
                        <canvas id="canvas" />
                    </div>
                </aside>
                <div className="border-top pt-2 mb-5">
                    <a className="justify-content-between d-flex" href="#">
                        <span>Total </span>
                        <span>Rp {this.state.price}</span>
                    </a>
                    <a className="justify-content-between d-flex" href="#">
                        <span>No. Invoice </span>
                        <span>{this.state.invoiceNo}</span>
                    </a>
                </div>
                <h6>Scan by</h6>
                <img src={require("../../dist/img/ewallet.jpg")} />
                {/* {this.renderRedirect()} */}
                <div className="btn_1 rounded-0 d-block" style={{fontWeight:"bold"}} onClick={() => this.paymentCheck(this.state.invoiceNo)}>PAYMENT STATUS</div>
            </div>
        );
    }
}

export default Checkout;
