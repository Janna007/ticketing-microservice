import request from "supertest"
import { app } from "../../app"

it('returns a 201 on successful signup',async ()=>{
    process.env.JWT_KEY='gvcfy'
    return request(app)
    .post('/api/users/signup')
    .send({
        email:'janna@gmail.com',
        password:'janna123'
    })
    .expect(201)
})

it('returns a 400 error for invalid email ',async ()=>{
    return request(app)
    .post('/api/users/signup')
    .send({
        email:'jksnxiaj',
        password:'123janna'
    })
    .expect(400)
})


it('returns a 400 error for invalid password ',async ()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'jj@gmail.com',
        password:'1'
    })
    .expect(400)
})

it('returns a 400 error  for missing email and password',async ()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        password:'5678981'
    })
    .expect(400)

    await request(app)
    .post('/api/users/signup')
    .send({
        email:'jj@gmail.com'
    })
    .expect(400)
})

it('return error to duplicate emails',async ()=>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'janna@gmail.com',
        password:'janna123'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signup')
    .send({
        email:'janna@gmail.com',
        password:'janna123'
    })
    .expect(400)
})


it('set a cookie after successful signup',async ()=>{
    const response=await request(app)
    .post('/api/users/signup')
    .send({
        email:'janna@gmail.com',
        password:'janna123'
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})