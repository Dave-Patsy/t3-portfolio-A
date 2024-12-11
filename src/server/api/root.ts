import { beethiveStripeRouter } from './routers/beethive/beethive-stripe';
import { beethiveUploadRouter } from './routers/beethive/upload';
import { songRouter as beethiveSongRouter } from "./routers/beethive/song";
import { exerciseRouter } from './routers/fitness/fitness';

import { videoRoute } from './routers/saas/video';
import { stripeRoute } from './routers/saas/stripe';
import { musicRoute } from './routers/saas/music';
import { imageRoute } from './routers/saas/image';
import { conversationRoute } from './routers/saas/conversation';
import { codeRoute } from './routers/saas/code';

import { registerRouter } from './routers/auth/register';
import { resetRouter } from './routers/auth/reset';
import { postRouter } from "@/server/api/routers/post";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { adminRouter } from "./routers/auth/admin";
import { settingsRouter } from "./routers/auth/settings";
import { portfolioRouter } from './routers/portfolio/contact';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: {
    adminRouter,
    settingsRouter,
    resetRouter,
    registerRouter,
  },
  WebForge: {
    codeRoute,
    conversationRoute,
    imageRoute,
    musicRoute,
    stripeRoute,
    videoRoute,
  },
  fitPulse: { exerciseRouter },
  beethive: { beethiveUploadRouter, beethiveSongRouter, beethiveStripeRouter },
  portfolio: portfolioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
