const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from a file named server.js

describe('to do list  API Endpoints', () => {
  let taskId;

  // Test POST /users endpoint
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/todo')
      .send({
        title: 'test',
        done: false,
        dueDate:"2024-04-27T00:00:00.000Z"
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    taskId = res.body._id;
  });

  // Test GET /users endpoint
  it('should retrieve all tasks', async () => {
    const res = await request(app).get('/todo');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // Test GET /users/:id endpoint
  it('should retrieve a specific user by ID', async () => {
    const res = await request(app).get(`/todo/${taskId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', taskId);
  });

  // Test PATCH /users/:id endpoint
  it('should update a task by ID', async () => {
    const res = await request(app)
      .patch(`/todo/${taskId}`)
      .send({ title: 'updated_task' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'updated_task');
  });

  // Test DELETE /users/:id endpoint
  it('should delete a task by ID', async () => {
    const res = await request(app).delete(`/todo/${taskId}`);
    expect(res.statusCode).toEqual(200);

    // Check if user has been deleted
    const deletedUser = await request(app).get(`/todo/${taskId}`);
    expect(deletedUser.statusCode).toEqual(404);
  });
});
