import './Payment.css'

const COD = () => {
  return (
    <div className='details'>
      <div className='cod-details'>
        <input type='checkbox'/>
        <h5>Cash on Delivery</h5>
      </div>
      <div className='cod-p'>
      <p>Please make sure to mark the checkbox to proceed with COD.</p>
      </div>
    </div>
  )
}

export default COD