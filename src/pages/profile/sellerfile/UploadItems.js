import React, { useState } from 'react';
import './SellerFile.css'
import { useEffect } from "react";

const UploadItems = () => {
  const [title, setTitle] = useState('');
  const [seller, setSeller] = useState('');
  const [price, setPrice] = useState('');
  const [icon, setIcon] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:3300/storeitems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title,
        seller: seller,
        price: price,
        icon: icon
      })
    })
    .then((res) => {
      if (res.ok) {
        alert('Item was successfully posted. You can now view it at the store dashboard');
        window.location.reload();
        return res.json();
      } else {
        throw new Error('Unable to add item');
      }
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

useEffect(() => {
    fetch("http://localhost:3200/profile")
      .then((res) => res.json())
      .then((data) => {
        const profile = data.find((p) => p.id === 1); 
        setSeller(profile.firstname);
      })
      .catch((error) => console.error(error));
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setIcon(file);
  }

  return (
    <div className='box2'>
        <form onSubmit={handleSubmit} className='uploaditems'>
        <label>
            Item title:
        </label>
        <input required='required' type="text" value={title} onChange={e => setTitle(e.target.value)} />
        
        <label>
            Seller:
        </label>
        <input disabled required='required' type="text" value={seller} onChange={e => setSeller(e.target.value)} />
       
        <label>
            Price:
        </label>
        <input required='required' type="number" value={price} onChange={e => setPrice(e.target.value)} />
            
        <label>
            Item photo:
        </label>
        <div className='uploadbutton'>
            <input required='required' type="file" onChange={handlePhotoChange} />
            <button type="submit">Submit</button>
        </div>
        </form>
    </div>
  );
}

export default UploadItems;
