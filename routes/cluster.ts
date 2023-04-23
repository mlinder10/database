import fs from "fs";
import express from "express";
import { Request } from "express";
import { ClusterReqParams, ParsedData } from "../index";

const router = express.Router({ mergeParams: true });

router.get("/:cluster", (req: Request<ClusterReqParams>, res) => {
  try {
    const { file, cluster } = req.params;
    if (typeof file !== "string" || typeof cluster !== "string")
      return res.status(400).json("Invalid Path");
    const rawData = fs.readFileSync(`./data/${file}`, { encoding: "utf-8" });
    const parsedData: ParsedData = JSON.parse(rawData);
    return res.status(200).json(parsedData[cluster]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

router.post("/:cluster", (req: Request<ClusterReqParams>, res) => {
  try {
    const { file, cluster } = req.params;
    const { data } = req.body;
    if (typeof file !== "string" || typeof cluster !== "string")
      return res.status(400).json("Invalid Path");
    const rawData = fs.readFileSync(`./data/${file}`, { encoding: "utf-8" });
    const parsedData: ParsedData = JSON.parse(rawData);
    parsedData[cluster] = JSON.parse(data);
    fs.writeFileSync(`./data/${file}`, JSON.stringify(parsedData), {
      encoding: "utf-8",
    });
    res.status(201).json("Success");
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

router.delete("/:cluster", (req: Request<ClusterReqParams>, res) => {
  try {
    const { file, cluster } = req.params;
    if (typeof file !== "string" || typeof cluster !== "string")
      return res.status(400).json("Invalid Path");
    const rawData = fs.readFileSync(`./data/${file}`, { encoding: "utf-8" });
    const parsedData: ParsedData = JSON.parse(rawData);
    parsedData[cluster] = null;
    fs.writeFileSync(`./data/${file}`, JSON.stringify(parsedData), {
      encoding: "utf-8",
    });
    res.status(202).json("success");
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

export default router;
