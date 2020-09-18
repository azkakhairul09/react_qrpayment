import React, { Component } from 'react';
import "./Register.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import Qs from "query-string";
import { toast } from 'react-toastify';

class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            phone: "",
            email: "",
            password: "",
            confirm_password: "",
            fullAddress: "",
            province: "",
            city: "",
            subDistrict: "",
            village: "",
            postalCode: "",
            isLoading: false,
            isShow: true
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            isLoading: true
        })

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };

        const roleParameter = {
            roleId: "RL-71"
        };

        // const urlRegistration =
        // "http://localhost:8085/sangbango-microservices/payment/v1/registration?";
        const urlRegistration =
        "https://qrispayments.herokuapp.com/registration?";

        const registration = {
            name: this.state.name,
            phoneNumber: this.state.phone,
            email: this.state.email,
            password: this.state.password,
            address:
            {
                fullAddress: this.state.fullAddress,
                province: this.state.province,
                city: this.state.city,
                subDistrict: this.state.subDistrict,
                village: this.state.village,
                postalCode: this.state.postalCode
            }
        }

        axios.post(urlRegistration+Qs.stringify(roleParameter), registration, headers)
        .then((response) => {
            toast.info('registration success ', 
            {
              position: toast.POSITION.TOP_CENTER,
              hideProgressBar: true,
              className: "custom-toast",
              autoClose: 2000,
            })
            this.setState({
                isLoading: false
            })
            this.props.history.push("/login");
        })
        .catch((error) => {
            console.log(error.response.data);
            this.setState({
                isLoading: false
            })
        });
    }

    hideRegister = () => {
        this.setState({
            isShow: false
        })
    }
    hideAddress = () => {
        this.setState({
            isShow: true
        })
    }

    render() {
        // function hideRegister(e) {
        //     // get the registerForm
        //     var registerForm = document.getElementById('register-form');
        //     var addressForm = document.getElementById('address-form');
            
        //     // registerForm is visible. hide it
        //     registerForm.style.display = 'none';
        //     addressForm.style.display = 'block';
        //     addressForm.className += " animated fadeInRight faster";
        // }

        // function hideAddress(e) {
        //     // get the addressForm
        //     var registerForm = document.getElementById('register-form');
        //     var addressForm = document.getElementById('address-form');
            
        //     // addressForm is visible. hide it
        //     registerForm.style.display = 'block';
        //     addressForm.style.display = 'none';
        //     registerForm.className += " animated fadeInLeft faster";
        // }
        if (localStorage.getItem('userData')) {
            this.props.history.push("/payaja")
        }
        return (
            <div>
                <div className="page-content">
                    <div className="form-v4-content">
                        <div className="form-left">
                            <h2>INFOMATION</h2>
                            <div className="border-bot"></div>
                            <p className="text-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et molestie ac feugiat sed. Diam volutpat commodo.</p>
                            <p className="text-2"><span>Eu ultrices:</span> Vitae auctor eu augue ut. Malesuada nunc vel risus commodo viverra. Praesent elementum facilisis leo vel.</p>
                            <div className="form-left-last">
                                <p>Have an account ? please <Link to="/login" className="login-link">sign in</Link></p>
                            </div>
                        </div>
                        <div className="form-detail">
                        <form onSubmit={this.onSubmit} id="myform">
                            <div id="register-form">
                                {this.state.isShow ? (
                                    <div>
                                        <span>REGISTER FORM</span>
                                        <div className="border-bot-black"></div>
        
                                        <div className="form-group">
                                            <div className="form-row form-row-1">
                                                <label htmlFor="name">John Doe</label>
                                                <input type="text" name="name" id="name" placeholder="Your Name" className="input-text" value={this.state.name} onChange={this.onChange} required />
                                            </div>
                                            <div className="form-row form-row-1">
                                                <label htmlFor="phone">080012312312</label>
                                                <input type="text" name="phone" id="phone" placeholder="Phone Number" className="input-text" value={this.state.phone} onChange={this.onChange} required />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="email">john.doe@example.com</label>
                                            <input type="text" name="email" id="email" className="input-text" placeholder="Email Address" value={this.state.email} onChange={this.onChange} required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" />
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row form-row-1 ">
                                                <label htmlFor="password">Password</label>
                                                <input type="password" name="password" id="password" className="input-text" value={this.state.password} placeholder="Password" onChange={this.onChange} required />
                                            </div>
                                            <div className="form-row form-row-1">
                                                <label htmlFor="comfirm-password">Confirm Password</label>
                                                <input type="password" name="confirm_password" id="confirm_password" className="input-text" value={this.state.confirm_password} placeholder="Confirm Password" onChange={this.onChange} required />
                                            </div>
                                        </div>
                                        <div className="form-row-last" style={{textAlign:"right"}}>
                                            <span onClick={this.hideRegister} className="next">Next<i className="far fa-arrow-alt-circle-right"></i></span>                                                        
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <span>ADDRESS FORM</span>
                                        <div className="border-bot-black"></div>

                                        <div className="form-row">
                                            <label htmlFor="fullAddress">Address</label>
                                            <input type="text" name="fullAddress" id="fullAddress" className="input-text" placeholder="Your Address" value={this.state.fullAddress} onChange={this.onChange} required />
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row form-row-1">
                                                <label htmlFor="province">Province</label>
                                                <input type="text" name="province" id="province" placeholder="Province" className="input-text" value={this.state.province} onChange={this.onChange} required />
                                            </div>
                                            <div className="form-row form-row-1">
                                                <label htmlFor="city">City</label>
                                                <input type="text" name="city" id="city" placeholder="City" className="input-text" value={this.state.city} onChange={this.onChange} required />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="subDistrict">Sub District</label>
                                            <input type="text" name="subDistrict" id="subDistrict" className="input-text" placeholder="Sub District" value={this.state.subDistrict} onChange={this.onChange} required />
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row form-row-1 ">
                                                <label htmlFor="village">Village</label>
                                                <input type="text" name="village" id="village" className="input-text" placeholder="Village" value={this.state.village} onChange={this.onChange} required />
                                            </div>
                                            <div className="form-row form-row-1">
                                                <label htmlFor="postalCode">Postal Code</label>
                                                <input type="text" name="postalCode" id="postalCode" className="input-text" placeholder="Postal Code" value={this.state.postalCode} onChange={this.onChange} required />
                                            </div>
                                        </div>
                                        <div className="form-row-last">
                                            <div className="media-body mb-4">
                                                <div className="justify-content-between d-flex details" style={{margin:"auto"}}>
                                                    <span onClick={this.hideAddress} className="before"><i className="far fa-arrow-alt-circle-left"></i>Before</span>
                                                    <button disabled={this.state.isLoading} type="submit" name="register" className="register text-uppercase">register</button>
                                                </div>
                                            </div>                                    
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div id="address-form" style={{display:"none", height: "fit-content"}}>
                                
                                
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;