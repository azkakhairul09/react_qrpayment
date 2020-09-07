import React, { Component } from 'react'
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Someproducts extends Component {
    state = {
        loading: true,
        someproducts: [],
        redirect: false,
        error: false
    }

    componentDidMount() {
        // const urlGetSomeProducts = "http://localhost:8085/sangbango-microservices/payment/v1/product/someproducts"
        const urlGetSomeProducts = "https://qrispayments.herokuapp.com/product/someproducts"

        Axios.get(urlGetSomeProducts, {
            headers: {
            }
        })
        .then((response) => {
            this.setState ({
                someproducts: response.data.content,
                loading: false
            })      
        })
        .catch((error) => {
            console.log(error)
          this.setState({
              loading: false,
              error: true
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
            return <section className="special_cource" name="products" id="products">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-5">
                                    <div className="section_tittle text-center">
                                        <p className="wow fadeIn">Products</p>
                                        <h2 className="wow fadeIn">Newest Products</h2> 
                                    </div>
                                </div>
                            </div>
                            <div className="row mb-5 justify-content-center">
                                <div style={{textAlign:"center"}}>
                                    <img src={require('../../img/loader.gif')} alt="loader"/>
                                </div>
                            </div>
                        </div>
                    </section>  
        }

        if (this.state.error) {
            return  <section className="special_cource" name="products" id="products">
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

        // {this.refresh}
        return (
            <div>
                {/*::review_part start::*/}
                <section className="special_cource" name="products" id="products">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5">
                            <div className="section_tittle text-center">
                                <p className="wow fadeIn">Products</p>
                                <h2 className="wow fadeIn">Newest Products</h2>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row mb-5 justify-content-center">
                        {this.state.someproducts.map((product, i) => (
                            <div className="col-sm-6 col-lg-4 wow slideInUp" key={i}>
                                <div className="single_special_cource" style={{border: "1px solid #edeff2"}}>
                                <img src={product.productImage} className="special_img" style={{background:"#0000000d"}} alt="" />
                                <div className="special_cource_text">
                                    {this.renderRedirect()}
                                    <div className="btn_4" onClick={() => this.detail(product.productId)}>DETAIL</div>
                                    <h4>Rp {product.price}</h4>
                                    {/* <Link to="course-details.html"><h3>{product.productName}</h3></Link> */}
                                    <p>{product.productName}</p>
                                    <div className="author_info">
                                    <div className="author_img">
                                        <div className="author_info_text">
                                        <span>Created by:</span>
                                        <h5><Link to="#">{product.createdBy}</Link></h5>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="row justify-content-center">
                        <Link to="/products" className="btn_4 wow zoomIn">Read More</Link>
                    </div>
                </div>
                </section>
                {/*::blog_part end::*/}

            </div>
        )
    }
}
export default Someproducts;