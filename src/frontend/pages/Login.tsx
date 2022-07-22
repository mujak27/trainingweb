import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { mutationLogin } from "../lib/graphql/query";
import { strings } from "../utils/strings";

type props={

};

export const Login:React.FC<props> = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [login, {data : sessionData, loading, called}] = useMutation(mutationLogin);

  const onLogin = ()=>{
    console.info(email)
    console.info(password)
    try{
      login({variables:{
        input:{
          userEmail : email,
          userPassword : password
        }
      }})
    }catch(e){
      console.info(e);
    }
  }

  if(called){
    if(!loading) {
      if(sessionData){
        localStorage.setItem(strings.sessionKey, sessionData.login.sessionKey);
      }
    }
  }

  console.info(loading);
  console.info(sessionData);

  return (
    <>
      <input 
        type="email" 
        value={email}
        onChange={e=>{setEmail(e.currentTarget.value)}}
        />
      <input 
        type="password" 
        value={password}
        onChange={e=>{setPassword(e.currentTarget.value)}}
        />
      <button onClick={onLogin}>login</button>
      {called && (!loading && sessionData ? (<Navigate to={'/'} />) : (<>failed</>))}
    </>
  )
}

