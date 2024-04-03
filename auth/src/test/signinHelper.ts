import { app } from "../app"
import request from 'supertest'


export const signin=async ()=>{

    process.env.JWT_KEY='gvcfy'
    const email='janna@gmail.com'
    const password='janna123'

    const response=await request(app)
        .post('/api/users/signup')
        .send({
            email,password
        })
        .expect(201)

        const cookie=response.get('Set-Cookie')
        return cookie

}