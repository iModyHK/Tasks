const request = require('supertest');
const app = require('../server'); // Ensure this matches your Express app export

describe('API Tests', () => {
    test('User authentication works', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'test@example.com',
            password: 'password123'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });

    test('Fetching tasks requires authentication', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toBe(401); // Should return Unauthorized
    });
});
