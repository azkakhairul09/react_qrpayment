import React, { Component } from 'react'
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Slider from "react-slick";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SampleNoneArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none" }}
        onClick={onClick}
      />
    );
  }

class Products extends Component {
    state = {
        loading: true,
        products: [],
        redirect: false
    }

    componentDidMount() {
        // const urlGetProducts = "http://localhost:8085/sangbango-microservices/payment/v1/product/all"
        // const urlGetProducts = "https://qrispayments.herokuapp.com/product/all"
        const urlGetProducts = "https://bangomicroservices.site/bango-backend-dev/product/all"
        
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

        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                  infinite: true,
                  speed: 500,
                  dots: true,
                  nextArrow: <SampleNextArrow />,
                  prevArrow: <SamplePrevArrow />,
                }
              },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  speed: 500,
                  dots: true,
                  nextArrow: <SampleNextArrow />,
                  prevArrow: <SamplePrevArrow />,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                  speed: 500,
                  dots: true,
                  nextArrow: <SampleNoneArrow />,
                  prevArrow: <SampleNoneArrow />,
                }
              }
            ]
          };
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
                        <div className="row mb-5 justify-content-center">
                        {this.state.products.map((product, i) => (
                            <div className="col-xl-3 col-sm-6 col-lg-4 col-md-4 col-xs-12 wow slideInUp" key={i}>
                                <div className="single_special_cource" style={{border: "1px solid #edeff2"}}>
                                {product.productImage ? (
                                    <img src={product.productImage} className="special_img" style={{background:"#0000000d"}} alt="" />
                                ) : (
                                    <img src={require('../../img/loader.gif')} className="special_img" alt="loader"/>
                                )}
                                
                                    <div className="special_cource_text">
                                        {this.renderRedirect()}
                                        <div className="btn_4 smallifsmall" onClick={() => this.detail(product.productId)}>DETAIL</div>
                                        <h4>Rp {product.price}</h4>
                                        {/* <div className="mt-1 mb-1" style={{borderBottom: "1px solid #000"}}></div> */}
                                        {/* <Link to="course-details.html"><h3>{product.productName}</h3></Link> */}
                                        <h5 className="mb-0 mt-2 ellipsis smallifsmall">{product.productName}</h5>
                                        <div className="bor-bottom mb-1" style={{width: "1rem"}}></div>
                                        <small>Deskripsi:</small>
                                        <br/>
                                        <p className="ellipsisbig">{product.productDesc}</p>
                                        <div className="author_info mt-0">
                                        <div className="author_img">
                                            <div className="author_info_text">
                                                <p>by: <Link to="#">{product.createdBy}</Link></p>
                                                
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                        {/* <Slider {...settings}>                        
                            {this.state.products.map((product, i) => (
                            <div className="wow slideInUp p1" key={i}>
                            <div className="single_special_cource" style={{border: "1px solid #edeff2"}}>
                                <img src={product.productImage} className="special_img" style={{background:"#0000000d"}} alt="" />
                                <div className="special_cource_text mt-3">
                                    {this.renderRedirect()}
                                    <div className="btn_4" onClick={() => this.detail(product.productId)}>DETAIL</div>
                                    <div className="justify-content-between d-flex details mt-3" style={{color:"#888"}}>
                                        <span>Price</span>
                                        <span>Rp {product.price}</span>
                                    </div>
                                    <p style={{color:"#212529"}}>{product.productName}</p>
                                    <span style={{fontSize: "12px"}}>by: {product.createdBy}</span>
                                </div>
                            </div>
                            </div>
                            ))}
                        </Slider> */}
                    </div>
                </section>
                {/*::blog_part end::*/}

            </div>
        )
    }
}
export default Products;