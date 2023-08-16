import React from "react";
import styled from  "styled-components";
import Robot from "../assets/robot.gif";
import { useState,useEffect } from "react";

export default function Welcome({currentUser}){
    const [userName, setUserName] = useState("");
    useEffect(() => {
        const fetchData = async () => {
          const data = await JSON.parse(localStorage.getItem("chat-app-user"));
      
          if (data) {
            setUserName(data.username);
          }
        };
      
        fetchData();
      }, []);
      
    return (
        <Container>
            <img src  = {Robot} alt = "robot"></img>
            <h1>
                {/* Welcome
                <span>{userName}!</span> */}
                {`Welcome , ${userName}!`}
            </h1>
            <h1>
                Please, select a chat to start 
            </h1>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;