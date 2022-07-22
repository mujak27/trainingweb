import React from "react";
import { useContextProvider } from "../../context/ContextProvider";

type props={

};

export const Navigation:React.FC<props> = () => {
  const {currTheme, changeCurrTheme} = useContextProvider();

  return (
    <>
      <button
        style={{
          backgroundColor: currTheme.backgroundColor,
          color : currTheme.color
        }}
        onClick={()=>changeCurrTheme()}>change theme
      </button>
    </>
  )
}

