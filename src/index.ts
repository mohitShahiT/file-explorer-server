import express from "express";
import { Request, Response } from "express-serve-static-core";
import folderRouter from "./folderRouter";
import { buildFolder } from "./utils";
import cors from "cors";
const app = express();

const PORT = 3000;

app.use(express.json());

app.use(cors());

app.use("/test", (req: Request, res: Response) => {
  console.log(req.headers);
  res.status(200).json({
    status: "success",
    message: "server is live",
  });
});

buildFolder();
app.use("/api/folder", folderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
