import './PaymentSuccess.css'
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const LoadDashboard = () => {
    navigate("/storeitems")
  }

  return (
    <div>
      <div className='success-box'>
        <div className='check'><i class="fa-solid fa-circle-check"></i></div>
        <h3>Payment Success !</h3>
        <p>Your order has been confirmed. Please check your email for the confirmation. </p>
        <button onClick={LoadDashboard}>Go to Home</button>
      </div>
    </div>
  )
}

export default PaymentSuccess