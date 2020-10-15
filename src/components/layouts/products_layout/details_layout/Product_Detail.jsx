import React, { Component } from 'react'
import Qs from "query-string"
import Axios from 'axios'
import Pricedetail from './Pricedetail'
import Checkout from './Checkout'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

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
        // const urlGetProduct = "http://localhost:8085/sangbango-microservices/payment/v1/product/detail?"+Qs.stringify(param)
        // const urlGetProduct = "https://qrispayments.herokuapp.com/product/detail?"+Qs.stringify(param)
        const urlGetProduct = "https://bangomicroservices.site/bango-backend-dev/product/detail?"+Qs.stringify(param)

        Axios.get(urlGetProduct, {
            headers: {
            }
        })
        .then((response) => {
            let res = response.data.content;

            var nominal = res.price;
            var reverse = nominal.toString().split('').reverse().join(''),
            format = reverse.match(/\d{1,3}/g);
            format = format.join('.').split('').reverse().join('');

            var admin = res.adminPrice;
            var reverse_admin = admin.toString().split('').reverse().join(''),
            format_admin = reverse_admin.match(/\d{1,3}/g);
            format_admin = format_admin.join('.').split('').reverse().join('');

            var totalPrice = res.totalPrice;
            var reverse_totalPrice = totalPrice.toString().split('').reverse().join(''),
            format_totalPrice = reverse_totalPrice.match(/\d{1,3}/g);
            format_totalPrice = format_totalPrice.join('.').split('').reverse().join('');

            this.setState ({
                adminPrice: format_admin,
                categorize: res.categorize,
                createdBy: res.createdBy,
                createdDate: res.createdDate,
                id: res.id,
                price: format,
                productDesc: res.productDesc,
                productId: res.productId,
                productImage: res.productImage,
                productName: res.productName,
                totalPrice: format_totalPrice,
                updatedDate: res.updatedDate,
                loading: false
            })      
        })
        .catch((error) => {
        });
    }
    checkout = () => {
        this.setState({
            isClicked: true
        })
    }
    render() {
        return (
            <div>
                {/*================ Start Course Details Area =================*/}
                <SkeletonTheme  color="#6e6b6b" highlightColor="#fff">
                <section className="course_details_area section_padding">
                    <div className="container wow fadeIn">
                        <div className="row">
                            <div className="col-lg-8 course_details_left">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="main_image">
                                            {this.state.productImage ? (
                                                <img className="img-fluid" src={this.state.productImage} style={{border: "1px solid #edeff2"}} alt="" />
                                            ) : (
                                                <div className="img-fluid" style={{margin:"auto", textAlign:"center"}}>
                                                    {/* <img src={require('../../../img/loader.gif')} alt="loader"/> */}
                                                    <Skeleton width={250} height={250} />
                                                </div>

                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="content_wrapper">
                                            {this.state.productName ? (
                                                <h4 className="title_top" style={{textTransform: "uppercase"}}>{this.state.productName}</h4>
                                            ) : (
                                                <Skeleton width={60} />
                                            )}
                                            
                                            <div style={{borderBottom:"5px solid #3786bd", width:"40px", marginBottom: "5px"}}></div>
                                            {this.state.productDesc ? (
                                                <div style={{marginBottom: "15px", textAlign: "justify"}} className="content">
                                                    {this.state.productDesc}
                                                </div>
                                            ) : (
                                                <div style={{marginBottom: "15px", textAlign: "justify"}} className="content">
                                                    <Skeleton width={60} />
                                                </div>
                                            )}
                                            <div>
                                                Created By:
                                            </div>
                                            {this.state.createdBy ? (
                                                <div>
                                                    {this.state.createdBy}
                                                </div>
                                            ) : (
                                                <div>
                                                    <Skeleton width={60} />
                                                </div>
                                            )}
                                                
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
                </SkeletonTheme>
                {/*================ End Course Details Area =================*/}
            </div>
        )
    }
}
export default Product_Detail;