import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3300/storeitems/" + id)
      .then((res) => res.json())
      .then((data) => setDetails(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!details) {
    return <div>Loading...</div>;
  }

  const iconBase64 = `data:${details.icon};base64,${details.icon}`;

  return (
    <div className="editItems">
      <div className="editImage">
        <img src={iconBase64} alt={details.icon} />
      </div>
      <div className="editDetails">
        <h3>{details.title}</h3>
        <p>Seller: {details.seller}</p>
        <p>Amount: PHP {details.price}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
