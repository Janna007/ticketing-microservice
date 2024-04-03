import request from 'supertest'
import { app } from '../../app'

it('clear cookies after signout',async ()=>{
    process.env.JWT_KEY='gvcfy'
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'janna@gmail.com',
        password:'janna123'
    })
    .expect(201)

   const response= await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
})