import React, { Component } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

class Pricedetail extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                <SkeletonTheme color="#6e6b6b" highlightColor="#fff">
                <ul>
                    <li className="pb-0">
                        <a className="justify-content-between d-flex" href="#">
                            <h5>Payment Detail</h5>
                        </a>
                    </li>
                    <li>
                        <a className="justify-content-between d-flex" href="#">
                            <p>Price </p>
                            {this.props.price ? (
                                <span>Rp {this.props.price}</span>
                            ) : (
                                <span><Skeleton width={60} /></span>
                            )}
                        </a>
                        <a className="justify-content-between d-flex" href="#">
                            <p>Admin Fee </p>
                            {this.props.adminPrice ? (
                                <span>Rp {this.props.adminPrice}</span>
                            ) : (
                                <span><Skeleton width={60} /></span>
                            )}
                        </a>
                    </li>
                    <li className="border-top pt-2 mb-5">
                        <a style={{fontWeight:"bold"}} className="justify-content-between d-flex" href="#">
                            <p>Total Price </p>
                            {this.props.totalPrice ? (
                                <span>Rp {this.props.totalPrice}</span>
                            ) : (
                                <span><Skeleton width={60} /></span>
                            )}
                            
                        </a>
                    </li>
                </ul>
                </SkeletonTheme>
                <div onClick={this.props.checkout} className="btn_1 rounded-0 d-block" style={{fontWeight:"bold"}}>PAY</div>
            </div>
        );
    }
}

export default Pricedetail;
