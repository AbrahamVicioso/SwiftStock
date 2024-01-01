import {checkSchema} from "express-validator";
import {Request,Response,Router} from "express";
import {Prisma,PrismaClient} from "@prisma/client";
import PassEncrypt from "../Middleware/PassEncrypt";
import Validation from "../Middleware/Validators/ValidatorQueryPost";
import multer from "multer";

const router = Router();
const prisma = new PrismaClient();
const upload = multer();

router.post("/register",
upload.fields([]),
checkSchema({
    username: {notEmpty: true},
    role: {notEmpty: true},
    email: {notEmpty: true, isEmail: true},
    password: {notEmpty: true}
}),Validation,PassEncrypt,
    function(req : Request, res :  Response){
        const user = prisma.users.create({
            data: {
                username: req.body.username,
                urole: req.body.role,
                email: req.body.email,
                psw: req.body.password
            }
        })
        prisma.$transaction([user]).then(() => {
            res.status(200).send("User created");
        }).catch((reason: any) => {
            reason.code = "P2002"? res.status(400).send({
                data: `Error in ${reason.meta.target[0]} is used`
            }) : res.status(400).send("Error") 
        });
    }
);

module.exports = router;