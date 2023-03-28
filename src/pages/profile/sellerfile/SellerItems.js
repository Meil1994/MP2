import './SellerFile.css'
import useUserData from '../../../db/UserData'

const SellerItems = () => {
  const users = useUserData();
  return (
        <div className='col-lg-6 box2'>
          {
              users.map((user) =>(
                  <div className='box2-1' key={user.id}>
              {
                  user.selleritems.map( (orders) =>(
                      <div className='box' key={orders.id}>
                          <div className='box-image'>
                              <img src={orders.icon} />
                          </div>
                          <div className='box-title'>
                              <h6>{ orders.title }</h6>
                              <h5>PHP { orders.price }</h5>
                              <ul>
                                  <li><a href=''>Check Details</a></li>
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

export default SellerItems