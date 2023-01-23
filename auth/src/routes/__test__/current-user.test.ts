import request from "supertest"
import { app } from "../../app"

it('Return OK 200 with details about signed in user', async () => {

    const cookie = await global.signInAndGetCookie();
    const response = await request(app)
        .get('/api/users/current-user')
        .set('Cookie', cookie)
        .send()
        .expect(200)
    console.log(response.body)
    expect(response.body.username).toEqual("testuser")
})
it('Return 401 Unauthorized when not authenticated', async () => {
    await request(app)
        .get('/api/users/current-user')
        .send()
        .expect(401)
})