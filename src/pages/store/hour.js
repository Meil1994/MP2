import { useState } from 'react';
import axios from 'axios';

function Hour() {
  const [endDate, setEndDate] = useState('');
  const [icon, setIcon] = useState('');
  const [title, setTitle] = useState('');
  const [seller, setSeller] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [highestBidder, sethighestBidder] = useState('');
  const [highestBid, setHighestBid] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const timerData = {
      endDate: endDate,
      icon: icon,
      title: title,
      seller: seller,
      startingPrice: startingPrice,
      highestBidder: highestBidder,
      highestBid: highestBid,
      timer: '00:05:00' // replace with your timer data
    };
    axios.post('http://localhost:4000/bid', timerData)
      .then(() => alert('Timer data submitted!'))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>Hour Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          End of Bidding Date:
          <input type="datetime-local" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </label>
        <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        <input type="text" value={seller} onChange={(event) => setSeller(event.target.value)} />
        <input type="text" value={startingPrice} onChange={(event) => setStartingPrice(event.target.value)} />
        <input type="text" value={highestBidder} onChange={(event) => sethighestBidder(event.target.value)} />
        <input type="text" value={highestBid} onChange={(event) => setHighestBid(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Hour;
