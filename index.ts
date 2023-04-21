import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Define a route to read a file from the file system
app.get("/", (req, res) => {
  let { file } = req.query;
  if (typeof file !== "string") return res.status(400).json("Invalid file");
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json("Error reading file");
    } else {
      res.status(200).json(data);
    }
  });
});

app.post("/", (req, res) => {
  let { file, data } = req.body;
  if (typeof file !== "string") return res.status(400).json("Invalid file");
  fs.writeFileSync(file, JSON.stringify(data), { encoding: "utf-8" });
  return res.status(201).json("Success");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
