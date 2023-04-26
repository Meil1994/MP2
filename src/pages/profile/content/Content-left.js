import './Content.css'
import {useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MyOrders from '../customerfile/MyOrders'
import ToShip from '../customerfile/ToShip';
import ToReceive from '../customerfile/ToReceive'
import Canceled from '../customerfile/Canceled'
import SellerItems from '../sellerfile/SellerItems'
import ToShipSeller from '../sellerfile/ToShipSeller';
import CompletedSeller from '../sellerfile/CompletedSeller'
import CanceledSeller from '../sellerfile/CanceledSeller'
import InventoryItemsSeller from '../sellerfile/InventoryItemsSeller'
import UploadItems from '../sellerfile/UploadItems';


const ContentLeft = () => {
    const [currentPage, setCurrentPage] = useState('myorders');
    const [empdata, empdatachange] = useState(null);
    const navigate = useNavigate();

    function handleChangePage(page){
        setCurrentPage(page)
    };

    const LoadEdit = (id) => {
        navigate("/editprofile/" + id)
    }

    useEffect(() => {
        fetch("http://localhost:3200/profile").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

  return (
    <div className='row left-row'>
        <div className="col-lg-4 col-left">
           { empdata &&
               empdata.map(profile => (
                   <div key={profile.id}>
                       <div className='box1-1'>
                           <img src={profile.logo} alt="web-logo"/>
                           <div className="box1-1-profile">
                               <h4>Hello, {profile.firstname}</h4>
                               <p>{profile.email}</p>
                               <a onClick={() => {LoadEdit(profile.id)}} className='button'>Edit Profile</a>
                               
                           </div>
                       </div>
                   </div>
               ))
           }  
           <div className="box1-2">
               <div className="box1-2-tag">
                   <i className="fa-sharp fa-solid fa-bag-shopping" onClick={() => handleChangePage('myorders')}> My Orders</i>
               </div>
               <div className="box1-2-buttons">
                   <button onClick={() => handleChangePage('toship')}>To Ship</button>
                   <button onClick={() => handleChangePage('toreceive')}>To Receive</button>
                   <button onClick={() => handleChangePage('ordercanceled')}>Canceled</button>
               </div>
                   <br/>
               <div className='box1-2-tag'>
                   <i class="fa-solid fa-tags" onClick={()=> handleChangePage('selleritems')}> Seller Items</i>
               </div>
               <div className="box1-2-buttons">
                   <button onClick={() => handleChangePage('uploaditems')}>Sell an Item</button>
                   <button onClick={() => handleChangePage('toshipseller')}>To Ship</button>
                   <button onClick={() => handleChangePage('inventoryitemsseller')}>Shipped</button>
                   <button onClick={() => handleChangePage('completedseller')}>Completed</button>
                   <button onClick={() => handleChangePage('canceledseller')}>Canceled</button>
               </div>
                   <br/>
               <div className='box1-2-tag'>
                   <a href='dasf'><i class="fa-solid fa-circle-info"> Need help?</i></a>
               </div>
           </div>
        </div>
        <div className='col-lg-8 col-left'>
            <div className='order-middle'>
            {currentPage === 'myorders' ? <MyOrders/> : null}
            {currentPage === 'toship' ? <ToShip/> : null}
            {currentPage === 'toreceive' ? <ToReceive/> : null}
            {currentPage === 'ordercanceled' ? <Canceled/> : null}

            {currentPage === 'uploaditems' ? <UploadItems/> : null}
            {currentPage === 'selleritems' ? <SellerItems/> : null}
            {currentPage === 'toshipseller' ? <ToShipSeller/> : null}
            {currentPage === 'completedseller' ? <CompletedSeller/> : null}
            {currentPage === 'canceledseller' ? <CanceledSeller/> : null}
            {currentPage === 'inventoryitemsseller' ? <InventoryItemsSeller/> : null}
            </div>
        </div>
    </div>
  )
}

export default ContentLeft