import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
                <div className="col-lg-3 cart-logo">
                    <img src={Logo}/>
                </div>
                <div className="col-lg-9 cart-li">
                    <ul>
                        <li onClick={LoadStore}>HOME</li>
                        <li onClick={LoadDashboard}>PROFILE DASHBOARD</li>
                    </ul>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Icon</td>
                                <td>Title</td>
                                <td>Seller</td>
                                <td>Price</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            {empdata &&
                                empdata.map(item => (
                                    <tr key={item.id}>
                                        <td><img src={item.icon} alt="web-logo" /></td>
                                        <td>{item.title}</td>
                                        <td>{item.seller}</td>
                                        <td>{item.price}</td>
                                        <td className="cart-buttons">
                                            <a onClick={() => { Removefunction(item.id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => {LoadCheckout(item.id)}} className='btn btn-primary'>Checkout</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default EmpListing;