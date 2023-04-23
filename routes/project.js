"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.get("/:file", (req, res) => {
    try {
        const { file } = req.params;
        if (typeof file !== "string")
            return res.status(400).json("Invalid file");
        const rawData = fs_1.default.readFileSync(`./data/${file}`, "utf8");
        return res.status(200).json(JSON.parse(rawData));
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err === null || err === void 0 ? void 0 : err.message });
    }
});
router.post("/:file", (req, res) => {
    try {
        const { file } = req.params;
        const data = req.body.data;
        if (typeof file !== "string")
            return res.status(400).json("Invalid file");
        fs_1.default.writeFileSync(`./data/${file}`, data, {
            encoding: "utf-8",
        });
        return res.status(201).json("Success");
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err === null || err === void 0 ? void 0 : err.message });
    }
});
router.delete("/:file", (req, res) => {
    try {
        const { file } = req.params;
        if (typeof file !== "string")
            return res.status(400).json("Invalid file");
        fs_1.default.writeFileSync(`./data/${file}`, "", { encoding: "utf-8" });
        return res.status(202).json("Success");
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err === null || err === void 0 ? void 0 : err.message });
    }
});
exports.default = router;
