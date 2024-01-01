import {Request,Response,NextFunction} from "express";
import {validationResult} from "express-validator";

function UserBodyValidator(req : Request,res:Response, next : NextFunction){
    try{
        validationResult(req).throw();
        next();
    }catch (errors){
        res.status(400).send(errors)
    }
}

export default UserBodyValidator;