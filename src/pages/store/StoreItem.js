import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const StoreItem = () => {
  const { empid } = useParams();
  const [id, setId] = useState("");
  const [icon, setIcon] = useState("");
  const [title, setTitle] = useState("");
  const [seller, setSeller] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [highestBidder, setHighestBidder] = useState("");
  const [highestBid, setHighestBid] = useState("");
  const [endDate, setEndDate] = useState(null); 
  const [countdown, setCountdown] = useState(null);
  const navigate=useNavigate();

  const LoadBid = () => {
    navigate("/bid")
  }

  useEffect(() => {
    fetch("http://localhost:4000/bid/" + empid)
      .then((res) => res.json())
      .then((resp) => {
        setId(resp.id);
        setIcon(resp.icon);
        setTitle(resp.title);
        setSeller(resp.seller);
        setStartingPrice(resp.startingPrice);
        setHighestBidder(resp.highestBidder);
        setHighestBid(resp.highestBid);
        setEndDate(new Date(resp.endDate));

        if (resp.endDate) { 
          const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = new Date(resp.endDate).getTime() - now; 
            if (distance < 0) {
              clearInterval(countdown);
              setEndDate("Auction has ended");
            } else {
              const days = Math.floor(distance / (1000 * 60 * 60 * 24));
              const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((distance % (1000 * 60)) / 1000);
              setEndDate(days + "d " + hours + "h " + minutes + "m " + seconds + "s");
            }
          }, 1000);

          setCountdown(countdown);
        }

        return () => clearInterval(countdown);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
    
  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { highestBid };
  
    const updatedItem = {
      id: id,
      icon: icon,
      title: title,
      seller: seller,
      startingPrice: startingPrice,
      highestBidder: highestBidder,
      highestBid: highestBid,
      endDate: endDate instanceof Date ? endDate.toISOString().slice(0, 16) : null,
    };
  
    fetch("http://localhost:4000/bid/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to update bid.");
        }
      })
      .then((data) => {
        // update the endDate value with the date object you got from the server
        setEndDate(new Date(data.endDate).toLocaleString().replace(/\//g, '-'));
  
        // convert the endDate back to the format "2023-04-31T00:27"
        const updatedEndDate = new Date(data.endDate).toISOString().slice(0, 16);
  
        const updatedItem = {
          ...data,
          endDate: updatedEndDate,
        };
  
        fetch("http://localhost:4000/bid/" + empid, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updatedItem),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Failed to update bid.");
            }
          })
          .then((data) => {
            alert("Bid updated successfully.");
          })
          .catch((err) => {
            console.log(err.message);
            alert("Failed to update bid.");
          });
      })
      .catch((err) => {
        console.log(err.message);
        alert("Failed to update bid.");
      });
  };
  
  
  

  return (
    <form onSubmit={handlesubmit}>
      <div className="labels">
        <input disabled="disabled" value={icon}/>
        <input disabled="disabled" value={title}/>
        <label>
            Seller:
        </label>
        <input disabled="disabled" value={seller}/>
        <label>
            Starting Price:
        </label>
        <input disabled="disabled" value={startingPrice}/>
        <label>
            Highest Bid:
        </label>
        <input disabled="disabled" placeholder={highestBid}/>
        <label>
            Remaining Time:
        </label>
        <input
  disabled="disabled"
  placeholder={endDate ? endDate.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }) : ''}
/>
        <label>
            Place Your Bid Here:
        </label>
        <input value={highestBid} onChange={(e) => setHighestBid(e.target.value)} />
        <br/>
        <br/>
        <div className="store-b">
        <button onClick={LoadBid} className="store-buttons-1" type="reset">Back</button>
        <button className="store-buttons" type="reset">Place Bid</button>
        </div>
      </div>
      
    </form>
  );
};

export default StoreItem;
