import { objectType } from 'nexus'

export const Session = objectType({
  name: 'Session',
  definition(t){
    t.nonNull.string('sessionKey')
  }
})

export const User = objectType({
  name: 'User',
  definition(t){
    t.nonNull.id('userId')
    t.nonNull.string('userName')
    t.nonNull.string('userEmail')
    t.nonNull.string('userPassword')
  }
})

export const Anime = objectType({
  name: 'Anime',
  definition(t){
    t.nonNull.id('animeId')
    t.nonNull.string('animeName')
    t.nonNull.string('animeImageLink')
    t.nonNull.string('animeReleaseDate')
    t.nonNull.string('animeGenre')
  }
})

export const AnimeFavorite = objectType({
  name: 'AnimeFavorite',
  definition(t){
    t.nonNull.id('animeFavoriteId')
    t.nonNull.id('userUserId')
    t.nonNull.id('animeAnimeId')
  }
})