const request = require('supertest');

// Mock mongoose to avoid DB connection in tests
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose');
  return {
    ...actualMongoose,
    connect: jest.fn().mockResolvedValue(),
  };
});

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
