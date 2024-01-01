import {Response,Request,NextFunction, Router} from "express";
import {validationResult,checkSchema} from "express-validator";
import {Prisma,PrismaClient} from "@prisma/client";
import Validation from "../Middleware/Validators/ValidatorQueryPost";
import upload from "../Controllers/UploadFileArticles";

const router = Router();
const prisma = new PrismaClient();

prisma.$connect();

router.get("/", (req : Request,res: Response) => {
    const host = req.get('host')?.toString() || "";
    prisma.$transaction([
        prisma.articles.findMany()
    ]).then((articles) => {   
        res.send(articles[0].map(x => {
            let z = x;
            z.ar_image = `${req.protocol}://${host}/articles/images/${x.ar_image}`
            return z
        }))
    })
});

router.post("/test", upload.fields([{
    name: "ar_image", maxCount: 1
}]), (req,res) => {
    console.log(req.body)
    console.log(req.file)
    res.send("ok")
})

router.post(
"/add",
upload.fields([{
    name: "ar_image", maxCount: 1
}]),
checkSchema({
    ar_name: {notEmpty: true},
    ar_year: {notEmpty: true},
    ar_color: {notEmpty: true},
    ar_brand: {notEmpty: true}
}),
Validation,
(req : Request ,res : Response) => {
    const files = req.files as {[fieldname: string] : Express.Multer.File[]}
    console.log(req.body)
    const article = prisma.articles.create({
        data: {
            ar_name: req.body.ar_name,
            ar_brand: req.body.ar_brand,
            ar_year: req.body.ar_year,
            ar_color: req.body.ar_color,
            ar_image: files["ar_image"][0]?.filename
        }
    })

    prisma.$transaction([article]).then(() => {
        res.status(201).send("Articles created");
    }).catch((reason : any) => {
        res.status(400).send(reason)
    })
});

module.exports = router;