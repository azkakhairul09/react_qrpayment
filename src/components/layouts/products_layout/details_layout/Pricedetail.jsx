import React, { Component } from 'react';

class Pricedetail extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <ul>
                    <li className="pb-0">
                        <a className="justify-content-between d-flex" href="#">
                            <h5>Payment Detail</h5>
                        </a>
                    </li>
                    <li>
                        <a className="justify-content-between d-flex" href="#">
                            <p>Price </p>
                            <span>Rp {this.props.price}</span>
                        </a>
                        <a className="justify-content-between d-flex" href="#">
                            <p>Admin Fee </p>
                            <span>Rp {this.props.adminPrice}</span>
                        </a>
                    </li>
                    <li className="border-top pt-2 mb-5">
                        <a style={{fontWeight:"bold"}} className="justify-content-between d-flex" href="#">
                            <p>Total Price </p>
                            <span>Rp {this.props.totalPrice}</span>
                        </a>
                    </li>
                </ul>
                <div onClick={this.props.checkout} className="btn_1 rounded-0 d-block" style={{fontWeight:"bold"}}>PAY</div>
            </div>
        );
    }
}

export default Pricedetail;
