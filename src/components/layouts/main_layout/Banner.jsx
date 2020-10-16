import React, { Component } from 'react'
import { Link} from 'react-scroll'
import { Redirect } from 'react-router-dom';
import WOW from "wow.js";

export default class Banner extends Component {
    state = {
      redirect: false
    }
    goToRegistrationPage = () => {
      this.setState({
        redirect: true
      })
    }
    renderRedirect = () => {
      if (this.state.redirect) {
        return <Redirect to='/registration-page' />
      }
    }
    componentDidMount() {
      const wow = new WOW();
      wow.init();
      return () => {
      };
    }
    render() {
      
        return (
            <div>
                {/* banner part start*/}
                <section className="banner_part wow fadeIn" id="home">
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-6 col-xl-6">
                        <div className="banner_text">
                        <div className="banner_text_iner">
                            <h5 className="wow slideInRight">easy pay, easy learn</h5>
                            <h1 className="wow fadeIn slow">Different School lifestyle</h1>
                            <p>OPSEKOLAH is a web-based application that can help your school's operations in the administration of payments using the "QRIS" method.</p>
                            <Link style={{color:"#fff"}} activeClass="active" to="products" spy={true} smooth={true} offset={-100} duration={500} className="btn_1 wow slideInUp">View Products </Link>
                            {this.renderRedirect()}
                            <div className="btn_2 wow slideInUp" onClick={this.goToRegistrationPage}>Get Started</div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                {/* banner part start*/}

            </div>
        )
    }
}
