import request from 'supertest';
import { app } from '../../app';
it('returns 404 if the ticket is not exists', async () => {
    const response = await request(app)
        .get('/api/tickets/sdaf')
        .send()
        .expect(404);
    console.log(response.body)
})
it('finds and returns the ticket ', async () => {

    const title = 'test title'
    const price = 50
    const cookie = signInAndGetCookie();
    const createRes = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({ title, price })
        .expect(201);

    const getResponse = await request(app)
        .get(`/api/tickets/${createRes.body.id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200);
    expect(getResponse.body.id).toEqual(createRes.body.id)
    expect(getResponse.body.title).toEqual(title)
})