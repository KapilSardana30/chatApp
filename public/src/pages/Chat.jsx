import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";



export default function Chat() {
    const [contacts,setContacts] = useState([]); 
    const [currentUser,setCurrentUser] = useState(undefined);
    const [currentchat,setCurrentChat] = useState(undefined);
    const navigate = useNavigate();
    // useEffect( async ()=>{
    //     if(!localStorage.getItem("chat-app-user")){
    //         navigate("/login");
    //     }else{
    //         setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    //     }
    // },[]);
    // useEffect( () => {
    //     const checkUser = async () => {
    //       if (!localStorage.getItem('chat-app-user')) {
    //         navigate('/login');
    //       } else {
    //         const currentUser = await JSON.parse(localStorage.getItem('chat-app-user'));
    //         console.log("start")
    //         setCurrentUser(currentUser);
    //       }
    //     };
       
    //     checkUser();
    //   }, []);
    // useEffect(async ()=>{
    //     if(currentUser){
    //         const data = await axios.get(`${allUsersRoute}/${
    //             currentUser._id
    //         }`);
    //         setContacts(data.data);

    //     }else{
    //         navigate("/setAvatar");
    //     }

    // },[currentUser]);
//    console.log("Mid");
//     useEffect(() => {
//         console.log("end");
//         const fetchData = async () => {
//           if (currentUser) {
//             try {
//               const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
//               setContacts(response.data);
//             } catch (error) {
//               // Handle any error that occurs during the API request
//               console.error('Error fetching contacts:', error);
//             }
//           } else {
//             navigate('/setAvatar');
//           }
//         };
    
//         fetchData();
//       }, [currentUser]);
useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
        return; // Early return to prevent further execution
      }
      
      const currentUser = await JSON.parse(localStorage.getItem('chat-app-user'));
      setCurrentUser(currentUser);
  
      try {
        const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);
        } else {
          navigate("/setAvatar");
        }
      // setContacts(response.data);
        //console.log(response.data);
      } catch (error) {
        // Handle any error that occurs during the API request
        console.error('Error fetching contacts:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleChatChange = (chat)=>{
    setCurrentChat(chat);
  }
  return (
  
    <>
      <Container>
        <div className="container">
          <Contacts contacts ={contacts} currentUser={currentUser} changeChat = {handleChatChange}/>
          {
            currentchat === undefined ?
            <Welcome/>:
            <ChatContainer currentchat = {currentchat} currentUser={currentUser}/>
          }
          
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
