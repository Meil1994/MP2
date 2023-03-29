import './CustomerFile.css'
import useUserOrders from '../../../db/UserOrders';

const MyOrders = () => {
    const users = useUserOrders();

    const Removefunction = (id) => {
        if (window.confirm('Do you want to cancel the order?')) {
            fetch("http://localhost:3400/checkout/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Cancelled successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

  return (
    <div>
        <div className='col-lg-6 box2'>
        {
                        users.map( (orders) =>(
                            <div className='box' key={orders.id}>
                                <div className='box-image'>
                                    <img src={orders.icon} />
                                </div>
                                <div className='box-title'>
                                    <h6>{ orders.title }</h6>
                                    <p>Sold by: { orders.seller }</p>
                                    <h5>PHP { orders.amount }</h5>
                                    <ul>
                                       <button onClick={() => { Removefunction(orders.id) }}>Cancel</button>
                                       <li><a href=''>Check Details</a></li>
                                        <li><a href=''>Contact Support</a></li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
        </div>
    </div>
  )
}

export default MyOrders