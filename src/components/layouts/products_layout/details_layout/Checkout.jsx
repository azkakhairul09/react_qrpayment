import React, { Component } from 'react';
import Axios from 'axios';
import Qs from 'query-string'
import qrcode from "qrcode";
import { Redirect } from 'react-router-dom';

class Checkout extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            qrcontent: "",
            price: "",
            invoiceNo: "",
            redirect: false,
            error: false,
            message: ""
        }
    }
    componentDidMount() {
        if (this.props.isClicked) {
            const userData = localStorage.getItem('userData');
            let decoded = JSON.parse(userData);
    
            const param = {
                productId: this.props.productId
            }
            const urlCreateQr = "http://localhost:8085/sangbango-microservices/payment/v1/invoice?" + Qs.stringify(param)
    
            const data = {}
    
            Axios.post(urlCreateQr, data, {
                headers: {
                    Authorization: decoded.token
                }
            })
            .then((response) => {
                let res = response.data.content
                console.log(res);
                this.setState ({
                    qrcontent: res.content,
                    price: res.invoiceNominal,
                    invoiceNo: res.invoiceNumber
                })         
                let str = res.content;

                qrcode.toCanvas(document.getElementById("canvas"), str, function (error) {
                  if (error) console.error(error);
                  //   console.log('success!')
                });
            })
            .catch((error) => {
              console.log(error.response.data);
            });
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

    hideAlert() {
        this.setState({
          alert: null
        });
    }
    render() {
        return (
            <div>
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
