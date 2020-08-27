import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Header from './Header';

class Dashboard extends Component {
    render() {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        if (decoded.role !== "Administrator") {
          this.props.history.push('payaja')
        }
        return (
            <div>
                <Sidebar />
                <Navbar />
                <SkeletonTheme color="#6e6b6b" highlightColor="#fff">
                <div className="content-wrapper">
                  <Header />
                  {/* Main content */}
                  <section className="content">
                    <div className="container-fluid">
                      {/* Info boxes */}
                      <div className="row">
                        <div className="col-12 col-sm-6 col-md-3">
                          <div className="info-box">
                            <span className="info-box-icon bg-dark elevation-1">
                              <i className="fas fa-qrcode" />
                            </span>
                            <div className="info-box-content">
                              <span className="info-box-text">QR Transaction</span>
                              <span className="info-box-number">
                                {/* {total.amount ? <NumberFormat
                                  value={total.amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                /> : <Skeleton width={60}/>} */}
                                <small> IDR</small>
                              </span>
                            </div>
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-sm-6 col-md-3">
                          <div className="info-box mb-3">
                            <span className="info-box-icon bg-dark elevation-1">
                              <i className="fas fa-handshake" />
                            </span>
                            <div className="info-box-content">
                              <span className="info-box-text">
                                QR Settled Transaction
                              </span>
                              <span className="info-box-number">
                                {/* {total.settled_amount ? <NumberFormat
                                  value={total.settled_amount}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                /> : <Skeleton width={60}/>} */}
                                <small> IDR</small>
                              </span>
                            </div>
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        {/* fix for small devices only */}
                        <div className="clearfix hidden-md-up" />
                        <div className="col-12 col-sm-6 col-md-3">
                          <div className="info-box mb-3">
                            <span className="info-box-icon bg-dark elevation-1">
                              <i className="fas fa-credit-card" />
                            </span>
                            <div className="info-box-content">
                              <span className="info-box-text">Withdrawl Transaction</span>
                              <span className="info-box-number">
                                {/* {total.withdrawl ? <NumberFormat
                                  value={total.withdrawl}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                /> : <Skeleton width={60}/>} */}
                                <small> IDR</small>
                              </span>
                            </div>
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-sm-6 col-md-3">
                          <div className="info-box mb-3">
                            <span className="info-box-icon bg-dark elevation-1">
                              <i className="fas fa-calculator" />
                            </span>
                            <div className="info-box-content">
                              <span className="info-box-text">Balance</span>
                              <span className="info-box-number">
                                {/* {total.saldo ? <NumberFormat
                                  value={total.saldo}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                /> : <Skeleton width={60}/>} */}
                                <small> IDR</small>
                              </span>
                            </div>
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                      </div>
                      {/* /.row */}
                      {/* Info boxes */}
                      <div className="row">
                        <div className="col-12 col-sm-6 col-md-3">
                          <div className="info-box">
                            <span className="info-box-icon bg-dark elevation-1">
                              <i className="fas fa-poll" />
                            </span>
                            <div className="info-box-content">
                              <span className="info-box-text">Transaction Success</span>
                              <span className="info-box-number">
                                  {/* {total.transaction || <Skeleton width={60}/>} */}
                              </span>
                            </div>
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        {/* fix for small devices only */}
                        <div className="clearfix hidden-md-up" />
                        <div className="col-12 col-sm-6 col-md-3">
                          <div className="info-box mb-3">
                            <span className="info-box-icon bg-dark elevation-1">
                              <i className="fas fa-poll" />
                            </span>
                            <div className="info-box-content">
                              <span className="info-box-text">Withdrawl Success</span>
                              <span className="info-box-number">
                                {/* {total.transaction_fee || <Skeleton width={60}/>} */}
                              </span>
                            </div>
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-sm-6 col-md-3">
                          <div className="info-box mb-3">
                            <span className="info-box-icon bg-dark elevation-1">
                              <i className="fas fa-calculator" />
                            </span>
                            <div className="info-box-content">
                              <span className="info-box-text">Pending Balance</span>
                              <span className="info-box-number">
                                {/* {total.pending_balance ? <NumberFormat
                                  value={total.pending_balance}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                /> : <Skeleton width={60}/>} */}
                                <small> IDR</small>
                              </span>
                            </div>
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-sm-6 col-md-3">
                          <div className="info-box mb-3">
                            <span className="info-box-icon bg-dark elevation-1">
                              <i className="fas fa-calculator" />
                            </span>
                            <div className="info-box-content">
                              <span className="info-box-text">Balance</span>
                              <span className="info-box-number">
                                {/* {total.real_balance ? <NumberFormat
                                  value={total.real_balance}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                /> : <Skeleton width={60}/> } */}
                                <small> IDR</small>
                              </span>
                            </div>
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                      </div>
                      {/* /.row */}
                    </div>
                    {/*/. container-fluid */}
                  </section>
                  {/* /.content */}
                </div>
                </SkeletonTheme>
                {/* /.content-wrapper */}
                <Footer />
            </div>
        )
    }
}
export default Dashboard;