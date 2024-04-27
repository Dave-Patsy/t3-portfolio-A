import { db } from "@/server/db"


export const getVerificationTokenByToken = async(token:string)=>{

  try{
    const verificationToken = db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken
  } catch(e){
    return null
  }
}
export const getVerificationTokenByEmail = async(email:string)=>{

  try{
    const verificationToken = db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken
  } catch(e){
    return null
  }
}