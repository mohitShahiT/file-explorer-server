import express from "express"
import { Request, Response } from "express-serve-static-core";
import { createFile, getFileWithId, getItemWithId } from "./utils";
const router = express.Router();

router.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("No file id provided");
    }
    const file = getFileWithId(id);
    res.status(200).json({
      status: "success",
      data: {
        file,
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

router.post(
  "/",
  (
    req: Request<{}, {}, { fileName: string; parentId: string }>,
    res: Response
  ) => {
    try {
      const { fileName, parentId } = req.body;
      if (!fileName || !parentId) {
        throw new Error(
          "Bad params: both fileName and parentId is required to create a new file"
        );
      }

      const newFile = createFile(fileName, parentId);
      res.status(200).json({
        status: "success",
        data: {
          file: newFile,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }
);


export default router;