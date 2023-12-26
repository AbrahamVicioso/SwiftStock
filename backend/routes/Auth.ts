import {Request,Response} from "express";
const Router = require("express").Router();

Router.get("/login", (req : Request,res : Response) => {
    res.send("HOLA ESTE ES EL LOGIN");
});

Router.post("/register", (req : Request,res : Response) => {
    res.send("HOLA ESTE ES EL LOGIN");
    console.log(req.body);
});

module.exports = Router;