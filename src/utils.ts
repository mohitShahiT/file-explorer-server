import { files, folders, ROOT_ID } from "./folder";
import { File, Folder } from "./types";
import { nanoid } from "nanoid";

export function getItemsWithIds(itemIds: string[]): (Folder | File)[] {
  const matchedFolders: (Folder | File)[] = [...folders, ...files].filter(
    ({ id }) => itemIds.includes(id)
  );
  return matchedFolders;
}

export function getItemWithId(folderId: string): Folder | File {
  return folders.find((folder) => folder.id === folderId);
}

export function isNameAvailable(parentId: string, newName: string): boolean {
  const parentFolder = getItemWithId(parentId) as Folder;
  if (!parentFolder)
    throw new Error(`No folder with that parent id found(${parentId})`);
  const childrenFolders = getItemsWithIds(parentFolder.children);
  for (const child of childrenFolders) {
    if (child.name === newName) return false;
  }
  return true;
}

export function createFolder(name: string, parentId: string): Folder {
  const parentFolder = getItemWithId(parentId) as Folder;
  if (!parentFolder)
    throw new Error(`No folder with that parent id found(${parentId})`);
  if (!isNameAvailable(parentId, name))
    throw new Error(
      `Name not available, there might be an item with the same name(${name}) in the provided parent id(${parentId})`
    );
  const id = nanoid();
  const createdAt = Date.now();
  //create a new folder
  const newFolder: Folder = {
    id,
    name,
    createdAt,
    children: [],
  };
  // add the folder as parent's child
  parentFolder.children.push(id);
  // add the new folder to the folders array
  folders.push(newFolder);

  return newFolder;
}

export function getRootFolder() {
  return getItemWithId(ROOT_ID);
}

export function buildFolder() {
  const documentsId = createFolder("Documents", ROOT_ID);
  const downloadsId = createFolder("Downloads", ROOT_ID);
  const picturesId = createFolder("Pictures", ROOT_ID);
}
