import {Response,Request} from "express";
const Router = require("express").Router();

Router.get("/", (req: Request,res : Response) => {
    res.send("Hola");
})

module.exports = Router;