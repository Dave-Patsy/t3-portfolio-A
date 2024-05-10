import { testthing } from "@/schemas/spoty/upload";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const spotyUploadRouter = createTRPCRouter({
  uploadSong:protectedProcedure
  .input(testthing)
  .mutation(async(opts)=>{
    try{
      const {db} = opts.ctx
      const {input} = opts
      const res = await db.songs.create({
        data:{
          title: input.songData.title,
          artist: input.songData.artist,
          user:{connect:{id:opts.ctx.session.user.id}},
          song_path:input.clientUploadedFileData.at(0)!.key,
          image_path:input.clientUploadedFileData.at(1)!.key
        }
      })
      return res
    } catch(error){
      throw new TRPCError({code:'INTERNAL_SERVER_ERROR',message:'Something went wrong!'})
    }
    return 1
  })
})