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
                            <h5 className="wow slideInRight">Every child yearns to learn</h5>
                            <h1 className="wow fadeIn slow">Making Your Childs
                            World Better</h1>
                            <p>Replenish seasons may male hath fruit beast were seas saw you arrie said man beast whales
                            his void unto last session for bite. Set have great you'll male grass yielding yielding
                            man</p>
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
