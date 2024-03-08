import React from 'react';
import styled from 'styled-components';

function Welcome({user}) {
  return (
    <Container>
         <h2>Hello,<span id='name'>{user.name}</span> </h2>
         <h3>Select a contact to chat</h3>
    </Container>
  );
}
const Container=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding:0px ;
  h2 {
    
    #name{
    color: #314971;
  }
  }
`;
export default Welcome;
