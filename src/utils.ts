import { files, folders, ROOT_ID } from "./folder";
import { File, FileKinds, Folder } from "./types";
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

export function createFile(name: string, parentId: string) {
  const nameArr = name.split(".");
  // if(nameArr.length >)
  // if(!extension) {

  // }
}

export function getRootFolder() {
  return getItemWithId(ROOT_ID);
}

function isFolderId(itemId: string) {
  const folder = folders.find((fldr) => fldr.id === itemId);
  return folder ? true : false;
}

export function getChildItems(parentId: string) {
  const parentItem = getItemWithId(parentId) as Folder;
  if (!parentItem.children)
    throw new Error("Provided parentId does not belong to a folder");
  const _childItems = getItemsWithIds(parentItem.children);
  const childItems = _childItems.map((item) => {
    return {
      ...item,
      isFolder: isFolderId(item.id),
    };
  });
  return childItems;
}
type Children = string[];
type FolderStructure = [string, Children] | [string, FolderStructure];

function createFolderDelay(
  name: string,
  rootId: string,
  cb: (name: string, rootId: string) => Folder
) {
  return function () {
    return cb(name, rootId);
  };
}

export function buildFolder() {
  const { id: docId } = createFolderDelay("documents", ROOT_ID, createFolder)();
  const { id: downId } = createFolder("downloads", ROOT_ID);
  const { id: picId } = createFolder("pictures", ROOT_ID);

  const { id: projectsId } = createFolder("projects", docId);
  const { id: reactapp } = createFolder("react app", docId);
  createFolder("src", reactapp);
  const { id: reactId } = createFolder("react app", projectsId);
  const { id: srcId } = createFolder("src", reactId);

  const { id: impId } = createFolder("important docs", docId);

  const { id: markId } = createFolder("marksheets", impId);
}

export function getItemWithPath(pathArray: string[]) {
  const pathIdArray = [];
  let currentId = getRootFolder().id;
  for (const itemName of pathArray.slice(1)) {
    pathIdArray.push(currentId);
    const currentItem = getItemWithId(currentId) as Folder;
    if (!currentItem.children && pathArray[pathArray.length - 1] !== itemName) {
      throw new Error(
        "Invalid path provided a file should only at the end of the path!"
      );
    }
    let found = false;
    for (const childId of currentItem.children) {
      const childItem = getItemWithId(childId);
      console.log(childItem.name, itemName);
      if (childItem.name === itemName) {
        console.log("match", childItem.name, itemName);
        pathIdArray.push();
        currentId = childItem.id;
        found = true;
        break;
      }
    }
    if (!found) throw new Error("Invalid path provided!");
  }
  pathIdArray.push(currentId);

  const contents = getChildItems(currentId);
  return contents;
}

[
  "root",
  ["Documents", ["Projects", ["React App", "src"]], "Downloads", "Pictures"],
];
