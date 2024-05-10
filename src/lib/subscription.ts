import type { Session } from "next-auth";
import { db } from "@/server/db";

type SessionParam = Session | null;

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (session: SessionParam) => {
  if (!session) {
    return false;
  }

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
