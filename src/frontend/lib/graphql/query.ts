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

export const mutationLogin = gql`
  mutation login($where: login!){
    login(where: $where){
      sessionKey
    }
  }
`

export const mutationGetSessionData = gql`
  mutation getSessionData($where: getSessionData!){
    getSessionData(where : $where){
      userId
      userName
      userEmail
    }
  }
`