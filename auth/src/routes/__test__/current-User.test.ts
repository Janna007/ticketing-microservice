import request from 'supertest'
import { app } from '../../app'
import { signin } from '../../test/signinHelper'


it('get current user information',async ()=>{

    const cookie=await signin()
  
    if(cookie){
        const response= await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200)

    console.log(response.body)
    }
  
})