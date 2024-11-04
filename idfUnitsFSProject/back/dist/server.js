"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = 3000;
let unitsData = null;
fs_1.default.readFile(path_1.default.join(__dirname, "../idfUnits.json"), "utf8", (err, data) => {
    if (err) {
        console.error("Error loading data:", err);
        return;
    }
    unitsData = JSON.parse(data);
    console.log("Data loaded successfully");
});
app.get("/api/units", (req, res) => {
    if (!unitsData) {
        res.status(500).send("Internal error!");
        return;
    }
    res.json(unitsData);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
