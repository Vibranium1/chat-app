import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import "./chat.css"

const socket = io(`http://localhost:5000`);

const Chat = ({userDetails}) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    // console.log(userDetails,"userdeatils in chat c")
    useEffect(() => {
        axios.get(`http://localhost:5000/chats`).then((res) => setMessages(res.data));
        const handleReceiveMessage = (data) => {
            // console.log("how many times", data);
            setMessages((prev) => [...prev, data]);
        };
    
        socket.on('receiveMessage', handleReceiveMessage);
    
        return () => {
            socket.off('receiveMessage', handleReceiveMessage);
        };
    }, []);

    const sendMessage = () => {
        if (!message) return;
        // console.log("sendmessage function")
        const newMessage = { sender: userDetails.username, content: message, imgurl:userDetails.imgurl };
        socket.emit('sendMessage', newMessage);
        setMessage('');
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          sendMessage();
        }
      };


    return (
        <div className='no-gradient' style={{marginBottom:"100px"}}>
            <div className=" chat-container" style={{backgroundColor:"#ffffff", width:"700px", marginLeft:"240px", borderRadius:"20px"}}>
            <h2 className="chat-header">Chat Room</h2>
            <div className="chat-area">
                <div className="chat-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className="">
                            {msg.sender===userDetails.username?
                            <div className='chat-message justify-content-end'><img
                            className="chat-avatar"
                            src={msg.imgurl?msg.imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s"}
                            alt="user"
                        />

                    <p className="chat-text" style={{marginTop:"15px", backgroundColor:"#77b6ad"}}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </p>
                    </div>
                            
                            
                            :<div className='chat-message'><img
                                    className="chat-avatar"
                                    src={msg.imgurl?msg.imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe7qKgRvChw4p7QLmLJ_Vw2PyM11C6ThI6oA&s"}
                                    alt="user"
                                />

                            <p className="chat-text" style={{marginTop:"15px"}}>
                                <strong>{msg.sender}:</strong> {msg.content}
                            </p>
                            </div>
                            }
                                
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        className="chat-input-box"
                        placeholder="Type your message..."
                        value={message}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="chat-send-button" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </div>

        </div>
    );
};


export default Chat;
