import Axios from "axios";
import React, { Component } from "react";
import Slider from "react-slick";

export default class CenterMode extends Component {
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
          console.log(res)
          this.setState ({
              products: response.data.content,
              loading: false
          })         
      })
      .catch((error) => {
        console.log(error)
        this.setState({
            loading: false,
            products: []
        })
      });
  }
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
            speed: 500,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            speed: 500,
            dots: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            speed: 500,
            dots: true
          }
        }
      ]
    };
    return (
          <Slider {...settings}>
            {this.state.products.map((product, i) => (
            <div className="wow slideInUp" key={i}>
            <div>
              <div className="single_special_cource" style={{border: "1px solid #edeff2", margin: "auto", maxWidth: "80%"}}>
                <img src={product.productImage} className="special_img" style={{margin: "auto", maxWidth:"85%", background:"#0000000d"}} alt="" />
                <div className="special_cource_text mt-3">
                  <div className="btn_4" style={{fontSize: "12px"}} onClick={() => this.detail(product.productId)}>DETAIL</div>
                  <div className="justify-content-between d-flex details mt-3" style={{color:"#888"}}>
                      <small>Price</small>
                      <small>Rp {product.price}</small>
                  </div>
                  {/* <a href="course-details.html">
                  <h3 style={{textTransform: "capitalize"}}>{product.productName}</h3>
                  </a> */}
                  <p>{product.productName}</p>
                  <span style={{fontSize: "12px", fontWeight: "bold"}}>{product.categorize}</span>
                </div>
              </div>
            </div>
            </div>
            ))}
          </Slider>
    );
  }
}