import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/request-validate'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../services/password'
import jwt from 'jsonwebtoken'

const router=express.Router()

router.post('/api/users/signin',[
     body('email')
     .isEmail()
     .withMessage("Email must be valid"),
     body('password')
     .trim()
     .notEmpty()
     .withMessage("You must provide a password")
 ], validateRequest,
 async (req :Request,res :Response)=>{
     const {email,password}=req.body
     const existingUser= await User.findOne({email})
     if(! existingUser){
          throw new BadRequestError('Wrong credentials provided!!check your email')
     }

     const passwordMatch=await Password.compare(existingUser.password,password)

     if(!passwordMatch){
          throw new BadRequestError("invalid credentials!! check your password")
     }
      //generate jwt and store it on session object
    const userJwt=jwt.sign({
     id:existingUser._id,
     email:existingUser.email
   },
    process.env.JWT_KEY!
   )

   req.session={
     jwt:userJwt
   }

   res.status(201).send(existingUser)


})

export  {router as signinRouter}