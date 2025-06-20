import { files, folders, ROOT_ID } from "./folder";
import { File, FileKinds, Folder, Item } from "./types";
import { nanoid } from "nanoid";

export function getItemsWithIds(
  itemIds: string[],
  itemType?: Item
): (Folder | File)[] {
  let matchedItems: (Folder | File)[] = [];
  if (!itemType) {
    matchedItems = [...folders, ...files].filter(({ id }) =>
      itemIds.includes(id)
    );
  } else if (itemType === "Folder") {
    matchedItems = [...folders].filter(({ id }) => itemIds.includes(id));
  } else if (itemType === "File") {
    matchedItems = [...files].filter(({ id }) => itemIds.includes(id));
  }

  return matchedItems;
}

export function getFoldersWithIds(ids: string[]) {
  return getItemsWithIds(ids, "Folder") as Folder[];
}

export function getFilesWithIds(ids: string[]) {
  return getItemsWithIds(ids, "File") as File[];
}

export function getItemWithId(itemId: string, itemType?: Item): Folder | File {
  if (!itemType) {
    return [...folders, ...files].find((item) => item.id === itemId);
  } else if (itemType === "Folder") {
    return [...folders].find(({ id }) => id === itemId);
  } else if (itemType === "File") {
    return [...files].find(({ id }) => id === itemId);
  }
  return null;
}

export function getFolderWithId(id: string) {
  return getItemWithId(id, "Folder") as Folder;
}

export function getFileWithId(id: string) {
  return getItemWithId(id, "File") as File;
}

export function isNameAvailable(parentId: string, newName: string): boolean {
  const parentFolder = getFolderWithId(parentId);
  if (!parentFolder)
    throw new Error(`No folder with that parent id found(${parentId})`);
  const childrenFolders = getItemsWithIds(parentFolder.children);
  for (const child of childrenFolders) {
    if (child.name === newName) return false;
  }
  return true;
}

export function createFolder(name: string, parentId: string): Folder {
  const parentFolder = getFolderWithId(parentId) as Folder;
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
  //Check 1: If the parentId is valid
  const parentFolder = getItemWithId(parentId) as Folder;
  if (!parentFolder)
    throw new Error(`No folder with that parent id found(${parentId})`);

  //Check 2: If the filename is available in the parent folder
  if (!isNameAvailable(parentId, name))
    throw new Error(
      `Name not available, there might be an item with the same name(${name}) in the provided parent folder ${parentFolder.name} (id: ${parentId})`
    );
  const _fileName = name.split(".");

  //Check 3: If the file name does not contain atleast two words separted by period(.)
  if (_fileName.length <= 1) {
    throw new Error("Invalid filename: filename with no extension provided");
  }

  // Getting the file extension and the rest of the file name i.e user.controller.js results in
  // extension = js and names = [controller, user]
  const [extension, ..._names] = _fileName.reverse();

  //Check 4: If the file extension is in the supported file kinds
  if (!FileKinds[extension]) {
    throw new Error("Unsupported file extension provided");
  }
  //Reconstructing the filename
  // [...[controller, user], js] => user.controller.js
  const fileName = [..._names.reverse(), extension].join(".");

  //Create a new file object
  const id = nanoid();
  const createdAt = Date.now();
  const randomSize = Math.ceil(Math.random() * 20);
  const newFile: File = {
    id,
    name: fileName,
    createdAt,
    size: randomSize,
    kind: FileKinds[extension],
  };

  //Add new file into parent's children
  parentFolder.children.push(newFile.id);

  //Add to file array
  files.push(newFile);
  return newFile;
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
  createFile("index.jsx", srcId);
  createFile("app.jsx", srcId);

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
      if (childItem.name === itemName) {
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
