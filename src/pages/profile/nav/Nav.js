import React from 'react'
import './Nav.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../../photos/logo1.png'
import { useNavigate} from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

function Nav() {
    const navigate=useNavigate();

    const LoadStore = () => {
        navigate("/storeitems")
      }

    const LoadCart = () => {
        navigate("/cart")
      }

  return(
      <div className="container-fluid">
          <div className="row nav-row">
               <div className="col-md-6 logo">
                  <img src= {logo} alt="" />
               </div>

               <div className="col-md-6 nav-social">
                  <ul>
                     <li onClick={LoadStore}>HOME</li>
                      <li><a href="sdas"><i class="fa-brands fa-facebook"></i></a></li>
                      <li><a href="sdas"><i class="fa-brands fa-instagram"></i></a></li>
                      <li><TiShoppingCart onClick={LoadCart} className='shopping-cart'/></li>
                  </ul>
               </div>
          </div>
      </div>
  )
}

export default Nav