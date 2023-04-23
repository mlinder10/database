"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const project_1 = __importDefault(require("./routes/project"));
const cluster_1 = __importDefault(require("./routes/cluster"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use("/", project_1.default);
app.use("/:file", cluster_1.default);
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
