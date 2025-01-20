const User = require("../models/UserModel");
const Message = require("../models/MessageModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");
module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt,imgurl } = req.body;
    // console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, createdAt, imgurl });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
    next()
  }
};

module.exports.Login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if(!email || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ email });
      console.log(user,"from backend1")
      if(!user){
        return res.json({message:'Incorrect password or email' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or email' }) 
      }
      console.log(user,"from backend")
       const token = createSecretToken(user._id);
       console.log("Setting cookie:", token);
       res.cookie("token", token, {
         withCredentials: true,
         httpOnly: true,
         secure: false,
        //  sameSite: "none",
       });
       console.log("Set-Cookie Header Sent:", res.getHeader("Set-Cookie"));
       res.status(201).json({ message: "User logged in successfully", success: true });
       next()
    } catch (error) {
      console.error(error);
      next();
    }
  };

  module.exports.Chats = async(req,res,next) =>{
    try {
      const messages = await Message.find().sort({ timestamp: 1 });
      res.status(200).json(messages);
  } catch (err) {
      res.status(500).send('Error fetching chat history');
  }
  };


  