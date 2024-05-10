import { auth } from "@/server/auth";
import { type NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

import { db } from "@/server/db";

const utapi = new UTApi();

export async function POST(req: NextRequest) {
  const session = await auth();
  if(!session){
    return NextResponse.json({error:'Permission denied'},{status:403})
  }
  const data = await req.formData();

  const user = session?.user;
  const songRes = await utapi.uploadFiles(
    data.get("songFile") as unknown as File,
  );
  const imageRes = await utapi.uploadFiles(
    data.get("imageFile") as unknown as File,
  );
  let newRes;
  if (songRes.data?.key && imageRes.data?.key) {
  
    try {
      newRes = await db.songs.create({
        data: {
          title: data.get("title") as string,
          artist: data.get("author") as string,
          user: { connect: { id: user?.id } },
          song_path: songRes.data?.key,
          image_path: imageRes.data?.key,
        },
      });
    } catch (e) {}
  }
  

  return NextResponse.json(newRes);
}
