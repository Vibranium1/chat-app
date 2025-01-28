import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
    imgurl:""
  });
  const { email, password, username, imgurl } = inputValue;
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
        `https://chat-app-uk89.onrender.com/signup`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
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
      username: "",
      imgurl:""
    });
  };

  return (
    <div className="no-gradient d-flex align-items-center justify-content-center vh-100">
     <div className="container p-4 border" style={{ width:"450px", backgroundColor:"#ffffff", borderRadius:"20px"}}>
        <div className="" >
        <h2 className="text-center" >Signup Account</h2>
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
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            style={{width:"400px", borderRadius:"7px"}}
            placeholder="Enter your username"
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
          <label htmlFor="image">Image URL (Optional):</label>
          <input
            type="text"
            name="imgurl"
            value={imgurl}
            style={{width:"400px", borderRadius:"7px"}}
            placeholder="Enter your image url"
            onChange={handleOnChange}
          />
        </div>
        <div className="d-flex flex-column">
        <button className=" bg-primary text-white border-0 p-1" style={{width:"400px", marginTop:"30px", borderRadius:"7px"}} type="submit" >Register</button>
        <span>
          Already have an account? <Link to={"/"}>Login</Link>
        </span>
        </div>
        
      </form>
      <ToastContainer />

        </div>
      
    </div>

    </div>
   
  );
};

export default Signup;