import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const mockUser = {
                id: 'a mongo ObjectId',
                fullName: 'John Doe',
                email: 'test@test.com',
                userRole: 'User',
                createdAt: new Date(),
                updatedAt: new Date(),
}

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
              login: jest.fn()
                         .mockImplementation((loginDTO: LoginDTO) => {
                            return Promise.resolve({ accessToken: 'a jwt token', mockUser })
                         }),
              Register: jest.fn()
                            .mockImplementation((registerDTO: RegisterDTO) => {
                              return Promise.resolve("success")
                            })
          }
        },
        {
            provide: JwtService,
            useValue: {
                sign: jest.fn(),
                verify: jest.fn(),
            },
        },
        {
            provide: ConfigService,
            useValue: {
                get: jest.fn().mockReturnValue('configValue'),
            },
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('authentication', () => {
    it('user login', async () => {
      const loginDTO: LoginDTO = {
        email: 'test@test.com',
        password: 'password'
      }
      const login = await controller.login(loginDTO)
      expect(login).toEqual({ accessToken: 'a jwt token', mockUser })
    })

    it('user register', async() => {
      const registerDTO: RegisterDTO = {
        email: 'test@test.com',
        fullName: 'John Doe',
        password: 'password'
      }

      const register = await controller.register(registerDTO)
      expect(register).toEqual("success")
    })
  })
});
