import express from "express";
import { currentUserRouter } from "./routes/current-User";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";

const app=express()
app.use(express.json())
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signupRouter)
app.use(signoutRouter)

app.listen(3000,()=>{
    console.log('listening on port 3000')
})