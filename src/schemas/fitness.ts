import { z } from "zod";

const routineSchema = z.object({
  name:z.string(),
  circuit: z.array(
    z.object({
      type: z.string().nullable().nullish(),
      setGroup: z.array(
        z.object({
          exercise: z.string(),
          set: z.array(
            z.object({
              weight: z.number(),
              reps: z.number(),
            }),
          ),
        }),
      ),
    }),
  ),
});

const routineEventSchema = z.object({
  date: z.date({
    required_error: "A date is required.",
  }),
  routine:z.string()
});
export { routineSchema, routineEventSchema };