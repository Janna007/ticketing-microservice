import express,{Request,Response} from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import jwt from 'jsonwebtoken'
import { validateRequest } from '../middlewares/request-validate'


const router=express.Router()

router.post('/api/users/signup',[
    body('email')
     .isEmail()
     .withMessage("Email must be valid"),
    body('password')
      .trim()
      .isLength({min:4,max:10})
      .withMessage("Password must be between 4 and 10 characters")
], validateRequest,
async (req:Request,res:Response)=>{

    const {email,password}=req.body

    const existingUser= await User.findOne({email})
    if(existingUser){
      throw new BadRequestError('user alreday exist with this email')
    }

   const user= User.build({
       email,
       password
    })
    await user.save()

    //generate jwt and store it on session object
    const userJwt=jwt.sign({
      id:user._id,
      email:user.email
    },
     process.env.JWT_KEY!
    )

    req.session={
      jwt:userJwt
    }

    res.status(201).send(user)


})

export  {router as signupRouter}

