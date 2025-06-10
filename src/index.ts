import express from "express";
import { Request, Response } from "express-serve-static-core";
import folderRouter from "./router/folderRouter";
import fileRouter from "./router/fileRouter";
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
function bootstrap() {
  buildFolder();
}
bootstrap();
app.use("/api/folder", folderRouter);
app.use("/api/file", fileRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
