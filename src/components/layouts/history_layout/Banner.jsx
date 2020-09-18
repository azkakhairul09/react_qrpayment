import React, { Component } from 'react'

class Banner extends Component {
    render() {
        return (
            <div>
                {/* breadcrumb start*/}
                <section className="wow fadeIn breadcrumb breadcrumb_bg">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb_iner text-center" style={{height: "256px"}}>
                        <div className="breadcrumb_iner_item" style={{verticalAlign: "bottom"}}>
                            <h2 className="wow slideInUp" style={{textTransform: "uppercase"}}>History</h2>
                            <p className="wow slideInDown">Home<span>/</span>History</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                {/* breadcrumb start*/}
            </div>
        )
    }
}
export default Banner;