import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

class Pending extends Component {
    state = {
        isClicked: false,
        disabled: false
    }

    showQr = () => {
        this.setState ({
            isClicked: true,
            disabled: true
        })        
    }

    downloadQR = (name) => {
        const canvas = document.getElementById(name);
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = name+".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    render() {
        return (
            <div>
                <div className="content_status">
                    <nav style={{padding: ".5rem .5rem", paddingBottom: "2rem"}} className="navbar navbar-expand-lg navbar-light">
                        <Link className="navbar-brand" to=""> <img src={require("../dist/img/logo.png")} style={{maxWidth:"50% !important"}} alt="logo" /> </Link>
                    </nav>
                    <div className="justify-content-between d-flex" style={{background: "#cacaca"}}>
                        <span>INVOICE </span>
                        <span>{this.props.invoiceNumber}</span>
                    </div>
                    <div className="blog_right_sidebar">
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="justify-content-between d-flex details">
                                <span>{this.props.invoiceDate}</span>
                                <span className="badge badge-warning" style={{textTransform:"capitalize"}}>{this.props.status} </span>
                            </div>
                            <br/>
                            <h3 className="widget_title">Transaction Detail</h3>
                            <div className="media post_item">
                                <img style={{maxWidth:"25%"}} src={this.props.productImage} alt="" />
                                <div className="media-body">
                                    <h3 style={{textTransform: "capitalize"}}>{this.props.categorize}</h3>
                                    <div className="justify-content-between d-flex details">
                                        <span style={{maxWidth: "50%"}}>{this.props.productName}</span>
                                    </div>
                                    <div className="justify-content-between d-flex details">
                                        <span>Qty : {this.props.qty} </span>
                                        <span>Rp {this.props.price}</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <span>SubTotal</span>
                                    <span>Rp {this.props.price}</span>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <span>Admin Fee ({this.props.adminFee})</span>
                                    <span>Rp {this.props.admin}</span>
                                </div>
                            </div>
                            <div className="widget_title"> </div>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <span style = {{fontWeight: "bold"}} >Total Harga</span>
                                    <span style = {{fontWeight: "bold"}} >Rp {this.props.invoiceNominal}</span>
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
                                        <div className="btn_4" style={{cursor:"not-allowed"}}>Show QR</div>
                                    ) : (
                                        <div className="btn_4" onClick={() => this.showQr(this.props.content)}>Show QR</div>
                                    )}
                                </div>
                            </div>
                        </aside>
                        {this.state.isClicked ? (
                            <div style={{background: "#fff"}}>
                            <div style={{borderRadius:"0"}} className="alert alert-warning">
                                Oops, you have not completed this payment!
                            </div>
                            <aside className="single_sidebar_widget newsletter_widget">
                                <div>
                                    <img src={require("../dist/img/qris_default.png")} className="widget_title mb-2" style={{width:"25%"}} />
                                    <div style={{borderBottom: "1px solid #dee2e6", width: "100%", marginBottom: "0.75rem"}}></div>
                                </div>
                                <div className="main_image mb-3">
                                    <QRCode 
                                    id={this.props.categorize}
                                    value={this.props.content} 
                                    size={200}
                                    level={"L"}
                                    includeMargin={true}
                                    />
                                    <br/>
                                    <div className="showQr" onClick={() => this.downloadQR(this.props.categorize)}> Download QR </div>
                                </div>
                            </aside>
                            <div className="pl-2 pr-2">
                                <h6>Scan by</h6>
                                <img src={require("../dist/img/ewallet.jpg")} />
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Pending;
