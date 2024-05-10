import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { z } from "zod";
import { routineEventSchema, routineSchema } from "@/schemas/fitness";

export const exerciseRouter = createTRPCRouter({
  getExercises: publicProcedure.query(async (opts) => {
    try {
      const res = await opts.ctx.db.exercise.findMany();
      return res;
    } catch (error) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  createExercise: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().min(10).max(100),
      }),
    )
    .mutation(async (opts) => {
      try {
        const res = await opts.ctx.db.exercise.create({
          data: {
            name: opts.input.name,
            description: opts.input.description,
          },
        });
        return res;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  getRoutines:protectedProcedure
  .query(async(opts)=>{
    try{
      return await opts.ctx.db.routine.findMany()
    } 
    catch(e){throw new TRPCError({code:'INTERNAL_SERVER_ERROR'})}
  }),
  getRoutine: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async (opts) => {
      try {
        const x = await opts.ctx.db.routine.findFirst({
          where: {
            id: opts.input.id,
          },
          include: {
            circuit: {
              include: { setGroup: { include: { setDetails: true } } },
            },
          },
        });
        return x;
      } catch {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  getRoutineEvents:protectedProcedure
  .query(async(opts)=>{
    try{
      return await opts.ctx.db.routineEvent.findMany({
        include:{
          routine:true
        }
      })
    } catch(e){
      throw new TRPCError({code:'INTERNAL_SERVER_ERROR'})
    }
  }),
  createRoutineEvent:protectedProcedure
  .input(routineEventSchema)
  .mutation(async(opts)=>{
    try{
      await opts.ctx.db.routineEvent.create({
        data:{
          date:opts.input.date,
          routineId:opts.input.routine,
          completed:false
        }
      })
    } catch(e){
      throw new TRPCError({code:'INTERNAL_SERVER_ERROR'})
    }
  }),
  createRoutine:protectedProcedure
    .input(
      routineSchema
  )
  .mutation(async(opts)=>{
    try{
      console.log(opts.input.circuit)
      console.log(opts.input.circuit.at(0)?.setGroup.at(0)?.exercise)
      await opts.ctx.db.$transaction(async(db)=>{
        const routine = await db.routine.create({data:{title:opts.input.name}})

        for(const x of opts.input.circuit){
          const circuit = await db.circuit.create({
            data:{
              routineId:routine.id,
              type:'STRAIGHT'
            }
          })
          for(const y of x.setGroup){
            const setGroup = await db.setGroup.create({
              data:{
                circuitId:circuit.id,
              
                exerciseId: y.exercise
              }
            })
            for(const z of y.set){
              await db.set.create({
                data:{
                  reps: z.reps,
                  weight: z.weight,
                  setGroupId: setGroup.id
                }
              })
            }
          }
        }
      })
      return null
    }catch(e){
      throw new TRPCError({code:'INTERNAL_SERVER_ERROR'})
    }
  }),
  getSet: protectedProcedure

    .query(async (opts) => {
      try {
        const x = await opts.ctx.db.set.findMany({
          where: {
            completed: {
              not: null,
            },
          },
        });
        return x;
      } catch {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});