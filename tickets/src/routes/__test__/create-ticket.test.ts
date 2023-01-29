import request from "supertest"
import { app } from "../../app"
import { response } from "express"

it('ensures that route is exists', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({});
    expect(response.status).not.toEqual(404);
})
it('returns an 401 error that user is not signed in', async () => {
    return request(app)
        .post('/api/tickets')
        .send({})
        .expect(401)
})
it('returns a status other than 401 when the user is signed in', async () => {
    const cookie = signInAndGetCookie();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({})
    expect(response.status).not.toEqual(401);
})
it('returns an error if request body is not valid', async () => {
    const cookie = signInAndGetCookie();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title:'test title',
            price:''
        })
    expect(response.status).toEqual(400);
})
// it('returns an error that provided price is invalid ', async () => {
//     return request(app)
//         .post('/api/tickets/signup')
//         .send({
//             email: 'test@test.com',
//             password: 'password',
//             username: "testuser"
//         })
//         .expect(201)
// })