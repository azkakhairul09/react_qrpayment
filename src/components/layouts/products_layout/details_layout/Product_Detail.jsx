import React, { Component } from 'react'
import Qs from "query-string"
import Axios from 'axios'
import Pricedetail from './Pricedetail'
import Checkout from './Checkout'

class Product_Detail extends Component {
    state = {
        loading: true,
        isClicked: false,
        adminPrice: 0,
        categorize: "",
        createdBy: "",
        createdDate: "",
        id: 0,
        price: 0,
        productDesc: "",
        productId: "",
        productImage: "",
        productName: "",
        totalPrice: 0,
        updatedDate: ""
    }

    componentDidMount() {
        const param = {
            productId: localStorage.productId
        } 
        const urlGetProduct = "http://localhost:8085/sangbango-microservices/payment/v1/product/detail?"+Qs.stringify(param)

        Axios.get(urlGetProduct, {
            headers: {
            }
        })
        .then((response) => {
            let res = response.data.content;
            console.log(res);
            this.setState ({
                adminPrice: res.adminPrice,
                categorize: res.categorize,
                createdBy: res.createdBy,
                createdDate: res.createdDate,
                id: res.id,
                price: res.price,
                productDesc: res.productDesc,
                productId: res.productId,
                productImage: res.productImage,
                productName: res.productName,
                totalPrice: res.totalPrice,
                updatedDate: res.updatedDate,
                loading: false
            })      
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
    checkout = () => {
        this.setState({
            isClicked: true
        })
    }
    render() {
        if (this.state.loading) {
            return <div>Loading ...</div>
        }
        return (
            <div>
                {/*================ Start Course Details Area =================*/}
                <section className="course_details_area section_padding">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-8 course_details_left">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="main_image">
                                    <img className="img-fluid" src={this.state.productImage} style={{border: "1px solid #edeff2"}} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="content_wrapper">
                                    <h4 className="title_top" style={{textTransform: "uppercase"}}>{this.state.productName}</h4>
                                    <div style={{borderBottom:"5px solid #3786bd", width:"40px", marginBottom: "5px"}}></div>
                                        <div style={{marginBottom: "15px", textAlign: "justify"}} className="content">
                                            {this.state.productDesc}
                                        </div>
                                        <div>
                                            Created By:
                                        </div>
                                        <div>
                                            {this.state.createdBy}
                                        </div>
                                    </div>
                                </div>
                            </div>                           
                        </div>
                        <div className="col-lg-4 right-contents">
                            <div className="sidebar_top">
                                {this.state.isClicked ? (
                                    <Checkout 
                                    productId={this.state.productId}
                                    isClicked={this.state.isClicked}
                                    />
                                ) : (
                                    <Pricedetail 
                                    price={this.state.price} 
                                    adminPrice={this.state.adminPrice} 
                                    totalPrice={this.state.totalPrice}
                                    checkout={this.checkout}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                </section>
                {/*================ End Course Details Area =================*/}
            </div>
        )
    }
}
export default Product_Detail;