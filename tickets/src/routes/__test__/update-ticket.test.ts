import request from "supertest"
import { app } from "../../app"
import { response } from "express"
import { Ticket } from "../../models/Ticket";

it('ensures that route is exists', async () => {
    const response = await request(app)
        .put('/api/tickets')
        .send({});
    expect(response.status).not.toEqual(404);
})
it('returns an 401 error when user is not signed in', async () => {
    return request(app)
        .put('/api/tickets')
        .send({})
        .expect(401)
})
it('returns 200 with updated tickets details in body', async () => {
    const createRes = await createTicket("Test ticket", 350);
    const cookie = signInAndGetCookie();
    const updateRes = await request(app)
        .put('/api/tickets')
        .set('Cookie', cookie)
        .send({ id: createRes.body.id, title: 'updated title', price: 150 })
        .expect(200);
    expect(updateRes.body.userId).toEqual('testusersid');
    expect(updateRes.body.title).toEqual('updated title');
    expect(updateRes.body.price).toEqual(150);
})

it('returns an error if request body is not valid', async () => {
    const cookie = signInAndGetCookie();
    const response = await request(app)
        .put('/api/tickets')
        .set('Cookie', cookie)
        .send({ title: 50 })
    expect(response.status).toEqual(400);
})