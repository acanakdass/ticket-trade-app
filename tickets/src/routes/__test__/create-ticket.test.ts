import request from "supertest"
import { app } from "../../app"
import { response } from "express"
import { Ticket } from "../../models/Ticket";

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
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const cookie = signInAndGetCookie();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'test title',
            price: 50
        })
    tickets = await Ticket.find({});

    expect(response.status).toEqual(201);
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(50);
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