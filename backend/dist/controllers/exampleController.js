"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleHandler = void 0;
const exampleHandler = (req, res) => {
    res.json({ message: "This is an example endpoint!" });
};
exports.exampleHandler = exampleHandler;
