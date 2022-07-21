import { Anime } from "@prisma/client";
import React, { useState } from "react";
import { AnimeFavButton } from "./AnimeFavButton";

type props={
  anime : Anime
};

export const AnimeDetail:React.FC<props> = ({anime}) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div onClick={()=>setShowDetail(!showDetail)} style={{
        backgroundImage : `url(${anime.animeImageLink})`
      }}>
        <AnimeFavButton anime={anime} />
        <div>
          name : {anime.animeName}
        </div>
        <div>
          genre : {anime.animeGenre}
        </div>
        <div>
          release date : {anime.animeReleaseDate}
        </div>
      </div>
      {
        showDetail ? 
          <></> :
          null
      }
    </>
  )

}

