import { useEffect, useState } from 'react';
import logo from '../../../src/photos/logo1.png'
import './Store.css'
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate} from "react-router-dom";

function TimePage() {
  const [bid, setBid] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});
  const navigate=useNavigate();

  const LoadCart = () => {
    navigate("/cart")
  }

  const LoadProfile = () => {
    navigate("/profile")
  }

  const LoadStore = () => {
    navigate("/storeitems")
  }

  const StoreItem = (id) => {
    navigate("/store/item/" + id);
}

  useEffect(() => {
    fetch('http://localhost:4000/bid')
      .then(response => response.json())
      .then(data => {
        setBid(data);
      })
      .catch(error => console.error(error));
  }, []);

  const getRemainingTime = (endTime) => {
    const now = new Date().getTime();
    const distance = new Date(endTime).getTime() - now;
    return Math.max(0, Math.floor(distance / 1000));
  };

  const formatTime = (timeInSeconds) => {
    const days = Math.floor(timeInSeconds / (60 * 60 * 24));
    const hours = Math.floor((timeInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTimeLeft = {};

      bid.forEach((bidItem) => {
        const remainingTime = getRemainingTime(bidItem.endDate);
        newTimeLeft[bidItem.id] = remainingTime;
        if (remainingTime <= 0) {
          bidItem.disableInput = true;
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [bid]);

  if (bid.length === 0) {
    return <p>Loading bid data...</p>;
  }

  return (
    <div className='container-fluid'>
      <div className="row dashboard-nav">
        <div className="col-lg-4 dash-logo">
          <img src={logo} alt='Logo'/>
        </div>
        <div className="col-lg-4 dash-ul">
          <ul>
            <li onClick={LoadStore}>HOME</li>
            <li onClick={LoadProfile}>PROFILE</li>
          </ul>
        </div>
        <div className="col-md-4 nav-social">
          <ul>
            <li><a href="sdas"><i className="fa-brands fa-facebook"></i></a></li>
            <li><a href="sdas"><i className="fa-brands fa-instagram"></i></a></li>
            <li onClick={LoadCart}><TiShoppingCart  className='shopping-cart'/></li>
          </ul>
        </div>
      </div>

      <div className='bidding-content'>
        {bid.map((bidItem) => (
          <div className='item-container' key={bidItem.id}>
            <div className='bid-logo'>
              <img src={bidItem.icon} alt='Bid Icon' />
            </div>
            <div className='bid-content'>
              <h3>{bidItem.title}</h3>
              <p>Starting Price: PHP {bidItem.startingPrice}</p>
              <div className='bids'>
                <p>Highest Bid: PHP {bidItem.highestBid}</p>
                <p>Time Left: {formatTime(timeLeft[bidItem.id])}</p>
              </div>
                <button onClick={() => StoreItem(bidItem.id)}>Check Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimePage;
