import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';

let shortCode = '';

describe('URL Shortener API', () => {
  // Create a short URL first (used for all others)
  it('should create a short URL (POST /shorten)', async () => {
    const res = await request(app)
      .post('/shorten')
      .send({ originalUrl: `https://test-${Date.now()}.com` });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('shortCode');
    shortCode = res.body.shortCode; 
  });

  // Retrieve the original URL (GET /shorten/:shortCode)
  it('should get original URL by shortCode', async () => {
    const res = await request(app).get(`/shorten/${shortCode}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('originalUrl');
    expect(res.body.shortCode).toBe(shortCode);
  });

  // Update the original URL (PUT /shorten/:shortCode)
  it('should update the original URL', async () => {
    const newUrl = `https://updated-${Date.now()}.com`;
    const res = await request(app)
      .put(`/shorten/${shortCode}`)
      .send({ originalUrl: newUrl });

    expect(res.statusCode).toBe(200);
    expect(res.body.originalUrl).toBe(newUrl);
  });

  // Get stats (GET /shorten/:shortCode/stats)
  it('should return stats for shortCode', async () => {
    const res = await request(app).get(`/shorten/${shortCode}/stats`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessCount');
    expect(res.body.shortCode).toBe(shortCode);
  });

  // Delete the short URL (DELETE /shorten/:shortCode)
  it('should delete the short URL', async () => {
    const res = await request(app).delete(`/shorten/${shortCode}`);
    expect(res.statusCode).toBe(204);
  });

  // Confirm deletion (GET should now return 404)
  it('should return 404 for deleted shortCode', async () => {
    const res = await request(app).get(`/shorten/${shortCode}`);
    expect(res.statusCode).toBe(404);
  });
});

// Close MongoDB connection gracefully
afterAll(async () => {
  await mongoose.connection.close();
});
