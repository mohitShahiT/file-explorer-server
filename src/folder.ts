import { nanoid } from "nanoid";
import { Folder, File } from "./types";
export const ROOT_ID = nanoid();

export const folders: Folder[] = [
  {
    id: ROOT_ID,
    name: "root",
    createdAt: Date.now(),
    children: [],
  },
];

export const files: File[] = [];
