import { Router } from "express";
import { Request, Response } from "express-serve-static-core";
import { folders } from "./folder";
import { createFolder, getRootFolder } from "./utils";
const router = Router();

interface PathQuery {
  path: string;
}

interface CreateFolderBody {
  id: string;
  name: string;
}

router.get("/", (req: Request<{}, {}, {}, PathQuery>, res: Response) => {
  try {
    const { path } = req.query;
    if (!path) {
      res.status(200).json({
        status: "success",
        data: {
          rootFolder: getRootFolder(),
        },
      });
      return;
    }
    const folderPath = path.split("/");
    res.status(200).json({
      status: "success",
      data: {
        folders,
        folderPath,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
});

router.post("/", (req: Request<{}, {}, CreateFolderBody>, res: Response) => {
  try {
    const { id, name } = req.body;
    if (!id || !name)
      res.status(400).json({
        status: "fail",
        message: "Folder creation requires both parent id and folder name",
      });
    const newFolder = createFolder(name, id);
    res.status(201).json({
      status: "success",
      message: "Folder successfully created",
      data: {
        folder: newFolder,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

export default router;
