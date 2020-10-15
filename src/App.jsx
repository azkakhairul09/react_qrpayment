import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom"
import Register from './components/akses/Register';
import Dashboard from './components/templates/Dashboard';
import Product from './components/templates/Product';
import ProductForm from './components/templates/ProductForm';
import Transaction from './components/templates/Transaction';
import Main_Layout from './components/layouts/main_layout/Main_Layout';
import Products_Layout from './components/layouts/products_layout/Products_Layout';
import Axios from 'axios';
import Products_Detail from './components/layouts/products_layout/details_layout/Detail_Layout';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/akses/Login.css";
import Transaction_Status from './components/layouts/transaction_layout/Transaction_Status';
import Transaction_History from './components/layouts/history_layout/Transaction_History';
import HelloWorld from './components/layouts/transaction_layout/HelloWorld';
import Not_found from './Not_Found';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Print_Transaction from './components/layouts/history_layout/Print_Transaction';

// Authentication Initializing
const fakeAuth = {
  isAdministrator: false,
  authenticate(cb) {
    const userData = localStorage.getItem('userData');
    let decoded = JSON.parse(userData);
    if (decoded.role === "Administrator") 
    {
      this.isAdministrator = true  
    }
    else 
    {
      this.isAdministrator = false
    }
    setTimeout(cb, 100) // fake async
  },
  logout(cb) {
    this.isAdministrator = false
    setTimeout(cb, 100)
  }
}

// Login Class
class Login extends Component {
  constructor(props) {
      super(props);

      this.state = {
          email: "",
          password: "",
          redirectToReferrer: false  ,     
      };

      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    isDisabled: false  
  }
  onChange(e) {
      this.setState({ [e.target.name]: e.target.value});
      // const { id, value } = e.target;
      // this.setState({
      //   ...this.state,
      //   [id]: value,
      // });
  }

  onSubmit(e) {
      e.preventDefault();
      this.setState({
        isDisabled: true
      })
      const headers = {
          "Accept": "application/json",
          "Content-Type": "application/json",
      };

      // const urlLogin =
      // "http://localhost:8085/sangbango-microservices/payment/v1/login";
      // const url = "https://qrispayments.herokuapp.com/login"
      const url = "https://bangomicroservices.site/bango-backend-dev/login"

      const data = {
          email: e.target.elements.email.value,
          password: e.target.elements.password.value
      }

      Axios.post(url, data, headers)
      .then((response) => {
          let res = response.data;
          localStorage.setItem('userData', JSON.stringify(res))
          if (res.role === "Administrator") {
            fakeAuth.authenticate(() => {
              this.setState({
                redirectToReferrer: true 
              })
            })
            toast.info('welcome ', 
            {
              position: toast.POSITION.TOP_CENTER,
              hideProgressBar: true,
              className: "custom-toast",
              autoClose: 2000,
            })
            this.props.history.push("/dashboard");
          } else {
            fakeAuth.authenticate(() => {
              this.setState({
                redirectToReferrer: true 
              })
            })
            toast.info('welcome ', 
            {
              position: toast.POSITION.TOP_CENTER,
              hideProgressBar: true,
              className: "custom-toast",
              autoClose: 2000,
            })
            this.props.history.push("/payaja");
          }
      })
      .catch((error) => {
        this.setState({
          isDisabled: false
        })
        toast.info("username or password is not valid.", 
          {
            position: toast.POSITION.TOP_CENTER,
            hideProgressBar: true,
            className: "custom-toast",
            autoClose: 2000,
          })
      });
  }
  render() {
      if (localStorage.getItem('userData')) {
        this.props.history.push("/payaja")
      }
      return (
          <div className="login-content">
              <div className="login-reg-panel">
                  <div className="register-info-box">
                      <h5>Don't have an account?</h5>
                      <p className="mb-5">Please click the following button</p>
                      <Link to="/registration-page" className="register-button text-uppercase">Register</Link>
                  </div>
                  <div className="white-panel">
                  <form onSubmit={this.onSubmit}>
                      <div className="login-show">
                      <h2>LOGIN</h2>
                      <input type="text" name="email" id="email" placeholder="Email Address" value={this.state.email} onChange={this.onChange} required />
                      <input type="password" name="password" id="password" value={this.state.password} onChange={this.onChange} placeholder="Password" required />
                      <Link to="">Forgot password ?</Link>
                      <br/>
                      {this.state.isDisabled ? (
                        <button type="submit" name="login" className="login-button text-uppercase" style={{cursor:"not-allowed"}} disabled>login</button>
                      ) : (
                        <button type="submit" name="login" className="login-button text-uppercase">login</button>
                      )}
                      
                      </div>
                  </form>
                  </div>
              </div>
          </div>
      )
  }
}

// Logout Class
class Logout extends Component {
  state = {
    username: "",
    image: "",
    redirectToReferrer: false
  }
  componentDidMount() {
      const userData = localStorage.getItem('userData');
      let decoded = JSON.parse(userData);
      this.setState({
          username: decoded.name,
          image: decoded.userImage
      })
  }

  logout = () => {
      localStorage.clear()
      toast.info('good bye', 
            {
              position: toast.POSITION.TOP_CENTER,
              hideProgressBar: true,
              className: "custom-toast",
              autoClose: 2000,
            })
      window.location.reload(false);
      fakeAuth.logout(() => {
        this.setState({
          redirectToReferrer: true 
        })
      })
  }
  render() {
      return (
          <div>
              <li className="nav-item dropdown" style={{borderLeft: "1px solid #000"}}>
                  <Link className="nav-link dropdown-toggle" to="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      {this.state.username}
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <div className="nav-link dropdown-item" onClick={this.logout}>LOGOUT</div>
                  </div>
              </li>
          </div>
      )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => ( 
  <Route {...rest} render= {(props) => (
    localStorage.getItem('userData')
    ? <Component {...props} />
    : <Redirect
      to={{
      pathname: '/payaja',
      state: {from: props.location}
      }} 
      />
  )}/>
)

toast.configure()
class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
              <Route path="/" exact component={Main_Layout} />
              <Route path="/payaja" exact component={Main_Layout} />
              <Route path="/products" exact component={Products_Layout} />
              <Route path="/detail_product" exact component={Products_Detail} />
              <PrivateRoute path="/transactionstatus" exact component={Transaction_Status} />
              <PrivateRoute path="/history" exact component={Transaction_History} />
              <PrivateRoute path="/invoice_to_pdf" exact component={Print_Transaction} />
              <PrivateRoute path="/dashboard" exact component={Dashboard} />
              <PrivateRoute path="/product" exact component={Product} />
              <PrivateRoute path="/product_form" exact component={ProductForm} />
              <PrivateRoute path="/transactions" exact component={Transaction} />
              <Route path="/registration-page" exact component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/hello" exact component={HelloWorld} />
              <Route path = "*" exact component = { Not_found } />
          </Switch>
        </Router>
    );
  }
}

export {
  App,
  Logout
}
