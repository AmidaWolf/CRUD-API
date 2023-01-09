import 'jest';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { server } from '../src/server';

describe('API tests: 1 scenario - normal work', () => {
  afterAll((done) => {
    server.close();
    done();
  });

  let userId = '';

  test('Get all records', async () => {
    const res = await request(server).get('/api/users');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('Create new record', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'Test',
        age: 20,
        hobbies: ['tests', 'coding'],
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');

    userId = res.body.id;
  });

  test('Get record by id', async () => {
    const res = await request(server).get(`/api/users/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', userId);
  });

  test('Update record', async () => {
    const res = await request(server).put(`/api/users/${userId}`).send({ username: 'Updated Test' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', userId);
    expect(res.body).toHaveProperty('username', 'Updated Test');
  });

  test('Delete record', async () => {
    const res = await request(server).delete(`/api/users/${userId}`);

    expect(res.status).toBe(200);
  });

  test('Get deleted record', async () => {
    const res = await request(server).get(`/api/users/${userId}`);

    expect(res.status).toBe(404);
  });
});

describe('API tests: 2 scenario - wrong data', () => {
  afterAll((done) => {
    server.close();
    done();
  });

  test('Create new record without required fields', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'Test',
        hobbies: ['tests', 'coding'],
      });

    expect(res.status).toBe(400);
  });

  test('Create new record with wrong type', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        username: 'Test',
        age: 'Seventeen',
        hobbies: ['tests', 'coding'],
      });

    expect(res.status).toBe(400);
  });

  test('Update record with wrong ID', async () => {
    await request(server)
      .post('/api/users')
      .send({
        username: 'Test',
        hobbies: ['tests', 'coding'],
      });

    const userId = uuidv4();

    const res = await request(server).put(`/api/users/${userId}`).send({ username: 'Updated Test' });

    expect(res.status).toBe(404);
  });
});

describe('API tests: 3 scenario - unexpected behavior', () => {
  afterAll((done) => {
    server.close();
    done();
  });

  const wrongId = 'wrongID';

  test('Create new record with wrong ID', async () => {
    const res = await request(server)
      .post('/api/users')
      .send({
        id: wrongId,
        username: 'Test',
        age: 20,
        hobbies: ['tests', 'coding'],
      });

    expect(res.status).toBe(201);
    expect(res.body.id !== wrongId);
  });

  test('Delete record with non-uuid ID type', async () => {
    const res = await request(server).delete(`/api/users/${wrongId}`);

    expect(res.status).toBe(400);
  });

  test('Send request with wrong method ', async () => {
    const res = await request(server).copy(`/api/users/`);

    expect(res.status).toBe(405);
  });

  test('Send request with wrong url ', async () => {
    const res = await request(server).get(`/api/userses/`);

    expect(res.status).toBe(404);
  });
});
