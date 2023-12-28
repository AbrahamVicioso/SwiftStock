import {Request,Response,NextFunction} from "express";
import {validationResult} from "express-validator";

function UserBodyValidator(req : Request,res:Response, next : NextFunction){
    const result = validationResult(req);
        if(!result.isEmpty()){
            res.status(400).send("Credentials error");
        }else{
            next()
        }
}

export default UserBodyValidator;