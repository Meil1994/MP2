import './Footer.css'
import cards from '../../../photos/cards.png'

const Footer = () => {
  return (
    <div>
    <div className='row'>
      <div className='col-lg-9 container1'>
        <div className='footer-col'>
            <ul>
                <li><a href='aaa'>About Us</a></li>
                <li><a href='aaa'>Contact Information</a></li>
                <li><a href='aaa'>Terms & Conditions</a></li>
                <li><a href='aaa'>Privacy Policy</a></li>
            </ul>

            <div>
                <p>&copy; 2023 Pitch Bid and Pay. All Rights Reserved.</p>
            </div>
        </div>
      </div>

      <div className='col-lg-3 container2'>
        <div className='footer1-col'>
            <p>Payment Accepted:</p>
            <img src={cards}/>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Footer