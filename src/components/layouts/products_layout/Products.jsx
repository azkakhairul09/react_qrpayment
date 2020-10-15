import React, { Component } from 'react'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
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
                        <Slider {...settings}>
                        {/* <div className="row justify-content-center"> */}
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
                                        {/* </div> */}
                        </Slider>
                    </div>
                </section>
                {/*::blog_part end::*/}

            </div>
        )
    }
}
export default Products;