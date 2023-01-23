import request from "supertest"
import { app } from "../../app"

it('Return Bad Request with 400 when username does not exists', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            username: "testuser"
        })
        .expect(201)
    await request(app)
        .post('/api/users/signin')
        .send({
            password: 'password',
            username: "testuser2"
        })
        .expect(400)
})
it('Return Bad Request with 400 when password is not correct', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            username: "testuser"
        })
        .expect(201)
    await request(app)
        .post('/api/users/signin')
        .send({
            password: 'password2',
            username: "testuser"
        })
        .expect(400)
})
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
        .post('/api/users/signin')
        .send({
            password: 'password',
            username: "testuser"
        })
        .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined();
})