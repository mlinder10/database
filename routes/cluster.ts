import fs from "fs";
import express, { Request } from "express";
import { ClusterReqParams } from "../index";

const router = express.Router({ mergeParams: true });

router.get("/:file", (req: Request<ClusterReqParams>, res) => {
  try {
    const { dir, file } = req.params;
    if (typeof dir !== "string" || typeof file !== "string")
      return res.status(400).json("Invalid Path");
    const rawData = fs.readFileSync(`./data/${dir}/${file}.json`, {
      encoding: "utf-8",
    });
    return res.status(200).json(JSON.parse(rawData));
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

router.post("/:file", (req: Request<ClusterReqParams>, res) => {
  try {
    const { dir, file } = req.params;
    if (typeof dir !== "string" || typeof file !== "string")
      return res.status(400).json("Invalid Path");
    fs.writeFileSync(`./data/${dir}/${file}.json`, JSON.stringify([]), {
      encoding: "utf-8",
    });
    res.status(201).json([]);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

router.delete("/:file", (req: Request<ClusterReqParams>, res) => {
  try {
    const { dir, file } = req.params;
    if (typeof dir !== "string" || typeof file !== "string")
      return res.status(400).json("Invalid Path");
    fs.rmSync(`./data/${dir}/${file}.json`);
    res.status(202).json("success");
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

export default router;
