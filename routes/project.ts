import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/:dir", (req, res) => {
  try {
    const { dir } = req.params;
    if (typeof dir !== "string") return res.status(400).json("Invalid file");
    const rawData = fs.readdirSync(`./data/${dir}`, { encoding: "utf-8" });
    return res.status(200).json(rawData);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

router.post("/:dir", (req, res) => {
  try {
    const { dir } = req.params;
    if (typeof dir !== "string") return res.status(400).json("Invalid Folder");
    fs.mkdirSync(`./data/${dir}`);
    return res.status(201).json("Success");
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

router.delete("/:dir", (req, res) => {
  try {
    const { dir } = req.params;
    if (typeof dir !== "string") return res.status(400).json("Invalid file");
    fs.rmSync(`./data/${dir}`, { recursive: true });
    return res.status(202).json("Success");
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err?.message });
  }
});

export default router;
