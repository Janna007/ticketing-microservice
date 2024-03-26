import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";


// interface customError{
//    statusCode:number;
//    serializeErrors():{
//      message:string;
//      field?:string
//    }[]
// }
//instead of using interface we use abstract classes

export class RequestValidationError extends CustomError {
   statusCode=400
   constructor(public errors :ValidationError[]){
      super("invalid request");
        

      //only beacuse we are extending a built in class
      Object.setPrototypeOf(this,RequestValidationError.prototype)
   }

   serializeErrors(){
      return this.errors.map((error)=>{
         if (error.type === 'field') {
            return { message: error.msg, field: error.path };
          }
          return {message:error.msg}
      })
   }
}