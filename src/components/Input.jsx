import React, { useState } from 'react';
import styled from 'styled-components';
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs';
import Picker  from 'emoji-picker-react' ;
import axios from "axios"
import { sendMessageRoute } from '../utils/APIroutes';
function Input({currentChat,user,dataToSend}) {
  // console.log("current chat and user is ",currentChat," ",user)
  const [emojiSelected, setemojiSelected] = useState(false);
  const [msg, setmsg] = useState("");
  const handleEmojiSelecter=()=>{
      setemojiSelected(!emojiSelected)
  }
  const handleEmojiClick=(emojiData,event)=>{
  //  console.log(emojiData.emoji)
    let message=msg;
    message+=emojiData.emoji;
    setmsg(message)
  }
  
  const handleSendClick=async(event)=>{
    event.preventDefault();
    dataToSend(msg)
    axios.post(sendMessageRoute, {
      message:msg,
      users:[currentChat._id,user._id],
      sender:user._id
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
    setmsg("")
  }
  return (
    <Container>
      <div className="input-div">
        <BsEmojiSmileFill onClick={handleEmojiSelecter} />
         <div className="emoji-picker-react">
         {emojiSelected && <Picker onEmojiClick={handleEmojiClick}/>}
         </div>
        <input type="text" placeholder=' Type a message' value={msg} onChange={(event)=>{setmsg(event.target.value)}} autoFocus/>
        <IoMdSend onClick={handleSendClick}/>
      </div>
    </Container>
  );
}
const Container = styled.div`
height:100%;
   .input-div{
        flex: 1; /* Fill remaining space */
        width: 100%;
        height:100%;
        background-color: #4d4545a3;
        color:#cde404;
        font-size: 16px;
        /* padding-left:5px; */
        border-radius:10px;
        
        input{
            padding:5px;
            font-size: 1.2rem;
            width:88%;
            height:100%;
            box-sizing: border-box;
            margin-left:5px;
            margin-right:5px;
            border:2px solid #6f6363b6;
            border-radius: 5px;
            background-color: #4d4545a3;
            color:white;
        }
        .emoji-picker-react{
        position: absolute;
        top:100px;
        }
    }
`;
export default Input;
