import express from "express";
import 'express-async-errors'
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
    secure:process.env.NODE_ENV !== 'test'
}))


app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.all('*',async ()=>{
    throw new NotFoundError()
})


app.use(errorHandler)

export {app}