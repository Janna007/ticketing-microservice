import mongoose from "mongoose"
import { app } from "./app"


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


