import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types } from 'mongoose';
import { disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/constants/review.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const productId = new Types.ObjectId().toHexString();
  let reviewId: string;
  let token: string;
  const loginDto: AuthDto = {
    login: 's@s.uz',
    password: '123',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const res = await request(app.getHttpServer()).post('/auth/login').send(loginDto);
    token = res.body.access_token;
  });


  it('/review/create (POST) -success', async () => {
    const response = await request(app.getHttpServer())
      .post('/review/create')
      .send({
        name: 'Test',
        title: 'Good product',
        description: 'I like it',
        rating: 5,
        productId,
      })
      .expect(201);

    reviewId = response.body._id;
    expect(reviewId).toBeDefined();
  });

  it('/review/create (POST) -fail', async () => {
    const response = await request(app.getHttpServer())
      .post('/review/create')
      .send({
        name: 'Test',
        title: 'Good product',
        description: 'I like it',
        rating: 0,
        productId,
      })
      .expect(400);
  });

  it('/review/byProduct/:productId (GET) -success', async () => {
    await request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        expect(body[0].productId).toBe(productId);
      });
  });

  it('/review/byProduct/:productId (GET) -fail', async () => {
    await request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
      });
  });

  it('/review/:id (DELETE) -success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + reviewId)
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  });

  it('/review/:id (DELETE) -fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe(REVIEW_NOT_FOUND);
        expect(body.statusCode).toBe(404);
      });
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });
});
