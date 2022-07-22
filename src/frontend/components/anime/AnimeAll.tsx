import { useQuery } from "@apollo/client";
import { Anime, AnimeFavorite } from "@prisma/client";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";
import { queryAnimes, queryAnimesFavoritedByUser } from "../../lib/graphql/query";
import { AnimeCreate } from "./AnimeCreate";
import { AnimeItem } from "./AnimeItem";
import { AnimeSearch } from "./AnimeSearch";

type props={

};

export const AnimeAll:React.FC<props> = () => {
  const {currTheme, user} = useContextProvider();
  const [search, setSearch] = useState('');
  const [favoriteOnly, setFavoriteOnly] = useState(false);

  const {loading: loadingAnimes, data : resAnimes} = useQuery(queryAnimes);

  const {error, loading: loadingAnimeFavorites, data : resAnimeFavorites} = useQuery(queryAnimesFavoritedByUser, {
    variables: {
      input:{
        userUserId: user.userId
      }
    }
  });


  useEffect(()=>{
    console.info('changed')
  }, [search])

  if(loadingAnimes || loadingAnimeFavorites){
    return <>loading data...</>
  }
  console.info(error);

  console.info(resAnimeFavorites);

  const animes = resAnimes.animes as Array<Anime> ;
  const animeFavorites = resAnimeFavorites.animeFavoritedByUser as Array<AnimeFavorite>;

  return (
    <>
      <div style={{
        backgroundColor: currTheme.backgroundColor,
        color : currTheme.color
      }}>
        <h1>
          aniMZ
        </h1>
        <AnimeSearch search={search} setSearch={setSearch} />
        <button onClick={e=>setFavoriteOnly(!favoriteOnly)} >favorite only</button>
      </div>
      <AnimeCreate/>
      <>
        {
          animes.filter((anime)=>{return anime.animeName.includes(search)}).map((anime)=>{
            const favorited = animeFavorites.some((animeFavorite)=>{return animeFavorite.animeAnimeId === anime.animeId})
            return (
              <>
              {favoriteOnly && favorited && <AnimeItem key={nanoid()} anime={anime} favorited={favorited} />}
              {!favoriteOnly && <AnimeItem key={nanoid()} anime={anime} favorited={favorited} />}
              </>
            )
          })
        }
      </>
    </>
  )
}

