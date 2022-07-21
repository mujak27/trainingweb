import { useQuery } from "@apollo/client";
import { Anime } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../context/ContextProvider";
import { queryAnimes } from "../../lib/graphql/query";
import { AnimeItem } from "./AnimeItem";
import { AnimeSearch } from "./AnimeSearch";

type props={

};

export const AnimeAll:React.FC<props> = () => {
  const {currTheme} = useThemeContext();
  const [search, setSearch] = useState('');
  const {loading, data : resAnimes, error} = useQuery(queryAnimes);

  useEffect(()=>{
    console.info('changed')
  }, [search])

  if(loading){
    return <>loading data...</>
  }
  if(error){
    return <>{error.message}</>
  }

  const animes = resAnimes.animes as Array<Anime> ;

  return (
    <>
    <div style={{
      backgroundColor: currTheme.backgroundColor,
      color : currTheme.color
    }}>
      <h1>
        ANIME LIST
      </h1>
      <AnimeSearch search={search} setSearch={setSearch} />
    </div>
    <div>
      {
        animes.filter((anime)=>{return anime.animeName.includes(search)}).map((anime)=>{
          return (
            <AnimeItem anime={anime} />
          )
        })
      }
    </div>
    </>
  )
}

