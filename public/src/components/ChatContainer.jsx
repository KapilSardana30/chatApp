import React,{useState,useEffect} from "react";
import { styled } from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import { BiSolidCalendarEdit } from "react-icons/bi";

export default function({currentchat,currentUser}){
    const [messages,setMessages] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post(getAllMessageRoute, {
              from: currentUser._id,
              to: currentchat._id,
            });
            setMessages(response.data);
          } catch (error) {
            // Handle any errors
            console.error(error);
          }
        };
      
        fetchData();
      }, [currentchat]);
    const handleSendMessage = async (msg)=>{
       
        await axios.post(sendMessageRoute,{
            msg : msg,
            from:currentUser._id,
            to:currentchat._id,
            
         });
    };
    return (
        <>
        {currentchat && (
            <Container>
               <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                    
                    <img src={`data:image/svg+xml;base64,${currentchat.avatarImage}`}
                       alt="avatar"
                      />
                    </div>
                    <div className="username">
                        <h3>{currentchat.username}</h3>
                    </div>
                </div>
                <Logout/>
               </div>
               <div className="chat-messages">
        {messages.map((message) => {
          return (
           
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            
          );
        })}
      </div>
               <ChatInput handleSendMessage = {handleSendMessage}/>
            </Container>
        )}
        
        </>
    );
}
const Container = styled.div`

  padding-top : 1rem;
  display :grid;
  grid-template-rows : 10% 78% 12%;
  gap : 0.1rem;
  overflow : hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header{
    display : flex;
    justify-content : space-between;
    align-items : center;
    padding :0 2rem;
    .user-details{
        display : flex;
        align-items:center;
        gap : 1rem;
        .avatar{
            img{
                height : 3rem;
            }
        }
        .username{
            h3{
            color:white
            }
        }

    }
    }
    .chat-messages{
        padding : 1rem 2rem;
        display:flex;
        flex-direction : column;
        gap : 1rem;
        overflow : auto;
        .message{
            display :  flex;
            align-items : center;
            .content{
                max-width :40%;
                overflow-wrap: break-word;
                padding : 1rem;
                font-size :  1.1rem;
                border-radius:1.1rem;
                color :#d1d1d1;
            }

        }
    }
    .sended{
        justify-content : flex-end;
        .content{
            background-color:#4f04ff21
        }
    }
    .received{
        justify-content :flex-start;
        background-color: #9900ff20;
    }

  }

`;