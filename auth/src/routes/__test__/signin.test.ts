import request from 'supertest'
import { app } from '../../app'

it('return error with invalid email ',async ()=>{
   await request(app)
   .post('/api/users/signin')
   .send({
    email:'hdj',
    password:'janna123'
   })
   .expect(400)
})

it('returns error when there is no user',async ()=>{
    await request(app)
    .post('/api/users/signin')
    .send({
     email:'ja@gmail.com',
     password:'janna123'
    })
    .expect(400)
})

it('password incorrect',async ()=>{
    process.env.JWT_KEY='gvcfy'
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'janna@gmail.com',
        password:'janna123'
    })
    .expect(201)

    await request(app)
   .post('/api/users/signin')
   .send({
    email:'janna@gmail.com',
    password:'hannan123'
   })
   .expect(400)
})