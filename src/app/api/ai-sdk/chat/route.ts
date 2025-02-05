/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  
  // @ts-ignore
  const { messages } = await req.json();
  
  const result = streamText({
    model: openai("gpt-4o"),
    // @ts-ignore
    messages,
  });

  return (await result).toDataStreamResponse();
}
