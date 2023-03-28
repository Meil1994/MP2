import './CustomerFile.css'
import useUserData from '../../../db/UserData'

const ToShip = () => {
  const users = useUserData();
  return (
        <div className='col-lg-6 box2'>
          {
              users.map((user) =>(
                  <div className='box2-1' key={user.id}>
              {
                  user.toship.map( (toship) =>(
                      <div className='box' key={toship.id}>
                          <div className='box-image'>
                              <img src={toship.icon} />
                          </div>
                          <div className='box-title'>
                              <h6>{ toship.title }</h6>
                              <p>Sold by: { toship.seller }</p>
                              <h5>PHP { toship.price }</h5>
                              <ul>
                                  <li><a href=''>Contact Seller</a></li>
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

export default ToShip