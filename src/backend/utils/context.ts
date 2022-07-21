import { PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express";
import { Request, Response } from "express";
import {prisma} from '../clients/prisma'



export interface Context {
  request : Request
  response : Response
  prisma : PrismaClient
}

export const createContext = async (request : ExpressContext) : Promise<Partial<Context>>=>{
  
  const context : Context = {
    ...request,
    request : request.req,
    response : request.res,
    prisma : prisma,
  }

  return context;

}