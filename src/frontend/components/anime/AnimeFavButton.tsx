import { useMutation } from "@apollo/client";
import { Anime, AnimeFavorite } from "@prisma/client";
import React from "react";
import { useContextProvider } from "../../context/ContextProvider";
import { mutationCreateAnimeFavorite, mutationDeleteAnimeFavorite } from "../../lib/graphql/query";

type props={
  anime : Anime,
  fav : boolean,
  setFav : React.Dispatch<React.SetStateAction<boolean>>,
};

export const AnimeFavButton:React.FC<props> = ({anime, fav, setFav}) => {

  const {user} = useContextProvider();
  const [createAnimeFavorite] = useMutation(mutationCreateAnimeFavorite);
  const [deleteAnimeFavorite] = useMutation(mutationDeleteAnimeFavorite);

  const onClick = ()=>{
    if(!fav){
      createAnimeFavorite({
        variables:{
          input:{
            animeAnimeId : anime.animeId,
            userUserId : user.userId
          } as AnimeFavorite
        }
      })
      setFav(true);
    }else{
      deleteAnimeFavorite({
        variables:{
          input:{
            animeAnimeId : anime.animeId,
            userUserId : user.userId
          } as AnimeFavorite
        }
      })
      setFav(false);
    }
  }

  return (
    <button onClick={onClick}>
      {
        fav ? <>unfav</> : <>Fav</>
      }
    </button>
  )
}

