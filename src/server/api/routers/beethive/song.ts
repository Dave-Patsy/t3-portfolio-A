import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { z } from "zod";

export const songRouter = createTRPCRouter({
  getSongs: publicProcedure.query(async (opts) => {
    try {
      const { db } = opts.ctx;

      const songs = await db.songs.findMany({
        // select:{
        //   artist:true,
        //   title:true,
        //   image_path:true,
        //   song_path:true,
        // }
      });

      return songs;
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  searchSongs: publicProcedure
    .input(
      z.object({
        searchParam: z.string(),
      }),
    )
    .mutation(async (opts) => {
      try {
        return await opts.ctx.db.songs.findMany({
          where: {
            title: {
              startsWith: opts.input.searchParam,
              mode:'insensitive'
            },
          },
        });
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  getLikedSongs: protectedProcedure.query(async (opts) => {
    try {
      const x = await opts.ctx.db.user.findFirst({
        where: {
          id: opts.ctx.session.user.id,
        },
        select: {
          favorites: true,
        },
      });
      return x?.favorites;
    } catch (e) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  updateLikedSongs: protectedProcedure
    .input(
      z.object({
        songId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      // console.log("liking a song");
      try {
        const x = await opts.ctx.db.user.update({
          where: {
            id: opts.ctx.session.user.id,
          },
          data: {
            favorites: {
              connect: {
                id: opts.input.songId,
              },
            },
          },
          select: {
            favorites: { where: { id: opts.input.songId } },
          },
        });
        const j = x.favorites.at(0);
        return j;
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  deleteLikedSongs: protectedProcedure
    .input(
      z.object({
        songId: z.string(),
      }),
    )
    .mutation(async (opts) => {
      try {
        const x = await opts.ctx.db.user.update({
          where: {
            id: opts.ctx.session.user.id,
          },
          data: {
            favorites: {
              disconnect: {
                id: opts.input.songId,
              },
            },
          },
        });
        return x;
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  getPlaylist: protectedProcedure.query(async (opts) => {
    try {
      const x = await opts.ctx.db.user.findFirst({
        where: {
          id: opts.ctx.session.user.id,
        },
        select: {
          playlist: true,
        },
      });
      return x!.playlist;
    } catch (e) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  addPlaylist: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(30),
      }),
    )
    .query(async (opts) => {
      try {
        const x = await opts.ctx.db.playlist.create({
          data: {
            name: opts.input.name,
            userId: opts.ctx.session.user.id,
          },
        });
        return x;
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});