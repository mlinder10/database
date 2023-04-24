import express from "express";
import cors from "cors";
import projectRouter from "./routes/project";
import clusterRouter from "./routes/cluster";
import documentRouter from "./routes/document";
const port = process.env.PORT || 3000;
import { ParamsDictionary } from "express-serve-static-core";

export interface ClusterReqParams extends ParamsDictionary {
  dir: string;
  file: string;
}

export interface DocumentReqParams extends ParamsDictionary {
  dir: string;
  file: string;
  document: string;
}

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", projectRouter);
app.use("/:dir", clusterRouter);
app.use("/:dir/:file", documentRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
