import { useMutation } from "@apollo/client";
import { User } from "@prisma/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { mutationGetSessionData } from "../lib/graphql/query";

type props = {
  children : React.ReactNode | React.ReactNode[]
}
type typeContextProvider = {
  user : User,
  sessionKey : String
}
let context = createContext<typeContextProvider>({
  user : '' as unknown as User,
  sessionKey : localStorage.getItem('sessionKey') as string,
})
export const useContextProvider = () => useContext(context);


export enum enumTheme {
  dark = 'dark',
  light = 'light',
}
type typeTheme = {
  backgroundColor : string,
  color: string,
}
type typeThemeContext = {
  currTheme : typeTheme,
  setCurrTheme : React.Dispatch<React.SetStateAction<typeTheme>>,
  changeCurrTheme: () => void,
}
export const darkTheme : typeTheme = {
  backgroundColor : '#222',
  color : '#fff',
}
export const lightTheme : typeTheme = {
  backgroundColor : '#fff',
  color : '#222',
}


export const themeContext = createContext<typeThemeContext>({
  currTheme : lightTheme,
  setCurrTheme : '' as unknown as React.Dispatch<React.SetStateAction<typeTheme>>,
  changeCurrTheme: () => {}
});
export const useThemeContext = ()=>useContext(themeContext);

export const ContextProvider : React.FC<props> = ({children}) => {

  const [currTheme, setCurrTheme] = useState<typeTheme>(lightTheme);
  const user = '' as unknown as User;


  const sessionKey = localStorage.getItem('sessionKey') as string;
  const [getSessionData, {loading, data : sessionData}] = useMutation(mutationGetSessionData);

  useEffect(()=>{
    getSessionData({
      variables:{
        where:{sessionKey}
      }
    });
  }, [sessionKey, getSessionData])
  
  if(loading) return <>checking session...</>
  console.info(sessionKey);
  console.info(sessionData);



  const changeCurrTheme = ()=>{
    if(currTheme === lightTheme){
      setCurrTheme(darkTheme);
    }else{
      setCurrTheme(lightTheme);
    }
  }

  return (
    <themeContext.Provider value={{currTheme, setCurrTheme, changeCurrTheme}}>
      <context.Provider value={{user, sessionKey}} >
        {children}
      </context.Provider>
    </themeContext.Provider>
  );
}