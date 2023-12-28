import {Response,Request,NextFunction, Router} from "express";
import {validationResult,body} from "express-validator";
import {Prisma,PrismaClient} from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();
prisma.$connect();

router.get("/", (req : Request,res: Response) => {
    prisma.$transaction([
        prisma.articles.findMany()
    ]).then((articles) => {
        res.send(articles)
    })
});

router.post("/add", body("ar_code").notEmpty(),body("ar_name").notEmpty(), (req : Request ,res : Response) => {
    const result = validationResult(req);
    
    if(result.isEmpty()){
        const article = prisma.articles.create({
            data: {
                ar_name: req.body.ar_name,
                ar_code: req.body.ar_code
            }
        })
    
        prisma.$transaction([article]).then(() => {
            res.status(200).send("Articles created");
        }).catch((reason : any) => {
            res.status(200).send(reason)
        });
    }else{
        res.status(400).send("fields are missing");
    }
});

module.exports = router;