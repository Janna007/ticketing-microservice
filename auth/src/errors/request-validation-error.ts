import { ValidationError } from "express-validator";

// interface customError{
//    statusCode:number;
//    serializeErrors():{
//      message:string;
//      field?:string
//    }[]
// }

export class RequestValidationError extends Error {
   statusCode=400
   constructor(public errors :ValidationError[]){
      super();
        

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