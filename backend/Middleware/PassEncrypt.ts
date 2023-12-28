import {Request,Response,NextFunction} from "express";
import bcrypt from "bcrypt";

function PassEncrypt(req : Request,res : Response,next : NextFunction){
    const salts = bcrypt.genSaltSync(parseInt(String(process.env.SaltArounds)));
    const hashPass = bcrypt.hashSync(String(req.body.password),salts);

    req.body.password = hashPass;

    next();
}

export default PassEncrypt;