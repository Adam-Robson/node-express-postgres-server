import { describe, beforeEach, test, expect, afterAll } from '@jest/globals';
import pool from '../lib/utils/pool';
import setupDatabase from '../data/setup';
import request from 'supertest';
import app from '../lib/app'
import UserService from '../lib/services/user-service'

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@user.com',
  password: '1234567890',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.createUser({ ...mockUser, ...userProps });
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent];
};

describe('user routes', () => {
  beforeEach(() => {
    return setupDatabase(pool);
  });


  test('POST / creates a new user', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send(mockUser);
    const { firstName, lastName, email } = mockUser;

    expect(res.body).toEqual({
      id: expect.any(String),
      firstName,
      lastName,
      email,
    });
  });

  test('POST /users/sessions signs in an existing user', async () => {
    await request(app)
      .post('/api/v1/users/sessions')
      .send(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({
        email: 'test@user.com',
        password: '1234567890'
      });
    expect(res.status).toEqual(200);
  });

  test('GET /users/protected should return a 401 if not authenticated', async () => {
    const res = await request(app)
      .get('/api/v1/users/protected');
    expect(res.status)
      .toEqual(401);
  });

  test('GET /users/protected should return the current user if authenticated', async () => {
    const [agent] = await registerAndLogin({ ...mockUser });
    const res = await agent
      .get('/api/v1/users/protected');
    expect(res.status)
      .toEqual(200);
  });

  test('GET /users should return 401 if user not admin', async () => {
    const agent = request.agent(app);
    await UserService
      .createUser({ ...mockUser });
    await agent
      .post('/api/v1/users')
      .send({
        email: 'admin@user.com',
        password: '0987654321'
      });
    const res = await agent
      .get('/api/v1/users');
    expect(res.statusCode)
      .toEqual(401);
  });

  test('/users should return a 200 if user is admin', async () => {
    const [agent] = await registerAndLogin({
      email: 'admin@user.com',
      password: '0987654321'
    });
    const res = await agent
      .get('/api/v1/users');
    expect(res.status)
      .toEqual(200);
  });

  test('DELETE /users/sessions deletes the user session', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent
      .delete('/api/v1/users/sessions');
    expect(resp.status)
      .toBe(204);
  });
});

afterAll(() => {
  pool.end();
});

