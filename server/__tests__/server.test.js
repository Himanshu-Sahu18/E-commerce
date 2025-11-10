const request = require('supertest');
const mongoose = require('mongoose');

// Mock mongoose.connect to avoid DB connection in tests
jest.mock('mongoose', () => ({
  connect: jest.fn().mockResolvedValue(),
}));

const app = require('../server');

describe('Server', () => {
  beforeAll(() => {
    // Ensure mongoose.connect is mocked
  });

  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'E-Commerce API is running!' });
  });
});
