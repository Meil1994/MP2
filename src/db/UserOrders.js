import { useState, useEffect } from "react";

function useUserOrders(){
    const [user, setUser] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:3400/checkout')
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }, []);
    return user;
}

export default useUserOrders;