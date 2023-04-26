import { useEffect, useState } from "react"
import './Store.css'
import { Link } from "react-router-dom";
import logo from '../../../src/photos/logo1.png'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate} from "react-router-dom";

const Store = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate=useNavigate();

    const LoadCart = () => {
        navigate("/cart")
      }

    const LoadProfile = () => {
        navigate("/profile")
      }

    const LoadbID = () => {
        navigate("/bid")
      }

    useEffect(() => {
        fetch("http://localhost:3300/storeitems").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    const handleSubmit = (item) => {
        const empdata = { icon: item.icon, title: item.title, seller: item.seller, price: item.price };

        fetch("http://localhost:3600/cart", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
            alert('Item Added to Cart Successfully!')
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div className="container-fluid">
            <div className="row dashboard-nav">
                <div className="col-lg-3 dash-logo">
                    <img src={logo}/>
                </div>
                <div className="col-lg-5 dash-ul">
                    <ul>
                      
                      <li>
                      <NavDropdown
                          id="nav-dropdown-dark-example"
                          title="SHOP BY CATEGORY"
                          menuVariant="dark">
                              <NavDropdown.Item href="#action/3.1">For Men</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.2">For Women</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.3">For Kids</NavDropdown.Item>
                              <NavDropdown.Item onClick={LoadbID}>Bidding Items</NavDropdown.Item>
                      </NavDropdown>
                      </li>
                      <li onClick={LoadProfile}>PROFILE</li>
                    </ul>
                </div>
                <div className="col-md-4 nav-social">
                  <ul>
                      <li><a href="sdas"><i class="fa-brands fa-facebook"></i></a></li>
                      <li><a href="sdas"><i class="fa-brands fa-instagram"></i></a></li>
                      <li onClick={LoadCart}><TiShoppingCart  className='shopping-cart'/></li>
                  </ul>
               </div>
            </div>
            <div className="products">
            { empdata &&
                empdata.map(item => (
                    <div key={item.id}>
                        <div className='storeitems'>
                            <div>
                                <img src={item.icon} alt="web-logo" />
                            </div>
                            <div>
                                <h5>{item.title}</h5>
                                <p>Seller: {item.seller}</p>
                                <p>PHP {item.price}</p>
                                <button onClick={() => { handleSubmit(item) }} className='button'>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
            <Link to='/cart'>Go to Cart</Link>
        </div>
    )
}

export default Store;
