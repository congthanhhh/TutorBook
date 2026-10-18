import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module.js';

describe('Tutorbook API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  it('GET /api/health reports the database is up', () => {
    return request(app.getHttpServer()).get('/api/health').expect(200).expect({ status: 'ok', db: 'up' });
  });

  it('POST /api/slips/validate accepts a valid slip', async () => {
    const text = JSON.stringify({ kind: 'session', version: 1, date: '2026-10-19', ai: 'grok', handoff: { done: 'x' } });
    const res = await request(app.getHttpServer()).post('/api/slips/validate').send({ text }).expect(200);

    expect(res.body.ok).toBe(true);
  });

  it('POST /api/slips/validate rejects an empty body with the standard error shape', async () => {
    const res = await request(app.getHttpServer()).post('/api/slips/validate').send({}).expect(400);

    expect(res.body).toMatchObject({
      statusCode: 400,
      message: 'Dữ liệu không hợp lệ',
      issues: [{ path: 'text' }],
      path: '/api/slips/validate',
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
