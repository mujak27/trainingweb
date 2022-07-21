import crypto from 'crypto';


export const generateKey = ()  : string =>{
  return crypto.randomBytes(16).toString();
}