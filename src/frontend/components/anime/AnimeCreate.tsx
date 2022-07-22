import { useMutation } from "@apollo/client";
import { Anime } from "@prisma/client";
import React, { useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";
import { mutationCreateAnime } from "../../lib/graphql/query";

type props={
};

export const AnimeCreate:React.FC<props> = () => {

  const {doRefresh} = useContextProvider();


  const [name, setName] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');

  const [createAnime] = useMutation(mutationCreateAnime)

  const onCreate = ()=>{
    createAnime({
      variables:{
        input:{
          animeName : name,
          animeImageLink : imageLink,
          animeReleaseDate : releaseDate,
          animeGenre : genre
        } as Anime
      }
    })
    doRefresh();
  }
  

  return (
    <>
      <input 
        type="text"
        value={name}
        onChange={e=>setName(e.currentTarget.value)}
        placeholder="name"
        />
      <input 
        type="text"
        value={imageLink}
        onChange={e=>setImageLink(e.currentTarget.value)}
        placeholder="image link"
        />
      <input 
        type="text"
        value={releaseDate}
        onChange={e=>setReleaseDate(e.currentTarget.value)}
        placeholder="release date"
        />
      <input 
        type="text"
        value={genre}
        onChange={e=>setGenre(e.currentTarget.value)}
        placeholder="genre"
        />
      <button onClick={onCreate} >create anime</button>
    </>

  )
}

