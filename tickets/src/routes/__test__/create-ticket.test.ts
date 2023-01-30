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
it('returns 200 with created tickets details in body', async () => {
    const cookie = signInAndGetCookie();
    const createRes = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({ title: 'test ticket', price: 150 })
        .expect(201);
    expect(createRes.body.userId).toEqual('testusersid');
    expect(createRes.body.title).toEqual('test ticket');
    expect(createRes.body.price).toEqual(150);
    return createRes;
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