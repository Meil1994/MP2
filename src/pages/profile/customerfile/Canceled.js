import './CustomerFile.css'
import useUserData from '../../../db/UserData'

const Canceled = () => {
  const users = useUserData();
  return (
        <div className='col-lg-6 box2'>
          {
              users.map((user) =>(
                  <div className='box2-1' key={user.id}>
              {
                  user.canceled.map( (orders) =>(
                      <div className='box' key={orders.id}>
                          <div className='box-image'>
                              <img src={orders.icon} />
                          </div>
                          <div className='box-title'>
                              <h6>{ orders.title }</h6>
                              <p>Sold by: { orders.seller }</p>
                              <h5>PHP { orders.price }</h5>
                              <ul>
                                  <li><a href=''>Reorder Item</a></li>
                                  <li><a href=''>Contact Support</a></li>
                              </ul>
                          </div>
                      </div>
                  ))
              }
             </div>
              ))
          }
            </div>
  )
}

export default Canceled