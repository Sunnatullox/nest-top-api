import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types } from 'mongoose';
import { disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/constants/review.constants';
import { AuthDto } from 'src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: 's@s.uz',
  password: '123',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);
    token = res.body.access_token;
  });

  it('/auth/login (POST) -success', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200);

    expect(res.body.access_token).toBeDefined();
  });

  it('/auth/login (POST) -fail password', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '1234' })
      .expect(401, {
        message: "Parol noto'g'ri",
        error: 'Unauthorized',
        statusCode: 401,
      });
  });

  it('/auth/login (POST) -fail login', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: 's@sw.uz' })
      .expect(401, {
        message: 'Foydalanuvchi topilmadi',
        error: 'Unauthorized',
        statusCode: 401,
      });
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });
});
