import React from "react";
import {useState,useEffect} from "react";
import styled from 'styled-components';

import {Link,useNavigate} from "react-router-dom";
import Logo from'../assets/logo.svg'

import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import  axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

 function Register(){
   const navigate = useNavigate();
   const [values,setValues] = useState({
      username : "",
      email : "",
      password : "",
      confirmPassword: "",
   });
   useEffect (()=>{
      if(localStorage.getItem("chat-app-user")){
          navigate("/");
      }
     },[]);
    const handleSubmit =  (async (e) =>{
        e.preventDefault();
       
       if(handleValidation()){
         const {password,confirmPassword,username,email} = values;
         const {data} = await axios.post(registerRoute,{
            username,
            email,
            password
         });
         if (data.status === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem(
              "chat-app-user",
              JSON.stringify(data.user)
            );
            navigate("/");
          }
       }
    });
     const toastOptions = {
      position:"bottom-right",
      autoClose:8000,
      pauseOnHover:true,
      draggable:true,
      theme: "dark"
     }
    const handleValidation = ()=>{
      const {password,confirmPassword,username,email} = values;
      if(password !== confirmPassword){
        toast.error("password and confirm password should be same",toastOptions);
        return false;
      }else if(username.length <3){
         toast.error("userName should be greater than 3 characters",toastOptions);
         return false;
      }else if(password.length <3){
         toast.error("password should be equal orgreater  than 8 characters",toastOptions);
         return false;
      }else if(email === ""){
         toast.error("Mail is required" ,toastOptions);
         return false;
      }
      return true;

    };
    const handleChange = ((e)=>{
         setValues({...values,[e.target.name]:e.target.value});
    });
    return (
        <>
        <FormContainer>
            <form onSubmit={(e)=>{handleSubmit(e); }}>
                <div className="brand">
                    <img src = {Logo} alt = "logo"/>
                    <h1>kChat</h1>
                </div>
                <input
                 type = "text"
                 placeholder="username"
                 name = "username"
                 onChange={(e)=>{
                    handleChange(e)
                 }}/>
                 <input
                 type = "email"
                 placeholder="Email"
                 name = "email"
                 onChange={(e)=>{
                    handleChange(e)
                 }}/>
                 <input
                 type = "password"
                 placeholder="Password"
                 name = "password"
                 onChange={(e)=>{
                    handleChange(e)
                 }}/>
                 <input
                 type = "password"
                 placeholder="Confirm Password"
                 name = "confirmPassword"
                 onChange={(e)=>{
                    handleChange(e)
                 }}/>
                 <button type = "submit">CreateUser</button>
                 <span>
                    Already a user ?
                    <Link to= "/login">Login</Link>
                 </span>
                
            </form>
        </FormContainer>
        <ToastContainer/>
        </>
    );
}


const FormContainer = styled.div `
   height: 100vh;
   weight: 100vw;
   display:flex;
   flex-direction: column;
   justify-content : center;
   gap: 1rem;
   align-items :center;
   background-color:#131324;
   .brand{
       display : flex;
       align-items : center;
       gap : 1rem;
       justify-content:center;
       img{
          height:5rem;
       }
       h1{
         color : white;
         text-transform : uppercase
       }
   }
   form{
      display : flex;
      flex-direction : column;
      gap : 2rem;
      background-color : #00000076;
      border-radius: 2rem;
      padding : 3rem 6rem;

      input{
         background-color : transparent;
         padding : 1.3rem;
         border : 0.1rem solid #4e0eff;
         color : white;
         border-radius : 0.4rem;
         width:100%;
         font-size:1.3rem;
         &: focus{
            border : 0.1rem solid #997af0;
            outline : none;
         }

        
      }
      button{
         background-color: #997af0;
         color : white;
         padding : 1.3rem 2rem;
         border : none;
         font-weight: bold;
         cursor:pointer;
         border-radius:0.4rem;
         font-size:1.3rem;
         text-transform:uppercase;
         transition: 0.5s ease-in-out;
         &:hover{
            background-color : #4e0eff;
         }

      }
      span{
         color: white;
         text-transform : uppercase;
         a{

            color :#43oeff;
            text-decoration: none;
            font-weight : bold;
         }
      }
   }

`;

export default Register;