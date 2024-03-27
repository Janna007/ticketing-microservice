import mongoose, { Schema } from "mongoose";
import { Password } from "../services/password";

//interface that describes the properties req.to create  a new user
interface UserAttrs{
    email:string,
    password:string
}
//interface that describes the properties that a usermodel has
interface userModel extends mongoose.Model<userDoc>{
    build(attrs: UserAttrs):userDoc;
}

//interface thet describes the properties that a user document has
interface userDoc extends mongoose.Document{
    email:string,
    password:string
}

const userSchema=new Schema({
     email:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     }
},{
    toJSON:{
        transform(doc,ret){
            ret.id=ret._id
            delete ret._id
            delete ret.password
            delete ret.__v
        }
    }
})

userSchema.pre('save',async function(done) {
   if(this.isModified('password')){
      const hashed=await Password.toHash(this.get('password'))
      this.set('password',hashed)
   }
   done()
})

userSchema.statics.build=(attrs : UserAttrs)=>{
    return new User(attrs)
}

const User=mongoose.model<userDoc,userModel>("User",userSchema)

export {User}

