import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

export const errorHandler=(err :Error,req :Request,res :Response,next :NextFunction)=>{
    
    if(err instanceof RequestValidationError){
        console.log('handling error type request validation')
    }

    if(err instanceof DatabaseConnectionError){
        console.log('error type od database coonnection error')
    }
    

    res.status(400).send({
        message:err.message
    })
}