import { useState, useEffect } from "react";

function useUserData(){
    const [user, setUser] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:3500/user')
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
    }, []);
    return user;
}

export default useUserData;