import request from "supertest"
import { app } from "../../app"

it('Creates and returns user with statuscode 201', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            username: "testuser"
        })
        .expect(201)
})
it("Returns 400 'Bad Request' with invalid email error", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'testcom',
            password: 'password',
            username: "testuser"
        })
        .expect(400)
})

it("Returns 400 'Bad Request' with missing email or password error", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            username: "testuser"
        })
        .expect(400)
})

it("Returns 400 'Bad Request' with duplicate email or username", async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            username: "testuser"
        })
        .expect(201)
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            username: "testuser"
        })
        .expect(400)
})

it("Sets a cookie after successful sign up", async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            username: "testuser"
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();


})