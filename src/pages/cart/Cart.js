import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    const LoadCheckout = (id) => {
        navigate("/checkout/" + id);
    }
    const LoadDashboard = () => {
      navigate("/profile")
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
        <div className="container">
            <div>
              <button onClick={LoadDashboard}>Dashboard</button>
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
                                        <td>
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