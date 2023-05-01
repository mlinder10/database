import express, { Request } from "express";
import fs from "fs";
import { DocumentReqParams } from "../index";

const router = express.Router({ mergeParams: true });

router.get("/:document", (req: Request<DocumentReqParams>, res) => {
  try {
    const { dir, file, document } = req.params;
    let id = parseInt(document);
    if (typeof dir !== "string" || typeof file !== "string")
      return res.status(400).json("Invalid Path");
    const rawData = fs.readFileSync(`./data/${dir}/${file}.json`, {
      encoding: "utf-8",
    });
    const parsedData: any[] = JSON.parse(rawData);
    for (let d of parsedData) {
      if (d.id === id) return res.status(200).json(d);
    }
    return null;
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err?.message });
  }
});

router.post("/:document", (req: Request<DocumentReqParams>, res) => {
  try {
    const { dir, file, document } = req.params;
    const id = parseInt(document);
    const { data } = req.body;
    if (typeof dir !== "string" || typeof file !== "string")
      return res.status(400).json("Invalid Path");
    const rawData = fs.readFileSync(`./data/${dir}/${file}.json`, {
      encoding: "utf-8",
    });
    const parsedData: any[] = JSON.parse(rawData);
    parsedData.push({ id, ...data });
    fs.writeFileSync(`./data/${dir}/${file}.json`, JSON.stringify(parsedData), {
      encoding: "utf-8",
    });
    res.status(201).json({ id, ...data });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

router.delete("/:document", (req: Request<DocumentReqParams>, res) => {
  try {
    const { dir, file, document } = req.params;
    let id = parseInt(document);
    if (typeof dir !== "string" || typeof file !== "string")
      return res.status(400).json("Invalid Path");
    const rawData = fs.readFileSync(`./data/${dir}/${file}.json`, {
      encoding: "utf-8",
    });
    const parsedData: any[] = JSON.parse(rawData);
    const newData = [];
    for (let d of parsedData) {
      if (d.id !== id) {
        newData.push(d);
      }
    }
    fs.writeFileSync(`./data/${dir}/${file}.json`, JSON.stringify(newData), {
      encoding: "utf-8",
    });
    return res.status(202).json("Success");
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

export default router;
