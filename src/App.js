import React from "react";
import { Routes, Route } from 'react-router-dom';
import Root from './root/Root'
import ProfileRoot from './pages/profile/ProfileRoot'
import EditProfile from "./pages/profile/editprofile/EditProfile";
import Cart from "./pages/cart/Cart";
import Store from "./pages/store/Store";
import Checkout from './pages/checkout/Checkout'
import PaymentSuccess from "./pages/payment_success/PaymentSuccess";
import SelectedSellerItems from "./pages/profile/sellerfile/SelectedSellerItems";
import Bid from "./pages/store/Bid";
import Hour from "./pages/store/hour";
import StoreItem from "./pages/store/StoreItem";

function App() {
  return (
    <Routes>
      <Route element={<Root/>}>
      <Route path='/profile' element={<ProfileRoot/>}/>
      <Route path='/editprofile/:empid' element={<EditProfile/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/storeitems" element={<Store/>}/>
      <Route path="/checkout/:empid" element={<Checkout/>}/>
      <Route path="/success" element={<PaymentSuccess/>}/>
      <Route path="/sellers/item/:id" element={<SelectedSellerItems/>}/>
      <Route path="/bid" element={<Bid/>}/>
      <Route path="/hour" element={<Hour/>}/>
      <Route path="/store/item/:empid" element={<StoreItem/>}/>
      </Route>
    </Routes>
  );
}

export default App;
