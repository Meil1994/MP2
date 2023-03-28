import './EditProfile.css'
import { useState, useEffect } from 'react';
import {useNavigate, useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const { empid } = useParams();

  useEffect(() => {
    fetch("http://localhost:3200/profile/" + empid).then((res) => {
      return res.json();
    }).then((resp) => {
      idchange(resp.id);
      logochange(resp.logo);
      namechange(resp.firstname);
      lastnamechange(resp.lastname)
      emailchange(resp.email);
      contactchange(resp.contact);
      housenumberchange(resp.housenumber);
      streetchange(resp.street);
      brgychange(resp.brgy);
      citychange(resp.city);
      provincechange(resp.province);
      codechange(resp.postcode);
      passwordchange(resp.password);

    }).catch((err) => {
      console.log(err.message);
    })
  }, []);

  const [logo, logochange] = useState("");
  const [firstname, namechange] = useState("");
  const [lastname, lastnamechange] = useState("");
  const [id, idchange] = useState("");
  const [email, emailchange] = useState("");
  const [contact, contactchange] = useState("");
  const [housenumber, housenumberchange] = useState("");
  const [street, streetchange] = useState("");
  const [brgy, brgychange] = useState("");
  const [city, citychange] = useState("");
  const [province, provincechange] = useState("");
  const [postcode, codechange] = useState("");
  const [password, passwordchange] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const empdata = {logo,firstname,lastname,email,contact,housenumber,street,brgy,city,province,postcode,password};

    fetch("http://localhost:3200/profile/" + empid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/profile');
      }).catch((err)=>{
        console.log(err.message)
      })
  }
  return (
      <div className='edit_container'>
        <form onSubmit={handleSubmit} className='profile_change'>
          <label>First Name:</label>
          <input value={firstname} disabled='disabled'></input>
          <label>Last Name:</label>
          <input value={lastname} disabled='disabled'></input>
          <label>Email Address:</label>
          <input type='email' required value={email} onChange={e=>emailchange(e.target.value)}></input>
          <label>Contact Number:</label>
          <input type='number' required value={contact} onChange={e=>contactchange(e.target.value)}></input>
          <label>Password:</label>
          <input type='password' required value={password} onChange={e=>passwordchange(e.target.value)}></input>
          <label>House Number:</label>
          <input type='number' required value={housenumber} onChange={e=>housenumberchange(e.target.value)}></input>
          <label>Street:</label>
          <input type='text' required value={street} onChange={e=>streetchange(e.target.value)}></input>
          <label>Barangay:</label>
          <input type='text' required value={brgy} onChange={e=>brgychange(e.target.value)}></input>
          <label>City:</label>
          <input type='text' required value={city} onChange={e=>citychange(e.target.value)}></input>
          <label>Province:</label>
          <input type='text' required value={province} onChange={e=>provincechange(e.target.value)}></input>
          <label>Postal Code:</label>
          <input type='number' required value={postcode} onChange={e=>codechange(e.target.value)}></input>
          <div className='edit_buttons'>
              <button type='submit'>Save</button>
              <Link to='/profile' className='link'>Go Back</Link>
          </div>
        </form>
      </div>
  )
}

export default EditProfile