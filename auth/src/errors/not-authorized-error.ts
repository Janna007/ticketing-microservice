import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError{
    statusCode=404
    
    constructor(){
        super('unauthorized request')

        Object.setPrototypeOf(this,NotAuthorizedError.prototype)
    }

    serializeErrors() {
         return [
            {
               message: 'unauthorized request'
            }
         ]
    }
}