// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// import { User as prismaUser } from '@prisma/client';
import bcrypt from 'bcrypt';
import { inputObjectType, mutationField, nonNull, nullable } from "nexus";
import { Anime, AnimeFavorite, Session, User } from "..";
import { generateKey } from '../../../utils/functions';
import { NexusGenObjects } from '../../types';

const sessionData : Array<{
  key : string
  value : NexusGenObjects['User']
}> = [];

export const createUser = mutationField("createUser", {
  type: nullable(User),
  args: {
    where: nonNull(inputObjectType({
      name: 'createUser',
      definition(t){
        t.nonNull.string('userName')
        t.nonNull.string('userEmail')
        t.nonNull.string('userPassword')
      }
    }))
  },
  resolve: async (_, args, context)=>{
    const userData = {...args.where};
    userData.userPassword = await bcrypt.hash(userData.userPassword, 10);
    return context.prisma.user.create({
      data: {
      ...userData
      }
    })
  }
})

export const updateUser = mutationField("updateUser", {
  type: nullable(User),
  resolve: async (_, args, context)=>{
    return null;
  }
})

export const deleteUser = mutationField("deleteUser", {
  type: nullable(User),
  resolve: async (_, args, context)=>{
    return null;
  }
})

export const createAnime = mutationField("createAnime", {
  type: nullable(Anime),
  args: {
    where : nonNull(inputObjectType({
      name: 'createAnime',
      definition(t){
        t.nonNull.string('animeName')
        t.nonNull.string('animeImageLink')
        t.nonNull.string('animeReleaseDate')
        t.nonNull.string('animeGenre')
      }
    }))
  },
  resolve: async (_, args, context)=>{
    return context.prisma.anime.create({
      data : {
        ...args.where
      }
    })
  }
})


export const updateAnime = mutationField("updateAnime", {
  type: nullable(Anime),
  resolve: async (_, args, context)=>{
    return null;
  }
})

export const deleteAnime = mutationField("deleteAnime", {
  type: nullable(Anime),
  resolve: async (_, args, context)=>{
    return null;
  }
})

export const createAnimeFavorite = mutationField("createAnimeFavorite", {
  type: nullable(AnimeFavorite),
  args: {
    where: nonNull(inputObjectType({
      name: 'createAnimeFavorite',
      definition(t){
        t.nonNull.id('userUserId')
        t.nonNull.id('animeAnimeId')
      }
    }))
  },
  resolve: async (_, args, context) => {
    return context.prisma.animeFavorite.create({
      data : {
        ...args.where
      }
    })
  }
})

export const deleteAnimeFavorite = mutationField("deleteAnimeFavorite", {
  type: nullable(AnimeFavorite),
  args: {
    where: nonNull(inputObjectType({
      name: 'deleteAnimeFavorite',
      definition(t){
        t.nonNull.id('animeFavoriteId')
      }
    }))
  },
  resolve: async (_, args, context)=>{
    return context.prisma.animeFavorite.delete({
      where: {
        animeFavoriteId : args.where.animeFavoriteId
      }
    })
  }
})

export const login = mutationField("login", {
  type: nullable(Session),
  args:{
    where: nonNull(inputObjectType({
      name: 'login',
      definition(t){
        t.nonNull.string('userEmail')
        t.nonNull.string('userPassword')
      }
    }))
  },
  resolve : async (_, args, context)=>{
    const user = await context.prisma.user.findFirst({
      where:{
        userEmail : args.where.userEmail
      }
    })
    if(!user) return null;
    const check = await bcrypt.compare(args.where.userPassword, user.userPassword);
    if(!check) return null;

    const key = generateKey();
    sessionData.push({
      key,
      value : user
    })
    console.log(sessionData);
    const session : NexusGenObjects['Session'] = {
      sessionKey : key
    }
    return session;
  }
})

export const getSessionData = mutationField('getSessionData', {
  type: nullable(User),
  args : {
    where : nonNull(inputObjectType({
      name: 'getSessionData',
      definition(t){
        t.nonNull.string('sessionKey')
      }
    }))
  },
  resolve: async (_, args, context)=>{
    const users = sessionData.filter((data)=>{return data.key === args.where.sessionKey});
    if(!users) return null;
    const user = users[0].value;
    return user;
  }
})