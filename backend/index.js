// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const http = require('http');
// const { Server } = require('socket.io');
// const app = express();
// require("dotenv").config();
// const cookieParser = require("cookie-parser");
// const authRoute = require("../routes/AuthRoutes");
// const Message = require("../models/MessageModel")
// const { MONGO_URL, PORT } = process.env;

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );


// app.use(cookieParser());

// app.use(express.json());

// app.use("/", authRoute);

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000', 
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });









// mongoose
//   .connect(MONGO_URL)
//   .then(() => console.log("MongoDB is  connected successfully"))
//   .catch((err) => console.error(err));


// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   socket.on('sendMessage', async (data) => {
//     try {
//       console.log(data,"data from frontend")
//       const { sender, content,imgurl } = data;

//       // Save message to MongoDB
//       const newMessage = new Message({ sender, content, imgurl});
//       await newMessage.save();

//       io.emit('receiveMessage', newMessage);
//   } catch (error) {
//       console.error('Error saving message:', error);
//   }
//   });

//   socket.on('disconnect', () => {
//       console.log('User disconnected:', socket.id);
//   });
// });


// // server.listen(PORT, () => {
// //   console.log(`Server is listening on port ${PORT}`);
// // });

// module.exports = (req, res) => {
//   server(req, res); // Delegate to the Express app
// };




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const http = require("http");
const authRoute = require("./routes/AuthRoutes");
const Message = require("./models/MessageModel");
const path = require("path");
const { MONGO_URL, PORT } = process.env;

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoute);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).send("Something went wrong!");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", async (data) => {
    try {
      const { sender, content, imgurl } = data;
      const newMessage = new Message({ sender, content, imgurl });
      await newMessage.save();
      io.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Vercel expects the server to be exported like this:
// module.exports = (req, res) => {
//   server(req, res);  // handles request and response
// };


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();
console.log(__dirname1)
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "build"); 
  app.use(express.static(frontendPath));
  console.log(__dirname1)

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(frontendPath, "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
 });