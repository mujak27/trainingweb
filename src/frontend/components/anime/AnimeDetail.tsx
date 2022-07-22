import { Anime } from "@prisma/client";
import React, { useState } from "react";
import { AnimeFavButton } from "./AnimeFavButton";

type props={
  anime : Anime,
  favorited : boolean
};

export const AnimeDetail:React.FC<props> = ({anime, favorited}) => {
  const [showDetail, setShowDetail] = useState(false);
  const [fav, setFav] = useState(favorited);

  return (
    <>
      <div onClick={()=>setShowDetail(!showDetail)} style={{
        backgroundImage : `url(${anime.animeImageLink})`
      }}>
        <AnimeFavButton anime={anime} fav={fav} setFav={setFav} />
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

