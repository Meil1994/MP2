import { useEffect, useState } from "react"
import './Store.css'
import { Link } from "react-router-dom";

const Store = () => {
    const [empdata, empdatachange] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3300/storeitems").then((res) => {
            return res.json();
        }).then((resp) => {
            empdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    const handleSubmit = (item) => {
        const empdata = { icon: item.icon, title: item.title, seller: item.seller, price: item.price };

        fetch("http://localhost:3600/cart", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(empdata)
        }).then((res) => {
            alert('Item Added to Cart Successfully!')
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div>
            { empdata &&
                empdata.map(item => (
                    <div key={item.id}>
                        <div className='storeitems'>
                            <div>
                                <img src={item.icon} alt="web-logo" />
                            </div>
                            <div>
                                <h5>{item.title}</h5>
                                <p>Seller: {item.seller}</p>
                                <p>PHP {item.price}</p>
                                <button onClick={() => { handleSubmit(item) }} className='button'>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <Link to='/cart'>Go to Cart</Link>
        </div>
    )
}

export default Store;
