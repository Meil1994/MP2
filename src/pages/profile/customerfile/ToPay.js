import './CustomerFile.css'
import useUserData from '../../../db/UserData'

const ToPay = () => {
  const users = useUserData();
  return (
        <div className='col-lg-6 box2'>
          {
              users.map((user) =>(
                  <div className='box2-1' key={user.id}>
              {
                  user.topay.map( (topay) =>(
                      <div className='box' key={topay.id}>
                          <div className='box-image'>
                              <img src={topay.icon} />
                          </div>
                          <div className='box-title'>
                              <h6>{ topay.title }</h6>
                              <p>Sold by: { topay.seller }</p>
                              <h5>PHP { topay.price }</h5>
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

export default ToPay