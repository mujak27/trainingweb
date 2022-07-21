import { Anime } from "@prisma/client";
import React, { useState } from "react";
import { AnimeDetail } from "./AnimeDetail";

type props={
  anime : Anime
};

export const AnimeItem:React.FC<props> = ({anime}) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div onClick={()=>setShowDetail(!showDetail)} style={{
        backgroundImage : `url(${anime.animeImageLink})`
      }}>
        <div>
          name : {anime.animeName}
        </div>
      </div>
      {
        showDetail ? 
          <AnimeDetail anime={anime} /> :
          null
      }
    </>
  )

}

