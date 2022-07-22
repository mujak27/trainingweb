import { gql } from "@apollo/client";

export const queryUsers = gql`
query{
  users{
    userId
    userName
  }
}
`

export const queryAnimes = gql`
query{
  animes{
    animeId
    animeName
    animeImageLink
    animeReleaseDate
    animeGenre
  }
}
`

export const queryAnimesFavoritedByUser = gql`
  query animeFavoritedByUser($input : animeFavoritedByUser!){
    animeFavoritedByUser(input: $input){
      animeFavoriteId
      userUserId
      animeAnimeId
    }
  }
`

export const mutationCreateAnime = gql`
  mutation createAnime($input: createAnime!){
    createAnime(input: $input){
      animeId
    }
  }
`

export const mutationCreateAnimeFavorite = gql`
  mutation crateAnimeFavorite($input: createAnimeFavorite!){
    createAnimeFavorite(input: $input){
      animeFavoriteId
    }
  }
`


export const mutationDeleteAnimeFavorite = gql`
  mutation deleteAnimeFavorite($input : deleteAnimeFavorite!){
    deleteAnimeFavorite(input: $input){
      animeAnimeId
    }
  }
`




export const mutationLogin = gql`
  mutation login($input: login!){
    login(input: $input){
      sessionKey
    }
  }
`

export const mutationGetSessionData = gql`
  mutation getSessionData($input: getSessionData!){
    getSessionData(input : $input){
      userId
      userName
      userEmail
    }
  }
`