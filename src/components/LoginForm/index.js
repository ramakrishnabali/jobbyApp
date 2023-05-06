import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

// import Header from '../Header'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', submissionStatus: false, errorMsg: ''}

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  successfulLogin = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({submissionStatus: true, errorMsg})
  }

  verifyUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.successfulLogin(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, submissionStatus, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <form onSubmit={this.verifyUser} className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label className="label" htmlFor="username">
            USERNAME
          </label>
          <input
            value={username}
            onChange={this.getUsername}
            placeholder="Username"
            className="input"
            id="username"
            type="text"
          />
          <label className="label" htmlFor="password">
            PASSWORD
          </label>
          <input
            value={password}
            onChange={this.getPassword}
            className="input"
            placeholder="Password"
            id="password"
            type="password"
          />
          <button className="login-button" type="submit">
            Login
          </button>
          {submissionStatus && <p className="error">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
