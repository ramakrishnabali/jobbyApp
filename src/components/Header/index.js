import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {RiHome4Fill} from 'react-icons/ri'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <ul className="header-container">
      <li className="list-container">
        <Link to="/">
          <button type="button" className="header-image-button">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </button>
        </Link>
      </li>
      <li className="list-view-container">
        <Link to="/" className="nav-list">
          <p>Home</p>
        </Link>
        <Link to="/jobs" className="nav-list">
          <p>Jobs</p>
        </Link>
      </li>
      <li className="list-container-logout">
        <button onClick={onClickLogout} className="logout-button" type="button">
          Logout
        </button>
      </li>

      <li className="list-mobile-view">
        <Link to="/" className="react-icon">
          <RiHome4Fill />
        </Link>
        <Link to="/jobs" className="react-icon">
          <BsBriefcaseFill />
        </Link>
        <button
          onClick={onClickLogout}
          type="button"
          className="logout-image-button"
        >
          <FiLogOut className="react-icon" />
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)
