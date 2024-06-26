import {randomBytes ,scrypt}  from 'crypto'
import {promisify} from 'util'

const scryptAsync=promisify(scrypt)
export class Password{
     static async toHash(Password :string){
        const salt=randomBytes(8).toString('hex')
        const buf=( await scryptAsync(Password,salt,64) )as Buffer 

        return `${buf.toString('hex')} .${salt}`
     }

     static async compare(storedPassword:string ,suppliedPassword:string){
         const [hashesPassword,salt]=storedPassword.split(".")
         const buf=( await scryptAsync(suppliedPassword,salt,64) )as Buffer 

         return buf.toString('hex')=== hashesPassword
     }
}

//later change using bcrypt