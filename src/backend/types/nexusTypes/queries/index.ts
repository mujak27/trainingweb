import { inputObjectType, list, nonNull, queryField } from "nexus";
import { Anime, AnimeFavorite, User } from "..";



export const users = queryField("users",{
  type: nonNull(list(nonNull(User))),
  resolve: async (_root, _args, ctx)=>{
    return ctx.prisma.user.findMany({})
  }
})

export const animes = queryField("animes",{
  type: nonNull(list(nonNull(Anime))),
  resolve: (_root, _args, context)=>{
    return context.prisma.anime.findMany({})
  }
})

export const animeFavorites = queryField("animeFavorites", {
  type: nonNull(list(nonNull(AnimeFavorite))),
  resolve: (_root, _args, context )=>{
    return context.prisma.animeFavorite.findMany({})
  }
})

export const animeFavoritedByUser = queryField("animeFavoritedByUser", {
  type: nonNull(list(nonNull(AnimeFavorite))),
  args: {
    input : nonNull(inputObjectType({
      name : 'animeFavoritedByUser',
      definition(t){
        t.nonNull.id('userUserId')
      }
    }))
  },
  resolve: (_root, args, context) => {
    return context.prisma.animeFavorite.findMany({
      where: {
        userUserId : args.input.userUserId
      }
    })
  }
})