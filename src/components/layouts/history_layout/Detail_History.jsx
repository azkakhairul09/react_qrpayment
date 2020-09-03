import React, { Component } from 'react';
import Modal from 'react-modal';

class Detail_History extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalIsOpen: true
        }
    }

    closeModal = () => {
        this.setState({
          modalIsOpen: false
        })
    }

    customStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
    };
    render() {
        return (
            <div>
                <span style={{cursor:"pointer"}}><i className="far fa-eye"></i> Click to detail</span>
                <Modal
                isOpen={this.props.modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={this.closeModal}
                style={this.customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
                >
                    <div className="content_status">
                    <div className="justify-content-between d-flex" style={{background: "#cacaca"}}>
                        <span>Transaction Detail </span>
                    </div>
                    <div className="blog_right_sidebar">
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="justify-content-between d-flex details">
                                <small>Invoice Date</small>
                            </div>  
                            <div className="justify-content-between d-flex details">
                                <span>{this.props.invoiceDate}</span>
                                <span className="badge badge-success" style={{textTransform:"capitalize"}}>{this.props.description} </span>
                            </div>
                            <div className="media post_item">
                                <img style={{maxWidth:"25%"}} src={this.props.productImage} alt="" />
                                <div className="media-body">
                                    <div className="justify-content-between d-flex details">
                                        <small>Product Name</small>
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        <span style={{maxWidth: "50%"}}>{this.props.productName}</span>
                                    </div>
                                    <div className="justify-content-between d-flex details">
                                        <small>Qty : {this.props.qty} </small>
                                    </div>
                                    <div className="justify-content-between d-flex details mb-1">
                                        <small style={{fontWeight:"bold"}}>Price </small>
                                        <small style={{fontWeight:"bold"}}>Rp {this.props.price}</small>
                                    </div>
                                    <div className="justify-content-between d-flex details">
                                        <small>No. Invoice</small>
                                        <span style={{fontWeight:"bold"}}>{this.props.invoiceNumber}</span>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <aside className="single_sidebar_widget popular_post_widget middle" style={{background: "#fff"}}>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <small>SubTotal</small>
                                    <small>Rp {this.props.price}</small>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <small>Admin Fee ({this.props.adminFee})</small>
                                    <small>Rp {this.props.adminPrice}</small>
                                </div>
                            </div>
                            <div className="widget_title"> </div>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <small style = {{fontWeight: "bold"}} >Total Harga</small>
                                    <small style = {{fontWeight: "bold"}} >Rp {this.props.amount}</small>
                                </div>
                            </div>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <span style = {{fontWeight: "bold"}} >Payment</span>
                                </div>
                            </div>
                            <div className="media-body">
                                <div className="justify-content-between d-flex details">
                                    <small>Price Total</small>
                                    <small>Rp {this.props.amount}</small>
                                </div>
                                <div className="justify-content-between d-flex details">
                                    <small>Payment Total</small>
                                    <small>Rp {this.props.amount}</small>
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

export default Detail_History;
