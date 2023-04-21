"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
// Define a route to read a file from the file system
app.get("/", (req, res) => {
    let { file } = req.query;
    if (typeof file !== "string")
        return res.status(400).json("Invalid file");
    fs_1.default.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json("Error reading file");
        }
        else {
            res.status(200).json(data);
        }
    });
});
app.post("/", (req, res) => {
    let { file, data } = req.body;
    if (typeof file !== "string")
        return res.status(400).json("Invalid file");
    fs_1.default.writeFileSync(file, JSON.stringify(data), { encoding: "utf-8" });
    return res.status(201).json("Success");
});
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
