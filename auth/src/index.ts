import express from "express";
import 'express-async-errors'
import mongoose from "mongoose";
import cookieSession from "cookie-session";



import { currentUserRouter } from "./routes/current-User";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found";



const app=express()
app.set('trust proxy',true)
app.use(express.json())
app.use(cookieSession({
    signed:false,
    secure:true
}))


app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*',async ()=>{
    throw new NotFoundError()
})


app.use(errorHandler)

const start=async ()=>{
    if(! process.env.JWT_KEY){
        throw new Error('jwt key must be defined')
    }
    try {
         await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
         console.log('connected to mongodb')
    } catch (error) {
         console.log(error)
    }

    app.listen(3000,()=>{
        console.log('listening on port 3000')
    })
}

start()


