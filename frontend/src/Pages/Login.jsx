import React,{ useContext, useState,useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext/userContext";
const Login=()=>{
    const navigate=useNavigate();
    const{setUser}=useContext(UserContext);
    const[data,setData]=useState({
        email:'',
        password:'',
    })
    const handleChange=(e)=>{
        setData(prev=>({...prev,[e.target.id]:e.target.value}));
    }
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          navigate('/home');
        }
      }, [setUser, navigate]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!data.email || !data.password) {
          alert("Please fill in all fields.");
          return;
        }
      
        try {
          const response = await axios.post('http://localhost:5000/login', data);
          const user = response.data.exist;
      
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            alert('Login Successful');
            navigate('/home');
          } else {
            alert('Invalid credentials');
          }
        } catch (error) {
          console.log(error);
          alert('An error occurred during login.');
        }
      };
      
    return(
        <div className="register-container">
             <video autoPlay muted loop id="background-video"> 
                <source src="/v1.mp4" type="video/mp4" /> 
            </video>
        <form onSubmit={handleSubmit}className="register-form">
            <label htmlFor="email">Email</label>
            <input type="text"name="email" id="email" placeholder="email" onChange={handleChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="password" onChange={handleChange}/>
            <button type="Submit">Submit</button>
            <p>Don't have an account?
                <Link to='/'>Register</Link>
            </p>
        </form>
        </div>
    )
}
export default Login;