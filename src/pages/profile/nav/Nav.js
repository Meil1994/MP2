import React from 'react'
import './Nav.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../../photos/logo1.png'

function Nav() {
  return(
      <div className="container-fluid">
          <div className="row nav-row">
               <div className="col-md-4 logo">
                  <img src= {logo} alt="" />
               </div>

               <div className="col-md-4 nav-li">
                  <ul>
                      <li>HOME</li>
                      <li>
                      <NavDropdown
                          id="nav-dropdown-dark-example"
                          title="SHOP BY CATEGORY"
                          menuVariant="dark">
                              <NavDropdown.Item href="#action/3.1">For Men</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.2">For Women</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.3">For Kids</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.1">Shoes</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.2">Home Appliances</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.3">Cellphone</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.1">Computer and Laptop</NavDropdown.Item>
                      </NavDropdown>
                      </li>
                  </ul>
               </div>

               <div className="col-md-4 nav-social">
                  <ul>
                      <li><a href="sdas"><i class="fa-brands fa-facebook"></i></a></li>
                      <li><a href="sdas"><i class="fa-brands fa-instagram"></i></a></li>
                      <li><a href="sdas"><i class="fa-brands fa-twitter"></i></a></li>
                  </ul>
               </div>
          </div>
      </div>
  )
}

export default Nav