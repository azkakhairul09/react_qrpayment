import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LoginButton extends Component {
    render() {
        return (
            <li className="nav-item">
                <Link className="btn_1 no_margin" to='/login'>LOGIN</Link>
            </li>
        )
    }
}
