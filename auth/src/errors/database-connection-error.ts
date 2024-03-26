import { CustomError } from "./custom-error"

export class DatabaseConnectionError extends CustomError{
    statusCode=500
    reason="Error connection in database"
    constructor(){
        super("Error connection in database") 


        Object.setPrototypeOf(this,DatabaseConnectionError.prototype)
    }

    serializeErrors(){
        return [
            {
               message: this.reason
            }
        ]
    }
}