import React from "react";
import { NavLink } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";

type props={

};

export const Navigation:React.FC<props> = () => {
  const {currTheme, changeCurrTheme, user} = useContextProvider();

  return (
    <>
      <button
        style={{
          backgroundColor: currTheme.backgroundColor,
          color : currTheme.color
        }}
        onClick={()=>changeCurrTheme()}>change theme
      </button>
      {
        user ? 
          (<>{user.userName}</>) : 
          (<>
            <NavLink to={'/login'}>login</NavLink>
          </>)
      }
    </>
  )
}

