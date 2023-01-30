import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns 404 if the ticket is not exists', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404);
})
it('finds and returns the ticket ', async () => {
    const title = 'test title'
    const price = 50
    const createRes = await createTicket(title, price);
    const getResponse = await request(app)
        .get(`/api/tickets/${createRes.body.id}`)
        .send()
        .expect(200);
    expect(getResponse.body.id).toEqual(createRes.body.id)
    expect(getResponse.body.title).toEqual(title)
    expect(getResponse.body.price).toEqual(price)
})

it('returns 200 with list of all tickets', async () => {
    const createRes = await createTicket("test ticket title", 1500);
    const createRes2 = await createTicket("second test ticket title", 350);
    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);
    expect(response.body.length).toEqual(2)
    expect(response.body[0].title).toEqual("test ticket title")
    expect(response.body[1].price).toEqual(350)
})