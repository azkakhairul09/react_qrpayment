import React, { Component } from 'react'
import { Link} from 'react-scroll'
import { Redirect } from 'react-router-dom';

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
    render() {
        return (
            <div>
                {/* banner part start*/}
                <section className="banner_part" id="home">
                <div className="container">
                    <div className="row align-items-center">
                    <div className="col-lg-6 col-xl-6">
                        <div className="banner_text">
                        <div className="banner_text_iner">
                            <h5>Every child yearns to learn</h5>
                            <h1>Making Your Childs
                            World Better</h1>
                            <p>Replenish seasons may male hath fruit beast were seas saw you arrie said man beast whales
                            his void unto last session for bite. Set have great you'll male grass yielding yielding
                            man</p>
                            <Link style={{color:"#fff"}} activeClass="active" to="products" spy={true} smooth={true} offset={-100} duration={500} className="btn_1">View Products </Link>
                            {this.renderRedirect()}
                            <div className="btn_2" onClick={this.goToRegistrationPage}>Get Started</div>
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
