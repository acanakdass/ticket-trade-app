import jwt from 'jsonwebtoken';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import { Response } from 'express';

let mongo: any;

declare global {
    var signInAndGetCookie: () => string[];
    var createTicket: (title: string, price: number) => Promise<request.Response>;
}
global.createTicket = async (title: string, price: number) => {
    const cookie = signInAndGetCookie();
    const createRes = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({ title, price })
        .expect(201);
    expect(createRes.body.userId).toEqual('testusersid');
    return createRes;
}
global.signInAndGetCookie = () => {
    const payload = {
        id: 'testusersid',
        email: 'test@test.com',
        username: 'testuser'
    };
    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');
    return [`session=${base64}`];
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