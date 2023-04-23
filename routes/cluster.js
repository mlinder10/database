"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router({ mergeParams: true });
router.get("/:cluster", (req, res) => {
    try {
        const { file, cluster } = req.params;
        if (typeof file !== "string" || typeof cluster !== "string")
            return res.status(400).json("Invalid Path");
        const rawData = fs_1.default.readFileSync(`./data/${file}`, { encoding: "utf-8" });
        const parsedData = JSON.parse(rawData);
        return res.status(200).json(parsedData[cluster]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err === null || err === void 0 ? void 0 : err.message });
    }
});
router.post("/:cluster", (req, res) => {
    try {
        const { file, cluster } = req.params;
        const { data } = req.body;
        if (typeof file !== "string" || typeof cluster !== "string")
            return res.status(400).json("Invalid Path");
        const rawData = fs_1.default.readFileSync(`./data/${file}`, { encoding: "utf-8" });
        const parsedData = JSON.parse(rawData);
        parsedData[cluster] = JSON.parse(data);
        fs_1.default.writeFileSync(`./data/${file}`, JSON.stringify(parsedData), {
            encoding: "utf-8",
        });
        res.status(201).json("Success");
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err === null || err === void 0 ? void 0 : err.message });
    }
});
router.delete("/:cluster", (req, res) => {
    try {
        const { file, cluster } = req.params;
        if (typeof file !== "string" || typeof cluster !== "string")
            return res.status(400).json("Invalid Path");
        const rawData = fs_1.default.readFileSync(`./data/${file}`, { encoding: "utf-8" });
        const parsedData = JSON.parse(rawData);
        parsedData[cluster] = null;
        fs_1.default.writeFileSync(`./data/${file}`, JSON.stringify(parsedData), {
            encoding: "utf-8",
        });
        res.status(202).json("success");
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.default = router;
