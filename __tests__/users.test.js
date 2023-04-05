const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@user.com',
  password: '1234567890',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;

  // Create an "agent" that gives us the ability
  // to store cookies between requests in a test
  const agent = request.agent(app);

  // Create a test user
  const user = await UserService.create({ ...mockUser, ...userProps });

  // ...sign in
  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });


  it('POST / creates a new user', async () => {
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

  it('POST /sessions signs in an existing user', async () => {
    await request(app)
      .post('/api/v1/users')
      .send(mockUser);
    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({
        email: 'test@user.com',
        password: '1234567890'
      });
    expect(res.status).toEqual(200);
  });

  it('GET /protected should return a 401 if not authenticated', async () => {
    const res = await request(app)
      .get('/api/v1/users/protected');
    expect(res.status)
      .toEqual(401);
  });

  it('GET /protected should return the current user if authenticated', async () => {
    const [agent] = await registerAndLogin({ ...mockUser });
    const res = await agent
      .get('/api/v1/users/protected');
    expect(res.status)
      .toEqual(200);
  });

  it('GET /users should return 401 if user not admin', async () => {
    const agent = request.agent(app);
    await UserService
      .create({ ...mockUser });
    await agent
      .post('/api/v1/users/sessions')
      .send({
        email: 'admin@user.com',
        password: '0987654321'
      });
    const res = await agent
      .get('/api/v1/users');
    expect(res.statusCode)
      .toEqual(401);
  });

  it('/users should return a 200 if user is admin', async () => {
    const [agent] = await registerAndLogin({
      email: 'admin@user.com',
      password: '0987654321'
    });
    const res = await agent
      .get('/api/v1/users');
    expect(res.status)
      .toEqual(200);
  });

  it('DELETE /sessions deletes the user session', async () => {
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

