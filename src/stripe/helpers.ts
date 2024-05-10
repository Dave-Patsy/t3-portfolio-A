
import { env } from "@/env";
import type { Prices } from "@prisma/client";

export const getURL = () => {
  // const thing = new URL(`${process?.env?.NEXT_PUBLIC_VERCEL_URL}`);
  let url =
    // process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    env.NEXT_PUBLIC_VERCEL_URL; // Automatically set by Vercel.
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;
  return url;
};

export const postData = async ({
  url,
  data,
}: {
  url: string;
  data?: { price: Prices };
}) => {
  console.log("posting,", url, data);

  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log("Error in postData", { url, data, res });

    throw Error(res.statusText);
  }

  return res.json();
};

export const toDateTime = (secs: number) => {
  const t = new Date("1970-01-01T00:30:00Z"); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};
