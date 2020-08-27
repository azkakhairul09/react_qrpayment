import React, { Component } from "react";
import { Link } from "react-router-dom";

class Not_found extends Component {
  render() {
    return (
      <div>
        <div className="">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2" />
            </div>
          </section>
          <section className="content">
            <div className="error-page">
              <h2 className="headline text-warning"> 404</h2>
              <div className="error-content">
                <h3>
                  <i className="fas fa-exclamation-triangle text-warning" />{" "}
                  Oops! Page not found.
                </h3>
                <p>
                  We could not find the page you were looking for.
                  <br/>
                  <Link to="/payaja">
                    back to home page
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Not_found;