import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoute } from '../utils/APIroutes';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import styled from 'styled-components';
import { Buffer } from 'buffer';

function SetAvatar() {

  const api = 'https://api.multiavatar.com/45678945'
  const navigate = useNavigate();
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setisLoading] = useState();
 
   useEffect(() => {
    async function fetchData() {
      try {
        const data = [];
        for (let i = 0; i < 5; i++) {
          const response = await axios.get(
            `${api}/${Math.floor(Math.random() * 1000)}`
          );
          const buffer = Buffer.from(response.data, 'binary');
          data.push(buffer.toString('base64'));
        }
        setAvatars(data);
      } catch (error) {
        console.error('Error fetching avatars:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(avatars);
  }, [avatars]);
  const setProfilePicture = async (index) => {
    console.log('set profile picture',avatars[index])
    const user=await JSON.parse(localStorage.getItem("chat-app-user"));
    const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
      image:avatars[index]
    })
    if(data.isSet){
      console.log(data.user)
      localStorage.setItem("chat-app-user",JSON.stringify(data.user))
      navigate('/')
    }
    
   }
 
  return (

    <>
      <Container>
          <div className="items-container">
            <h1>
              Select your avatar
            </h1>
          </div>
          <div className="avatars">
          {
            avatars.map((avatar,index)=>{
              return(
               
                   <img key={index} src={`data:image/svg+xml;base64,${avatar}`} alt={`avatar ${index+1}`} onClick={()=>setProfilePicture(index)}  />
              
              )
            })
          }
          </div>
          
      </Container>
      <ToastContainer />
    </>
  );
}


export default SetAvatar;

const Container=styled.div`
     display: flex;
     flex-direction: column;
     justify-content: center;
     align-items: center;
     background-color: #131324;
     height:100vh;
     width: 100vw;
     color: #a6a6de;
     .items-container{
      h1{
        text-transform:uppercase ;
        font-size: 25px;
      }

     }
     .avatars{
      display:flex;
      justify-content: center;
      align-items: center;
      /* padding: 2rem; */
      /* gap: 2rem; */
      img{
        height: 100px;
        width: 100px;
        margin: 10px;
        cursor: pointer;
        &:hover{
          transform: scale(1.1);
          border: 5px solid blue;
          border-radius: 50%;
        }
        
      }
     }


`;
