import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import './Checkout.css'
import COD from '../payment/COD'
import Cards from '../payment/Cards'
import PayPal from '../payment/Paypal'
import logo from '../../photos/logo1.png'
import Button from 'react-bootstrap/Button';

const Checkout = () => {
    const [currentPage, setCurrentPage] = useState('cards');
    const { empid } = useParams();
    const [empdata, setEmpdata] = useState(null);
    const [firstname, setfirstname] = useState('');
    const[userid, setid]=useState("");
    const[lastname, setlastname]=useState("");
    const[contact, setcontact]=useState("");
    const[housenumber, sethousenumber]=useState("");
    const[street, setstreet]=useState("");
    const[brgy, setbrgy]=useState("");
    const[city, setcity]=useState("");
    const[province, setprovince]=useState("");
    const[postcode, setpostcode]=useState("");
    const[id,idchange]=useState("");
    const[icon, iconchange]=useState("");
    const[title, titlechange]=useState("");
    const[seller, sellerchange]=useState("");
    const[price, pricechange]=useState("");
    const [quantity, setquantity] = useState(1);
    const [amount, setamount] = useState(1);
    const navigate=useNavigate();

    const LoadDashboard = () => {
        navigate("/profile")
      }
    const LoadCart = () => {
        navigate("/cart")
      }

    useEffect(() => {
        fetch("http://localhost:3600/cart/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            iconchange(resp.icon);
            titlechange(resp.title);
            sellerchange(resp.seller);
            pricechange(resp.price);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    useEffect(() => {
        fetch("http://localhost:3200/profile")
          .then((res) => res.json())
          .then((data) => {
            const profile = data.find((p) => p.id === 1); 
            setfirstname(profile.firstname);
            setlastname(profile.lastname);
            setcontact(profile.contact);
            sethousenumber(profile.housenumber);
            setstreet(profile.street);
            setbrgy(profile.brgy);
            setcity(profile.city);
            setprovince(profile.province);
            setpostcode(profile.postcode);
          })
          .catch((error) => console.error(error));
      }, []);

    function handleChangePage(page){
        setCurrentPage(page)
    };

    const handleQuantityChange = (event) => {
        const value = event.target.value;
        if(value <= 0) {
          setquantity(1);
        } else{
          setquantity(value);
        }
      };

    const handlesubmit=(e)=>{
      e.preventDefault();
      const empdata={id: uuidv4(), icon, title, seller, price, quantity, amount: Number(totalPrice),firstname,lastname,contact,housenumber,street,brgy,city,province,postcode};
      
      fetch("http://localhost:3400/checkout",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Thank you for ordering with us!')
    
      }).catch((err)=>{
        console.log(err.message)
      })
    }
  
    const totalPrice = price * quantity;
    return ( 
        <form className="container-fluid" onSubmit={handlesubmit}>
            <div className="row checkout-row">
             <div className="col-lg-8">
                    <div className="customer-info">
                        <h4>PAYMENT & SHIPPING INFORMATION</h4>
                        <div className="payment-container">
                            <div className="payment-options">               
                                <div className="payment-buttons">
                                    <Button onClick={() => handleChangePage('cod')} type='button' variant="outline-primary">COD</Button>
                                    <Button onClick={() => handleChangePage('cards')} type='button' variant="outline-primary">Credit / Debit Card</Button>
                                    <Button onClick={() => handleChangePage('paypal')} type='button' variant="outline-primary">PayPal</Button>
                                </div>
                                <div className="paymen-pages">
                                    {currentPage === 'cod' ? <COD/> : null}
                                    {currentPage === 'cards' ? <Cards/> : null}
                                    {currentPage === 'paypal' ? <PayPal/> : null}
                                </div>
                            </div>


                            <div className="customer-info2">
                                <label> Receiver's First Name:</label>
                                <input disabled='disabled' value={firstname || ""} onChange={e=>setfirstname(e.target.value)}></input> 
                                <label> Receiver's Last Name:</label>
                                <input disabled='disabled' value={lastname} onChange={e=>setlastname(e.target.value)}></input> 
                                <label> Contact Number:</label>
                                <input required='required' type="number" value={contact} onChange={e=>setcontact(e.target.value)}></input> 
                                <label> House Number:</label>
                                <input placeholder="House Number" required='required' type="number" value={housenumber} onChange={e=>sethousenumber(e.target.value)}></input> 
                                <label> Street:</label>
                                <input placeholder="Street" required='required' type="text" value={street} onChange={e=>setstreet(e.target.value)}></input> 
                                <label> Brgy:</label>
                                <input placeholder="Brgy." required='required' type="text" value={brgy} onChange={e=>setbrgy(e.target.value)}></input> 
                                <label> City:</label>
                                <input placeholder="City" required='required' type="text" value={city} onChange={e=>setcity(e.target.value)}></input> 
                                <label> Province:</label>
                                <input placeholder="Province" required='required' type="text" value={province} onChange={e=>setprovince(e.target.value)}></input> 
                                <label> Post Code:</label>
                                <input placeholder="Post Code" required='required' type="number" value={postcode} onChange={e=>setpostcode(e.target.value)}></input> 
                            </div>
                        </div>
                    </div>
                </div> 


                <div className="col-lg-4">
                    <div className="items">
                        <h4>SUMMARY</h4>
                        <div className="summary">
                            <div className="image-input">
                                <input disabled='disabled' value={icon} onChange={e=>iconchange(e.target.value)}></input>
                            </div>

                            <div className="labels">
                                <label>Item Name:</label>
                                <input disabled='disabled' value={title} onChange={e=>titlechange(e.target.value)}></input> 
                                <label>Seller:</label>
                                <input disabled='disabled' value={seller} onChange={e=>sellerchange(e.target.value)}></input>
                                <label>Price:</label>
                                <input disabled='disabled' value={price} onChange={e=>pricechange(e.target.value)}></input>
                                <div className="quantity-input">
                                    <label>Quantity:</label>
                                    <input type='number' placeholder='quantity' value={quantity} onInput={e=>setquantity(e.target.value)} onChange={handleQuantityChange}/>
                                </div>
                                <div className="amount-input">
                                    <label>Total Amount:</label>
                                    <input disabled='disabled' value={totalPrice} onChange={e=>setamount(e.target.value)}/>                       
                                </div>
                                <div className="buttons-label">
                                    <Button type='button' onClick={LoadCart} variant="outline-info">Back to Cart</Button>
                                    <button className="btn btn-success" type="submit">Confirm Order</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                   
                
            </div>  

           
        </form>
     );
}
 
export default Checkout;