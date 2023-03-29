import './Payment.css'
import card from '../../photos/card.png'

const Cards = () => {
  return (
    <div className='details'>
      <div className='card-details'>
        <h5>Card Details</h5>
        <img src={card}/>
      </div>
      
      <div className='card-inputs'>
        <label>First name</label>
        <input
          type='text'
        />
        <label>Last name</label>
        <input
          type='text'
        />
        <label>Card number</label>
        <input
          type='number'
        />
        <label>Security code</label>
        <input
          type='number'
        />
        <label>Expiration date</label>
        <input
          type='month'
        />
      </div>
    </div>
  )
}

export default Cards