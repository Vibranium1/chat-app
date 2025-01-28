import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Chat from "./chat";
import io from "socket.io-client"
const socket= io("https://chat-app-uk89.onrender.com")
// for running it locally make it http://localhost:5000 for backend


const Home = () => {
  const navigate = useNavigate();
  // const [cookies,removeCookie] = useCookies([]);
  // const [userDetails, setUserDetails] = useState({username:"",email:"",imgurl:""});
  const toastShown = useRef(false);
  var tokent =localStorage.getItem("token");
  // console.log(tokent,"frontend home component")
  const user =localStorage.getItem("userdetails");
  var userDetails;
  // console.log(userDetails,"home")
  if (user) {
    userDetails = JSON.parse(user);
    // console.log(userDetails.username,"username home"); // Output: Rahul Rana
  }


    // const userDetails = JSON.parse(user); // Parse the string back into an object
    // console.log(userDetails.username); // Access the username

  // useEffect(() => {
  //   const verifyCookie = async () => {
  //     // console.log("Cookies:", cookies);
  //     // if (!cookies.token) {
  //     //   console.log("No token found, navigating to login.");
  //     //   navigate("/");
  //     // }
      
  //           if (!tokent) {
  //       console.log("No token found, navigating to login.");
  //       navigate("/");
  //     }
  //     // try{
  //     //   const { data } = await axios.post(
  //     //     "http://localhost:5000",
  //     //     {},
  //     //     { withCredentials: true }
  //     //   );
  //     //   const { status, usern,email, imgurl } = data;

  //     //   setUserDetails({username:usern,email:email,imgurl:imgurl})
  //     //   // setUsername(usern);

  //     //   return status
  //     //   ? toast(`Hello ${usern}`, {
  //     //       position: "top-right",
  //     //     })
  //     //   : (localStorage.removeItem("token")
  //     //     // removeCookie("token")
  //     //   , navigate("/")
  //     //   );
  //     // }
  //     // catch (error) {
  //     //   console.error("Verification Error:", error);
  //     //   // console.log("before logout the cookie", cookies)
  //     //   // removeCookie("token",  { path: "/" });
  //     //   // console.log("after logout the cookie", cookies)
        
  //     //   navigate("/login");
  //     // }
      
  //   };
  //   verifyCookie();
  // }, [
  //   // cookies, removeCookie,
  //    navigate]);
  const Logout = () => {
    // removeCookie("token");

    socket.disconnect()
    localStorage.removeItem("token")
    localStorage.removeItem("userdetails")
    navigate("/"); 
    // window.location.reload();
    
  };
  

   
  return (
    <>
      <div className="container d-flex flex-column"  style={{ minHeight: "100vh", overflow: "hidden", padding: "20px"  }}>
        <div className="p-2 align-items-center d-flex mb-3">
        <h4 className="me-auto text-info"> 
          {" "}
          Welcome <span>{userDetails.username}</span> !! 
        </h4>
               <img
                      className="rounded-circle p-2 "
                      src={userDetails.imgurl?userDetails.imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s"}
                      alt="img"
                      style={{
                        objectFit: "fill",
                        width: "70px",
                        height: "70px",
                      }}
                    />
        <button onClick={Logout} className="border-0 p-2 bg-danger rounded-3 text-white mx-3"style={{marginTop:"10px", height:"50px"}}>Logout</button>
        </div>

        <Chat userDetails={userDetails}/>
   
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;