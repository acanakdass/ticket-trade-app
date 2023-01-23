import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: any;

declare global {
    var signInAndGetCookie: () => Promise<string[]>;
}

global.signInAndGetCookie = async () => {
    const username = 'testuser';
    const email = 'test@test.com';
    const password = 'password';
    const response = await request(app)
        .post('/api/users/signup')
        .send({ username, password,email })
        .expect(201);
    const cookie = response.get('Set-Cookie');
    return cookie;
}
beforeAll(async () => {
    process.env.JWT_KEY = "testjwtkey"
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();
    for (let coll of collections)
        await coll.deleteMany({});
});

afterAll(async () => {
    if (mongo)
        await mongo.stop();
    await mongoose.connection.close();
});