import React, {useState} from 'react';
import './style.css'
import {Navigate, useNavigate} from "react-router-dom";
function Register() {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone_number,setPassword] = useState(null);
    const [date_of_birth,setConfirmPassword] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isReceived, setIsReceived] = useState(false);
    const [response, setResponse] = useState(null);

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "phone_number"){
            setPassword(value);
        }
        if(id === "date_of_birth"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = async () => {
        console.log(firstName,lastName,email,phone_number,date_of_birth);
        const data = {
             firstName : firstName,
                lastName:lastName,
                email:email,
                phone_number:phone_number,
                date_of_birth:date_of_birth
          };
      
        try {  
            const res = await fetch('http://localhost:8000/profile/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
            const json = await res.json();
            setResponse(json); // Store the response data in the state variable
            setIsReceived(true)
        } catch (e) {
            setIsSubmitted(true);
            console.log(isSubmitted)
            console.log('Error');
            
        } finally{
            setIsSubmitted(true);
        }
    }
    const lol = () =>{

    }
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
      };

    return(
        <div className="form">
        <div className="form-body">
            <div className="username">
                <label className="form__label" for="firstName">First Name </label>
                <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
            </div>
            <div className="lastname">
                <label className="form__label" for="lastName">Last Name </label>
                <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
            </div>
            <div className="email">
                <label className="form__label" for="email">Email </label>
                <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
            </div>
            <div className="username1">
                <label className="form__label" for="phone_number">Phone number </label>
                <input className="form__input" type="text"  id="phone_number" value={phone_number} onChange = {(e) => handleInputChange(e)} placeholder="Phone_number"/>
            </div>
            <div className="username2">
                <label className="form__label" for="date_of_birth">date of birth </label>
                <input className="form__input" type="text" id="date_of_birth" value={date_of_birth} onChange = {(e) => handleInputChange(e)} placeholder="date_of_birth"/>
            </div>
        </div>
          <div class="footer">
              <button onClick={()=>handleSubmit()} type="submit" class="btn">Register</button>
              <div>
                { isReceived ? <div> Your CustomerID is {response.customer_id} </div>: lol()}
                                                                    
              </div>
              
          </div>
          <div class="footer">
          <button onClick={handleClick}  > Return back to Home </button>
          </div>
        </div>  
    )     
}
export default Register;