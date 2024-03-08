import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Input from './Input';
import { getAllMessagesRoute } from '../utils/APIroutes';
import axios from 'axios'
import { io } from 'socket.io-client'
const socket = io ('http://localhost:5000')
function ChatContainer({ currentChat, user }) {
    const [currentChatMessages, setcurrentChatMessages] = useState([]);
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear();
        navigate('/login')
    }
    useEffect(() => {
        socket.emit("add_user", user)
    }, []);
    useEffect(() => {

        axios.post(getAllMessagesRoute, {
            receiver: currentChat._id,
            sender: user._id,
        }).then((response) => {
            if (response.data.msg === 'success') {

                setcurrentChatMessages(response.data.messages)

            }
        })

    }, [currentChat]);
    useEffect(() => {
        const handlePrivateReceive = (data) => {
            console.log("private receive",data)
            setcurrentChatMessages(currentChatMessages => [...currentChatMessages, data]);
        };
    
        socket.on("private_receive", handlePrivateReceive);
    
        return () => {
            socket.off("private_receive", handlePrivateReceive);
        };
    }, []);
    
    
    

    useEffect(() => {
        console.log(currentChatMessages)
    }, [currentChatMessages]);

    const handleDataToSend = (msg) => {
        console.log("message to send is :", msg)
        socket.emit("send_message", {
            msg,
            sender: user._id,
            to: currentChat._id,
        })
    }
    return (
        <Container>
            <div className="chat-header">
                <div className="header">
                    <img src={`data:image/svg+xml;base64,${currentChat.avatar}`} alt="avatar" />
                    <h3>{currentChat.name}</h3>
                    <button type="button" onClick={logout}>Logout <i className="fa fa-sign-out" aria-hidden="true"></i></button>
                </div>
            </div>
            <div className="messages">
                {
                    currentChatMessages.map((Object, index) => {
                        return (
                            <div className={`${Object.sender === user._id ? 'send' : 'received'}`}>
                                <span className="message-content">{Object.message}</span>
                            </div>
                        )
                    })
                }
            </div>
            <Input currentChat={currentChat} user={user} dataToSend={handleDataToSend} />

        </Container>
    );
}

const Container = styled.div`
    display:flex;
    flex-direction: column;
    height:85vh;

    .chat-header {
        flex: 0 0 10%;
        .header {
            display: flex;
            align-items: center; /* Align items vertically */
            padding: 10px; /* Increased padding */

            background-color: #4d4545a3;

            img {
                height: 50px; /* Reduced image size */
                width: 50px; /* Reduced image size */
                margin-right: 15px;
                border-radius: 50%; /* Rounded avatar */
            }

            h3 {
                margin: 0;
                color: white; /* Changed text color */
            }

            button {
                margin-left: auto;
                border: none; /* Better to use 'none' instead of 'none' */
                background-color: transparent;
                cursor: pointer;
                color: white; /* Changed text color */
                font-size: 14px; /* Adjusted font size */
                padding: 5px 10px; /* Added padding */
            }
        }
    }
    .messages{
        flex:0 0 80%;
        background-color: #00000076;
        overflow-y: auto;
        padding-left: 5px;
        padding-right: 10px;
        &::-webkit-scrollbar {
        width: 4px; /* Adjust the width as needed */
        }

        /* Track */
        &::-webkit-scrollbar-track {
        background: transparent; /* Track color */
        }

    /* Handle */
        &::-webkit-scrollbar-thumb {
        background: #888; /* Scrollbar handle color */
        border-radius: 4px; /* Scrollbar handle border radius */
        }

        /* Handle on hover */
        &::-webkit-scrollbar-thumb:hover {
        background: #555; /* Scrollbar handle color on hover */
        }

      

        .send {
            margin-top: 5px;
            margin-bottom: 5px;
            padding: 8px;
            text-align: end;
            .message-content {
                color: white;
                background-color: #3a416da8;
                font-size: 20px;
                padding: 10px; /* Add padding to separate text from background */
                border-radius: 5px; /* Add border radius to make it visually appealing */
            }
        }

        .received {
            margin-top: 5px;
            margin-bottom: 5px;
            padding: 8px;
            text-align: start;
            .message-content {
                font-size: 20px;
                background-color: #4f51628e;
                padding: 10px; /* Add padding to separate text from background */
                border-radius: 5px; /* Add border radius to make it visually appealing */
            }
        }
    }
    
`;

export default ChatContainer;
