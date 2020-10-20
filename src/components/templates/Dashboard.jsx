import React, { Component } from 'react'
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {Bar} from 'react-chartjs-2';
import Header from './Header';
import { toast } from 'react-toastify';
import Axios from 'axios';
import CurrencyFormat from 'react-currency-format';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionsChartData: {},
      amountChartData: {},
      totalDailyTrx: "",
      totalDailyAmount: ""
    }
  }

    componentDidMount() {

    }

    componentWillMount() {
      this.getChartData();
    }

    getChartData() {
      if (localStorage.getItem('userData')) {
        const userData = localStorage.getItem('userData');
        let decoded = JSON.parse(userData);

        const urlWeeklyTrx = "http://localhost:8085/weekly_transactions"
        // const urlCreateQr = "https://qrispayments.herokuapp.com/invoice?" + Qs.stringify(param)
        // const urlWeeklyTrx = "https://bangomicroservices.site/bango-backend-dev/weekly_transactions"

        let trxDate = [];
        let trxTotal = [];
        let totalNominal = [];
        let dailyTrx = [];
        let dailyAmount = [];

        Axios.get(urlWeeklyTrx, {
            headers: {
                Authorization: decoded.token
            }
        })
        .then((response) => {
            let res = response.data.content

            for (const dataObj of res) {
              trxDate.push(dataObj.trxDate);
              trxTotal.push(parseInt(dataObj.trxTotal));
              totalNominal.push(parseInt(dataObj.totalNominal));
              dailyTrx.push(parseInt(dataObj.trxTotal));
              dailyAmount.push(parseInt(dataObj.totalNominal));
            }

            const totalTrx = dailyTrx.pop();
            const totalAmount = dailyAmount.pop();

            this.setState({
              totalDailyAmount: totalAmount,
              totalDailyTrx: totalTrx,
              transactionsChartData: {
                labels: trxDate,
                datasets: [
                  {
                    label: 'Transaction',
                    backgroundColor: 'rgba(0,123,255,0.2)',
                    borderColor: 'rgba(0,123,255,1)',
                    borderWidth: 2,
                    data: trxTotal
                  }
                ]
              },
              amountChartData: {
                labels: trxDate,
                datasets: [
                  {
                    label: 'Amount',
                    backgroundColor: 'rgba(0,123,255,0.2)',
                    borderColor: 'rgba(0,123,255,1)',
                    borderWidth: 2,
                    data: totalNominal
                  }
                ]
              }
            })
        })
        .catch((error) => {
          console.log(error)
            if (error.response.status) {
                if (error.response.status === 403) {
                    toast.info('access expired, please login again', 
                    {
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: true,
                        className: "custom-toast",
                        autoClose: 2000,
                    })
                    localStorage.clear()
                    this.setState({
                        isLoggedin: false
                    })
                }
            } else {
                this.setState({
                    error: true
                })
            }
        });
      }      
    }
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
                              <span className="info-box-text">Daily Transaction</span>
                              <span className="info-box-number">
                                <div className="justify-content-between d-flex">
                                  <small> IDR </small>
                                  <span> 
                                    {this.state.totalDailyAmount ? <CurrencyFormat value={this.state.totalDailyAmount} displayType={'text'} thousandSeparator={true} prefix={''} />
                                     : 
                                    <Skeleton width={60}/>}
                                  </span>
                                </div> 
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
                                Total Transaction
                              </span>
                              <span className="info-box-number">
                              <div className="justify-content-between d-flex">
                                  <small>  </small>
                                  <span> 
                                    {this.state.totalDailyTrx ? <div>{this.state.totalDailyTrx}</div>
                                     : 
                                    <Skeleton width={60}/>}
                                  </span>
                                </div> 
                              </span>
                            </div>
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                      </div>
                      {/* /.row */}
                      <div className="row mt-3 mb-5">
                        <div className="col-md-12">
                          <div className="bor-bottom" style={{background: "#00000012", width: "100%"}}></div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-6 col-md-6">
                          <div className="mb-3">
                            <Bar
                              data={this.state.transactionsChartData}
                              options={{
                                title:{
                                  display:true,
                                  text:'Total Transaction',
                                  fontSize:20
                                },
                                legend:{
                                  display:false,
                                  position:'right'
                                }
                              }}
                            />
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                        <div className="col-12 col-sm-6 col-md-6">
                          <div className="mb-3">
                            <Bar
                              data={this.state.amountChartData}
                              options={{
                                title:{
                                  display:true,
                                  text:'Total Amount (Rp)',
                                  fontSize:20
                                },
                                legend:{
                                  display:false,
                                  position:'right'
                                }
                              }}
                            />
                            {/* /.info-box-content */}
                          </div>
                          {/* /.info-box */}
                        </div>
                        {/* /.col */}
                      </div>
                      {/* /.row */}
                      {/* Info boxes */}
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