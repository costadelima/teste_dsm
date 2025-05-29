import { app } from './../index';
import request from 'supertest';
import { initializeDB, users } from '../memoryDB';

describe('User Routes', () => {
  beforeAll(async () => {
    await initializeDB();
  });

  it('GET /bff/users returns all users', async () => {
    const response = await request(app).get('/bff/users');
    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(users.length);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('GET /bff/users/:id returns specific user', async () => {
    const userId = 1;
    const response = await request(app).get(`/bff/users/${userId}`);
    
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body).toHaveProperty('email');
  });

  it('GET /bff/users/:id returns 404 for non-existent user', async () => {
    const response = await request(app).get('/bff/users/9999');
    expect(response.status).toBe(404);
  });
});