import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { getModelToken } from 'nestjs-typegoose';
import { mongoose } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';
import { User } from '../../src/auth/entity/user.entity';
import { AppModule } from '../../src/app.module';
import { RegisterDTO } from '../../src/auth/dto/register.dto';
import { LoginDTO } from '../../src/auth/dto/login.dto';

describe('AuthService (e2e)', () => {
  let app: INestApplication;
  let userModel: mongoose.Model<User>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userModel = moduleFixture.get<mongoose.Model<User>>(getModelToken(User.name));
    await userModel.deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user', async () => {
      const registerDto: RegisterDTO = {
        email: 'reg@test.com',
        password: 'Hx123456$7',
        fullName: 'John Doe',
      };


      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
      expect(response.text).toEqual('Congratulations! Your account is Successfully created...');
    });

    it('should not register an existing user', async () => {
      const registerDto: RegisterDTO = {
        email: 'register@test.com',
        password: 'Hx123456$7',
        fullName: 'John Doe',
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(403);

      expect(response.body.message).toBe('There is a register user with that email try login');
    });
  });

  describe('/auth/login (POST)', () => {
    it('should return an access token and user if login is successful', async () => {
      const registerDto: RegisterDTO = {
        email: 'test@test.com',
        password: 'Hx123456$7',
        fullName: 'John Doe',
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      const loginDto: LoginDTO = {
        email: 'test@test.com',
        password: 'Hx123456$7',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user).toMatchObject({
        email: loginDto.email,
        fullName: 'John Doe',
        userRole: 'User',
      });
    });

    it('should return 404 if user is not found', async () => {
      const loginDto: LoginDTO = {
        email: 'notfound@test.com',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(404);

      expect(response.body.message).toBe('No user found');
    });

    it('should return 403 if password is incorrect', async () => {
      const registerDto: RegisterDTO = {
        email: 'login@test.com',
        password: 'Hx123456$7',
        fullName: 'John Doe',
      };

      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201);

      const loginDto: LoginDTO = {
        email: 'test@test.com',
        password: 'wrongPassword',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(403);

      expect(response.body.message).toBe('Email or Password is incorrect');
    });
  });
});
