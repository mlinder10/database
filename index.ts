import express from "express";
import cors from "cors";
import projectRouter from "./routes/project";
import clusterRouter from "./routes/cluster";
const port = process.env.PORT || 3000;
import { ParamsDictionary } from "express-serve-static-core";

export type ParsedData = {
  [key: string]: any;
};

export interface ClusterReqParams extends ParamsDictionary {
  file: string;
  cluster: string;
}

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/", projectRouter);
app.use("/:file", clusterRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
