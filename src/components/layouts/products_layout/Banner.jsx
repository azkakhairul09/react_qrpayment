import React, { Component } from 'react'

class Banner extends Component {
    render() {
        return (
            <div>
                {/* breadcrumb start*/}
                <section className="breadcrumb breadcrumb_bg">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb_iner text-center">
                        <div className="breadcrumb_iner_item">
                            <h2 style={{textTransform: "uppercase"}}>Our Products</h2>
                            <p>Home<span>/</span>Products</p>
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