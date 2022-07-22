import { useMutation } from "@apollo/client";
import { User } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { mutationGetSessionData } from "../lib/graphql/query";
import { strings } from "../utils/strings";

type props = {
  children : React.ReactNode | React.ReactNode[]
}

export enum enumTheme {
  dark = 'dark',
  light = 'light',
}
type typeTheme = {
  backgroundColor : string,
  color: string,
}
export const darkTheme : typeTheme = {
  backgroundColor : '#222',
  color : '#fff',
}
export const lightTheme : typeTheme = {
  backgroundColor : '#fff',
  color : '#222',
}

type typeContextProvider = {
  user : {
    userId? : string,
    userName? : string,
    userEmail? : string,
  },
  sessionKey : String,
  currTheme : typeTheme,
  setCurrTheme : React.Dispatch<React.SetStateAction<typeTheme>>,
  changeCurrTheme: () => void,
  doRefresh: () => void
}
let context = createContext<typeContextProvider>({
  user : '' as unknown as User,
  sessionKey : localStorage.getItem(strings.sessionKey) as string,
  currTheme : lightTheme,
  setCurrTheme : '' as unknown as React.Dispatch<React.SetStateAction<typeTheme>>,
  changeCurrTheme: () => {},
  doRefresh: () => {}
})
export const useContextProvider = () => useContext(context);

export const ContextProvider : React.FC<props> = ({children}) => {
  const [refresh, setRefresh] = useState(false);
  const [currTheme, setCurrTheme] = useState<typeTheme>(lightTheme);
  
  const sessionKey = localStorage.getItem(strings.sessionKey) as string;
  console.info(sessionKey);
  const [getSessionData, {called, loading, data : sessionData}] = useMutation(mutationGetSessionData);

  useEffect(()=>{
    try{
      getSessionData({
        variables:{
          input:{sessionKey}
        }
      });
    }catch(e){
    }
  }, [sessionKey, getSessionData])

  useEffect(()=>{
    console.info("refreshed")
  }, [refresh])

  const doRefresh = ()=>{
    setRefresh(!refresh);
  }
  
  if(!called || loading) return <>checking session...</>

  let user = '' as unknown as User;
  if(sessionData) user = sessionData.getSessionData as User;
  console.info(user);

  const changeCurrTheme = ()=>{
    if(currTheme === lightTheme){
      setCurrTheme(darkTheme);
    }else{
      setCurrTheme(lightTheme);
    }
  }

  return (
      <context.Provider value={{
        user, 
        sessionKey, 
        currTheme, 
        setCurrTheme, 
        changeCurrTheme,
        doRefresh
      }} >
        {
          refresh ? (<>{children}</>) : (<>{children}</>)
        }
      </context.Provider>
  );
}