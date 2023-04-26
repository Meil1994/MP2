import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cart.css'
import Logo from '../../photos/logo1.png'

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadCheckout = (id) => {
        navigate("/checkout/" + id);
    }
    const LoadDashboard = () => {
      navigate("/profile")
    }

    const LoadStore = () => {
        navigate("/storeitems")
      }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:3600/cart/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:3600/cart").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])


    return (
        <div className="container-fluid">
            <div className="row cart-row">
                <div className="col-lg-6 cart-logo">
                    <img src={Logo}/>
                </div>
                <div className="col-lg-6 cart-li">
                    <ul>
                        <li onClick={LoadStore}>HOME</li>
                        <li onClick={LoadDashboard}>PROFILE</li>
                    </ul>
                </div>
            </div>
            <div className="card">
            <h4>Cart <i class="fa-sharp fa-solid fa-bag-shopping"></i></h4>
                {empdata &&
                    empdata.map(item => (
                        <div key={item.id}>
                            <div className="cart-container">
                                <div className="cart-icon">
                                    <img src={item.icon} alt="web-logo" />
                                </div>
                                <div className="cart-seller">
                                    <h3>{item.title}</h3>
                                    <p>Sold by: {item.seller}</p>
                                    <h5>PHP {item.price}</h5>
                                    <div className="cart-buttons">
                                        <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                        <a onClick={() => {LoadCheckout(item.id)}} className='btn btn-primary'>Checkout</a>
                                    </div>
                                </div>
                            </div>
                            <hr/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default EmpListing;