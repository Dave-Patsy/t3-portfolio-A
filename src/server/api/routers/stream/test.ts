
import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { z } from "zod";

import { openai } from "@ai-sdk/openai";
import {streamText, tool } from "ai";

type messageType = NonNullable<Parameters<typeof streamText>[0]["messages"]>
const testTest = z.custom <messageType>();

export const messageSchema = z.array(
  z.object({
    role: z.enum(["system", "user", "assistant", "function", "data", "tool"]),
    content: z.string(),
  }),
); 

export const streamRouter = createTRPCRouter({
  stream: publicProcedure
    .input(
      z.object({
        messages: messageSchema,
      }),
    )
    .mutation(async function*  ({ input, ctx }) {
      try {
        console.log("trying stream mutation");
        const result = streamText({
          model: openai("gpt-4o"),
          messages: input.messages as unknown as messageType,
          tools: {
            weather: tool({
              description: "Get the weather in a location (fahrenheit)",
              parameters: z.object({
                location: z
                  .string()
                  .describe("The location to get the weather for"),
              }),
              execute: async ({ location }) => {
                const temperature = Math.round(Math.random() * (90 - 32) + 32);
                return {
                  location,
                  temperature,
                };
              },
            }),
            convertFahrenheitToCelsius: tool({
              description: "Convert a temperature in fahrenheit to celsius",
              parameters: z.object({
                temperature: z
                  .number()
                  .describe("The temperature in fahrenheit to convert"),
              }),
              execute: async ({ temperature }) => {
                const celsius = Math.round((temperature - 32) * (5 / 9));
                return {
                  celsius,
                };
              },
            }),
          },
        });
        // console.log(`result: ${(await result).toTextStreamResponse}`)
        console.log(" streaming result");
        // @ts-ignore
        for await (const chunk of await result.fullStream) {
          // Yield each chunk to stream it to the client
          yield chunk;
        }
        // Stream the response to the client
        // const { readable, writable } = new TransformStream();
        // const writer = writable.getWriter();

        // (async () => {
        //   try {
        //     for await (const chunk of (await result).fullStream) {
        //       await writer.write(chunk);
        //     }
        //   } catch (error) {
        //     console.error("Error during streaming:", error);
        //   } finally {
        //     writer.close();
        //   }
        // })();

        // return readable; // tRPC will automatically send this as a streamed response

        // const { readable, writable } = new TransformStream();
        // const writer = writable.getWriter();

        // (async () => {
        //   try {
        //     for await (const chunk of result.toDataStream()) {
        //       console.log("Writing chunk:", chunk);
        //       await writer.write(chunk);
        //     }
        //   } catch (streamError) {
        //     console.error("Error during streaming:", streamError);
        //   } finally {
        //     writer.close(); // Ensure the writer is closed even if an error occurs
        //   }
        // })();

        // return readable; // Return the readable stream to the client
        // @ts-ignore
        // return await result.toDataStreamResponse(); // tRPC will handle sending it as part of the streaming link.
      } catch (error) {
        console.error("Error streaming response:", error);
        throw new Error("Failed to stream the response.");
      }
    }),
});
