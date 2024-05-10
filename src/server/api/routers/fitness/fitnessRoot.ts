import { exerciseRouter } from './fitness';
import { createTRPCRouter } from "../../trpc";


export const fitnessRoot = createTRPCRouter({
  exerciseRouter
})