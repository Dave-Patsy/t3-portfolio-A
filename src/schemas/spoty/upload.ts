import {type ClientUploadedFileData } from "uploadthing/types";
import { z } from "zod";

const songSchema = z.object({
  title: z.string(),
  artist: z.string(),
})

export const uploadSongFormSchema = z.object({
  title: z.string(),
  artist: z.string(),
  songFile: z.custom<File>((v) => v instanceof File, {
    message: "Image is required",
  }),
  imageFile: z.custom<File>((v) => v instanceof File, {
    message: "Image is required",
  }),
});

export const uploadAlbumSchema = z.object({
  title: z.string(),
  artist: z.string(),
  release: z.date().nullable(),
  songs: uploadSongFormSchema.array(),
});

export const testthing = z.object({
  clientUploadedFileData: z.custom<abc>(),
  songData: songSchema,
});

type abc = ClientUploadedFileData<{
  uploadedBy: string;
}>[];
