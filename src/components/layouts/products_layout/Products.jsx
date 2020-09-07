import React, { Component } from 'react'
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Products extends Component {
    state = {
        loading: true,
        products: [],
        redirect: false
    }

    componentDidMount() {
        // const urlGetProducts = "http://localhost:8085/sangbango-microservices/payment/v1/product/all"
        const urlGetProducts = "https://qrispayments.herokuapp.com/product/all"
        
        Axios.get(urlGetProducts, {
            headers: {
            }
        })
        .then((response) => {
            let res = response.data;
            this.setState ({
                products: response.data.content,
                loading: false
            })         
        })
        .catch((error) => {
          this.setState({
              loading: false,
              products: []
          })
        });
    }

    detail = (productId) => {
        this.setState({
            redirect: true
        })
        localStorage.productId = productId
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/detail_product' />
        }
    }
    refresh = () => {
        window.location.reload(false)
    }

    render() {
        if (this.state.loading) {
            return <section className="special_cource padding_top">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-5">
                                    <div className="section_tittle text-center">
                                        <h2 className="wow fadeIn">Products</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div style={{textAlign:"center"}}>
                                    <img src={require('../../img/loader.gif')} alt="loader"/>
                                </div>
                            </div>
                        </div>
                    </section>
        }

        if (!this.state.products.length) {
            return  <section className="special_cource padding_top">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div style={{textAlign:"center"}}>
                                    <img src={require('../../img/confuse.jpg')} alt="confuse"/>
                                    <h5>Sorry! Something went wrong...</h5>
                                    <div className="btn_4 mb-1" onClick={(this.refresh)}>Try Again</div>
                                    <div>
                                        <span>If that doesn't work, contact me!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
        }
        return (
            <div>
                {/*::review_part start::*/}
                <section className="special_cource padding_top">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-5">
                                <div className="section_tittle text-center">
                                <h2 className="wow fadeIn">Products</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            {this.state.products.map((product, i) => (
                            <div className="wow slideInUp col-sm-4 col-lg-3 mb-5" key={i}>
                                <div className="single_special_cource" style={{border: "1px solid #edeff2"}}>
                                <img src={product.productImage} className="special_img" style={{background:"#0000000d"}} alt="" />
                                    <div className="special_cource_text">
                                        {this.renderRedirect()}
                                        <div className="btn_4" onClick={() => this.detail(product.productId)}>DETAIL</div>
                                        <h4>Rp {product.price}</h4>
                                        {/* <a href="course-details.html">
                                        <h3 style={{textTransform: "capitalize"}}>{product.productName}</h3>
                                        </a> */}
                                        <p>{product.productName}</p>
                                        <div className="author_info">
                                            <div className="author_img">
                                            <div className="author_info_text">
                                            <p>Created by:</p>
                                            <h5><Link to="#">{product.createdBy}</Link></h5>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>
                {/*::blog_part end::*/}

            </div>
        )
    }
}
export default Products;