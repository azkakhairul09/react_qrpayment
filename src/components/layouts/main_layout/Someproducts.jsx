import React, { Component } from 'react'
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class Someproducts extends Component {
    state = {
        loading: true,
        someproducts: [],
        redirect: false
    }

    componentDidMount() {
        const urlGetSomeProducts = "http://localhost:8085/sangbango-microservices/payment/v1/product/someproducts"

        Axios.get(urlGetSomeProducts, {
            headers: {
            }
        })
        .then((response) => {
            let res = response.data;
            console.log(res);
            this.setState ({
                someproducts: response.data.content,
                loading: false
            })         
        })
        .catch((error) => {
          console.log(error.response.data);
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
          return <Redirect to='/products/detail' />
        }
    }
    render() {
        if (this.state.loading) {
            return <div>Loading ...</div>
        }

        if (!this.state.someproducts) {
            return <div>didn't get products</div>
        }
        return (
            <div>
                {/*::review_part start::*/}
                <section className="special_cource" name="products" id="products">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5">
                            <div className="section_tittle text-center">
                                <p>popular courses</p>
                                <h2>Special Courses</h2>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row mb-5">
                    {this.state.someproducts.map((product, i) => (
                    <div className="col-sm-6 col-lg-4" key={i}>
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
                    <Link to="/products" className="btn_4">Read More</Link>
                    </div>
                </div>
                </section>
                {/*::blog_part end::*/}

            </div>
        )
    }
}
export default Someproducts;