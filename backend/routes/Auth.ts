import {body} from "express-validator";
import {Request,Response,NextFunction,Router} from "express";
import {Prisma,PrismaClient} from "@prisma/client";
import PassEncrypt from "../Middleware/PassEncrypt";
import UserBodyValidator from "../Middleware/Validators/UserBodyValidator";

const router = Router();
const prisma = new PrismaClient();


router.post("/register", body("email").isEmail().notEmpty(),
body("password").notEmpty(),body("role").notEmpty(),body("username").notEmpty(),UserBodyValidator,PassEncrypt,
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
            reason.code = "P2002"? res.status(400).send(`Error in ${reason.meta.target[0]} is used`) : res.status(400).send("Error") 
        });
    }
);

module.exports = router;