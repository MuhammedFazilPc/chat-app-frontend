import React,{useState} from 'react';
import styled from 'styled-components';

function Contacts({ contacts, user ,sendData}) {
  // console.log(contacts)
  const [currentChatUser, setcurrentChatUser] = useState(undefined);
  const handleClick=(contact,index)=>{
      sendData(contact)
  }
  return (
    <Container>
      <div className="header">
        <h2>CHAT APP</h2>
      </div>
      <div className="contacts">
        {
          contacts.map((contact, index) => {
            return (
              <div className="contact" key ={index} onClick={()=>handleClick(contact,index)}>
                <img src={`data:image/svg+xml;base64,${contact.avatar}`} alt="avatar" />
                <span className='name'><p>{contact.name}</p></span>
              </div>
            )
          })
        }
      </div>
      <div className="user-info">
        <img src={`data:image/svg+xml;base64,${user.avatar}`} alt="user-avatar" />
        <h3>{user.name}</h3>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  height: 85vh; /* Set height of Container to 100% of viewport height */
  
  .header {
    height: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #222241;
    border-radius: 3px;

    h2 {
      text-align: center;
    }
  }

  .contacts {
    flex: 1; /* Make .contacts section take remaining vertical space */
    overflow-y: auto; /* Enable vertical scrolling */
    display: flex;
    flex-direction: column;
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

    .contact {
      display: flex;
      flex-direction: row;
      align-items: start;
      background-color: #4d454565;
      margin-bottom: 5px;
      border-radius: 5px;
      padding: 5px;
      cursor: pointer;

      &:hover {
        background-color: #8a797964;
      }

      img {
        height: 60px;
        width: 60px;
      }

      .name {
        margin-left: 10px;
        text-align: center;
      }
    }
  }

  .user-info {
    height: 18%;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #222241;
    padding: 5px;
    border-radius: 2px;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
    }

    h3 {
      margin-left: 5px;
    }
  }
`;






export default Contacts;
