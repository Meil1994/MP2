import './Payment.css'
import paypal from '../../photos/paypal.png'

const Paypal = () => {
  return (
    <div className='details'>
      <div className='paypal-details'>
        <h5>Paypal Account Details</h5>
        <img src={paypal}/>
      </div>

      <div className='paypal-inputs'>
        <div>
          <p>Log in to your PayPal account to complete this purchase.</p>
          <button type='button'>Login</button>
        </div>
        <hr/>
        <div>
          <p>New to PayPal?</p>
          <div className='signup'>
            <button type='button'>Sign Up</button>
            <p>Or use the Credit / Debit card option.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Paypal