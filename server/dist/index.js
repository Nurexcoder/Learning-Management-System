"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
const signUp_1 = require("./routes/auth/signUp");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use(signUp_1.SignupRouter);
const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use((err, req, res, next) => {
    res.json({
        message: err.message || "an unknown error occurred!",
    });
});
app.all("*", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return next(new Error("Invalid route"));
}));
const initializeConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/lms");
        console.log("Connected to MongoDb");
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield initializeConfig();
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}));
