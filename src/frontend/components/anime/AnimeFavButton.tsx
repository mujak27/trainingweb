import { Anime } from "@prisma/client";
import React from "react";

type props={
  anime : Anime
};

export const AnimeFavButton:React.FC<props> = ({anime}) => {

  const onClick = ()=>{

  }

  // TODO


  return (
    <button onClick={onClick}>
      fav
    </button>
  )
}

