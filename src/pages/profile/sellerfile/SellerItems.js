import "./SellerFile.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3300/storeitems")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="col-lg-6 box2">
        {data.map((order) => (
          <div className="box" key={order.id}>
            <div className="box-image">
              <img src={order.icon} alt="" />
            </div>
            <div className="box-title">
              <h6>{order.title}</h6>
              <p>Sold by: {order.seller}</p>
              <h5>PHP {order.price}</h5>
              <ul>
                <li>
                  <Link to={`/sellers/item/${order.id}`}>View Details</Link>
                </li>
                <li>
                  <a href="">Contact Support</a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
