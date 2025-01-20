import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Chat from "./chat";


const Home = () => {
  const navigate = useNavigate();
  const [cookies,removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [userDetails, setUserDetails] = useState({username:"",email:"",imgurl:""});
  const toastShown = useRef(false);
  useEffect(() => {
    const verifyCookie = async () => {
      console.log("Cookies:", cookies);
      // if (!cookies.token) {
      //   console.log("No token found, navigating to login.");
      //   navigate("/login");
      // }
      try{
        const { data } = await axios.post(
          "http://localhost:5000",
          {},
          { withCredentials: true }
        );
        const { status, usern,email, imgurl } = data;

        setUserDetails({username:usern,email:email,imgurl:imgurl})
        setUsername(usern);

        if (!status) {
          removeCookie("token", { path: "/" });
          navigate("/login");
        }
      }
      catch (error) {
        console.error("Verification Error:", error);
        removeCookie("token");
        navigate("/login");
      }
      
    };
    verifyCookie();
  }, [cookies, removeCookie, navigate]);
  const Logout = () => {
    removeCookie("token",{ httpOnly: false });

    navigate("/"); window.location.reload();
    
  };
  

   
  return (
    <>
      <div className="container">
        <div className="p-2 d-flex  mb-4">
        <h4 className="me-auto p-2 text-info"> 
          {" "}
          Welcome <span>{username}</span> !! 
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