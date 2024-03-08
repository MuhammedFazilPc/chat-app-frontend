import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { allUsersRoute } from '../utils/APIroutes'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Contacts from '../components/Contacts';
import ChatConatiner from '../components/ChatConatiner';
import Welcome from '../components/Welcome';

function Chat() {
  const [user, setUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);

  const navigate = useNavigate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {

    if (!localStorage.getItem("chat-app-user")) {
      navigate('/login')
    } else {
      async function fetchData() {
        const getUser =await JSON.parse(localStorage.getItem("chat-app-user"))
        setUser(getUser)
        const getContacts = await axios.get(`${allUsersRoute}/${getUser._id}`)
        setContacts(getContacts.data.users)
      }
      fetchData()
    }

  }, []);

  const handleData=(data)=>{
     setCurrentChat(data);
    // console.log(data)
  }

  return (
    <Container>
      <div className="container">
        {
           contacts.length > 0? (<Contacts contacts={contacts} user={user} sendData={handleData}/>):(<p>Loading</p>)
        }
        {
           currentChat ? <ChatConatiner currentChat={currentChat} user={user}/>:(user?<Welcome user={user}/>:"")
        }
      </div>
    </Container>
  );
}


const Container = styled.div`
 height: 100vh;
 width: 100vw;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-items: center;
 background-color: #131324;
 .container{
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display:grid;
  grid-template-columns: 35% 65%;
  color:white;
  align-items: start;
  @media screen {
   min-width :720px ;
   max-width: 1080px;
  }
 }

`;


export default Chat;
