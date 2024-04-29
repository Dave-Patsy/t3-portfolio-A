import { db } from "@/server/db"

export const getTwoFactorConfirmationByUser = async (userId:string) =>{
  try{
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({where:{userId}})
    return twoFactorConfirmation
  } catch {
    return null
  }
}