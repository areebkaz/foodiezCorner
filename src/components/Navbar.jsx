import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'

const Navbar = () => {
  const [cartView, setCartView] = useState(false)
  const [toggle, setToggle] = useState(false)
  let data = useCart()

  const navigate = useNavigate()
  const handleToggle = () => {
    setToggle(!toggle)
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userEmail')
    navigate('/login')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid logo-head">
          <Link className="navbar-brand fs-1 fst-italic logo-head" to="/">FoodiezCorner</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="myNavbar" onClick={handleToggle} aria-expanded={!toggle ? true : false} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${toggle ? 'collapse' : ''} navbar-collapse`} id="myNavbar">
            <ul className="navbar-nav me-auto " data-toggle="buttons">
              <li className="nav-item text-light">
                <Link className="nav-link fs-5 menuitems" aria-current="page" to="/">Home</Link>
              </li>
              {
                (localStorage.getItem("authToken")) ?
                  <li className="nav-item text-light">
                    <Link className="nav-link fs-5 menuitems" aria-current="page" to="/myorders">My Orders</Link>
                  </li>
                  : ''
              }
            </ul>
            {
              (!localStorage.getItem("authToken")) ?
                <div className='d-flex'>

                  <Link className="btn bg-secondary text-light mx-1 menuitems" to="/login">Login</Link>
                  <Link className="btn bg-secondary text-light mx-1 menuitems" to="/createuser">SignUp</Link>
                </div>
                :
                <div>
                  <div
                    className='btn bg-secondary text-white mx-2'
                    onClick={() => setCartView(true)}>
                    Cart {' '}
                    <div className={data.length === 0 ? 'cart-badge' : 'd-inline'}>
                      <Badge pill bg='danger'>{data.length}</Badge>
                    </div>
                  </div>
                  {
                    cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null
                  }
                  <div className='btn btn-danger text-white text-dark-focus mx-2' onClick={handleLogout}>
                    Logout
                  </div>
                </div>
            }
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar