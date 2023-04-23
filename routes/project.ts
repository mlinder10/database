import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/:file", (req, res) => {
  try {
    const { file } = req.params;
    if (typeof file !== "string") return res.status(400).json("Invalid file");
    const rawData = fs.readFileSync(`./data/${file}`, "utf8");
    return res.status(200).json(JSON.parse(rawData));
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

router.post("/:file", (req, res) => {
  try {
    const { file } = req.params;
    const data: string = req.body.data;
    if (typeof file !== "string") return res.status(400).json("Invalid file");
    fs.writeFileSync(`./data/${file}`, data, {
      encoding: "utf-8",
    });
    return res.status(201).json("Success");
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

router.delete("/:file", (req, res) => {
  try {
    const { file } = req.params;
    if (typeof file !== "string") return res.status(400).json("Invalid file");
    fs.writeFileSync(`./data/${file}`, "", { encoding: "utf-8" });
    return res.status(202).json("Success");
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

export default router;
