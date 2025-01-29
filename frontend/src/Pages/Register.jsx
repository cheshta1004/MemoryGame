import React,{useState} from "react";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
import "../Styles/register.css"
const Register=()=>{
    const navigate=useNavigate();
    const[data,setData]=useState({
        name:'',
        email:'',
        password:''
    })
    const [emailError,setEmailError]=useState("");
    const handleChange=(e)=>{
        setData(prev=>({...prev,[e.target.id]:e.target.value}));
    }
    const validateEmail = (email )=> {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!validateEmail(data.email)){
            setEmailError('Enter Valid Email');
            return;
        }
        setEmailError('');
        try{
            const response=await axios.post('http://localhost:5000/register',data);
            console.log(response);
            alert('Registration Successfull');
            navigate("/login");
        }catch(error){
            console.log('Registration failed',error);
            alert('Registration Alert');
        }
    }
    
    return ( 
    <div className="register-container">
        <video autoPlay muted loop id="background-video"> 
            <source src="/v1.mp4" type="video/mp4" /> 
        </video>
        <form onSubmit={handleSubmit} className="register-form"> 
        <label htmlFor="name">Name</label> 
        <input type="text" name="name" id="name" placeholder="Name" onChange={handleChange} /> 
        <label htmlFor="email">Email</label> 
        <input type="text" name="email" id="email" placeholder="Email" onChange={handleChange} /> 
        <label htmlFor="password">Password</label> 
        <input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} /> 
        <button type="submit">Submit</button> 
        <p>Already have an account? 
        <Link to='/login'>Login</Link>
        </p> 
        </form> 
    </div> );
}
export default Register;