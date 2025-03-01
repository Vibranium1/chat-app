import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "top-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://chat-app-uk89.onrender.com/login`, // for running it locally make it http://localhost:5000 for backend
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      // console.log(data);
      const { success, message, token,user  } = data;
      if (success) {
        localStorage.setItem("token",token);
        // console.log(user, "login comp")
        localStorage.setItem("userdetails",JSON.stringify(user));
        handleSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div className="no-gradient d-flex justify-content-center align-items-center vh-100" style={{}}>

<div className="container border p-4 " style={{alignContent:"center",width:"450px",  backgroundColor: "#ffffff", borderRadius:"20px"}}>
       <ToastContainer />
      <h2 className="text-center">Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column">
          <label htmlFor="email">Email:</label>   
          <input
            type="email"
            name="email"
            value={email}
            style={{width:"400px", borderRadius:"7px"}}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            style={{width:"400px", borderRadius:"7px"}}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <div className="d-flex flex-column">
        <button className="bg-success text-white border-0 p-1" type="submit" style={{width:"400px", marginTop:"30px", borderRadius:"7px"}}>Login</button>
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
        </div>
        
      </form>
      
    </div>

    </div>
    
  );
};

export default Login;