import request from "supertest"
import { app } from "../../app"

it('Return OK with 200 when credentials are correct and cookie is successfully set ', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            username: "testuser"
        })
        .expect(201)
    const response = await request(app)
        .post('/api/users/signout').send()
        .expect(200)
    expect(response.get('Set-Cookie')).toEqual(['session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'])
})