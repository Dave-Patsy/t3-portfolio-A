import "server-only";
import type { Session } from "next-auth";
import { MAX_FREE_COUNTS } from "@/constants";
import { db } from "@/server/db";

type SessionParam = Session | null;

export const incrementApiLimit = async (session: SessionParam) => {
  if (!session) {
    return;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: { userId: session.user.id },
  });

  if (userApiLimit) {
    await db.userApiLimit.update({
      where: { userId: session.user.id },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await db.userApiLimit.create({
      data: { userId: session.user.id, count: 1 },
    });
  }
};

export const checkApiLimit = async (session: SessionParam) => {
  if (!session) {
    return false;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: { userId: session.user.id },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async (session: SessionParam) => {
  if (!session) {
    return 0;
  }

  const userApiLimit = await db.userApiLimit.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};
