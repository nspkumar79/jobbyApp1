import {Link, withRouter} from 'react-router-dom'
import {BsFillBagFill} from 'react-icons/bs'
import {AiFillHome} from 'react-icons/ai'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu-list-mobile">
            <li className="nav-menu-item-mobile">
              <Link to="/" className="nav-link">
                <AiFillHome className="nav-bar-image" />
              </Link>
            </li>

            <li className="nav-menu-item-mobile">
              <Link to="/jobs" className="nav-link">
                <BsFillBagFill className="nav-bar-image" />
              </Link>
            </li>
            <li className="nav-menu-item-mobile">
              <button type="button" className="nav-mobile-btn">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                  alt="nav logout"
                  className="nav-bar-image"
                  onClick={onClickLogout}
                />
              </button>
            </li>
          </ul>
        </div>
        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
