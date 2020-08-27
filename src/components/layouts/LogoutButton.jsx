import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

export default class Logout extends Component {
    state = {
        username: "",
        image: "",
        redirect: false
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
        this.setState ({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/payaja' />
        }
    }
    render() {
        return (
            <li className="nav-item dropdown" style={{borderLeft: "1px solid #000"}}>
                {this.renderRedirect()}
                <Link className="nav-link dropdown-toggle" to="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.username}
                </Link>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <div className="nav-link dropdown-item" onClick={this.logout}>LOGOUT</div>
                </div>
            </li>
        )
    }
}
