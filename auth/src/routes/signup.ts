import express,{Request,Response} from 'express'
import { body,validationResult } from 'express-validator'


const router=express.Router()

router.post('/api/users/signup',[
    body('email')
     .isEmail()
     .withMessage("Email must be valid"),
    body('password')
      .trim()
      .isLength({min:4,max:10})
      .withMessage("Password must be between 4 and 10 characters")
],(req:Request,res:Response)=>{
    const {email,password}=req.body

    if(!email || typeof email!=="string"){
     res.status(400).send("please enter a valid email")
    }
})

export  {router as signupRouter}