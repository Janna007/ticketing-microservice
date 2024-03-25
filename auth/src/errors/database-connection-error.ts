
export class DatabaseConnectionError extends Error{
    reason="Error connection in database"
    constructor(){
        super()


        Object.setPrototypeOf(this,DatabaseConnectionError.prototype)
    }
}