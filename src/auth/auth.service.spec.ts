import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from 'nestjs-typegoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';

jest.mock('bcrypt');

describe('AuthService', () => {
    let service: AuthService;
    let userModel: any;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: getModelToken(User.name),
                    useValue: {
                        create: jest.fn(),
                        findOne: jest.fn(),
                        findById: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        signAsync: jest.fn(),
                        verify: jest.fn(),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: jest.fn().mockReturnValue('configValue'),
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
        userModel = module.get(getModelToken(User.name));

        // Mock bcrypt functions
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (bcrypt.genSalt as jest.Mock).mockResolvedValue('mockSalt');
        (bcrypt.hash as jest.Mock).mockResolvedValue('mockHashedPassword');
        (jwtService.signAsync as jest.Mock).mockResolvedValue('mockToken');
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('Register', () => {
        it('should register a new user', async () => {
            const body = {
                email: 'test@test.com',
                password: 'password123',
                fullName: 'John Doe'
            };

            userModel.findOne.mockResolvedValue(null);
            userModel.create.mockResolvedValue({
                email: body.email,
                password: 'mockHashedPassword',
                fullName: body.fullName,
            });

            const result = await service.Register(body);
            expect(result).toEqual('Congratulations! Your account is Successfully created...');
            
            // Verify that the service method was called with the correct parameters
            expect(userModel.findOne).toHaveBeenCalledWith({ email: body.email });
            expect(userModel.create).toHaveBeenCalledWith({
                email: body.email,
                password: 'mockHashedPassword',
                fullName: body.fullName,
            });
        });

        it('should throw an error if the user already exists', async () => {
            const body = {
                email: 'test@test.com',
                password: 'password123',
                fullName: 'John Doe'
            };

            userModel.findOne.mockResolvedValue({
                email: body.email,
            });

            await expect(service.Register(body)).rejects.toThrow(HttpException);
            expect(userModel.findOne).toHaveBeenCalledWith({ email: body.email });
        });
    });

    describe('Login', () => {
      it('should return an access token and user if login is successful', async () => {
          const body: LoginDTO = {
            email : 'test@test.com',
            password: 'password'
          }

          const user = {
            id: 'a uuid',
            email: body.email,
            password: 'hashedPassword',
            fullName: 'John Doe',
            userRole: "User"
          }

          userModel.findOne.mockResolvedValue(user);
          // (bcrypt.compare as jest.Mock).mockResolvedValue(true);
          // (jwtService.signAsync as jest.Mock).mockResolvedValue('mockToken');

          const result = await service.login(body)
          expect(result).toEqual({
            accessToken: 'mockToken',
            user
          })

          expect(userModel.findOne).toHaveBeenCalledWith({ email: body.email});
          expect(bcrypt.compare).toHaveBeenCalledWith(body.password, user.password);
          expect(jwtService.signAsync).toHaveBeenCalledWith({ id: user.id, email: user.email, userRole: user.userRole })
      });

      it('should throw an error if user is not found', async () => {
        const body: LoginDTO = {
          email: 'notfound@test.com',
          password: 'password'
        }

        userModel.findOne.mockResolvedValue(null)

        await expect(service.login(body)).rejects.toThrow(new HttpException("No user found", HttpStatus.NOT_FOUND))

        expect(userModel.findOne).toHaveBeenCalledWith({ email: body.email })
      })

      it('should throw an error if password is incorrect', async() => {
        const body: LoginDTO = {
          email: 'test@test.com',
          password: 'wrongPassword'
        }

        const user = {
          id: 'a uuid',
          email: body.email,
          password: 'hashedPassword',
          fullName: 'John Doe',
          userRole: 'User'
        }

        userModel.findOne.mockResolvedValue(user);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        await expect(service.login(body)).rejects.toThrow(new HttpException("Email or Password is incorrect", HttpStatus.FORBIDDEN))

        expect(userModel.findOne).toHaveBeenCalledWith({ email: body.email })
        expect(bcrypt.compare).toHaveBeenCalledWith(body.password, user.password)
      })
    })

    describe('getUser', () => {
        it('should return a user by email', async () => {
            const email = 'test@test.com';
            const user = {
                id: 'a uuid',
                email: email,
                fullName: 'John Doe',
                userRole: 'User'
            };

            userModel.findOne.mockResolvedValue(user);

            const result = await service.getUser(email);
            expect(result).toEqual(user);
            expect(userModel.findOne).toHaveBeenCalledWith({ email });
        });

        it('should return null if user is not found', async () => {
            const email = 'notfound@test.com';

            userModel.findOne.mockResolvedValue(null);

            const result = await service.getUser(email);
            expect(result).toBeNull();
            expect(userModel.findOne).toHaveBeenCalledWith({ email });
        });
    });

    describe('getUserById', () => {
        it('should return a user by id', async () => {
            const id = 'a uuid';
            const user = {
                id: id,
                email: 'test@test.com',
                fullName: 'John Doe',
                userRole: 'User'
            };

            userModel.findById.mockResolvedValue(user);

            const result = await service.getUserById(id);
            expect(result).toEqual(user);
            expect(userModel.findById).toHaveBeenCalledWith(id);
        });

        it('should return null if user is not found', async () => {
            const id = 'notfound-uuid';

            userModel.findById.mockResolvedValue(null);

            const result = await service.getUserById(id);
            expect(result).toBeNull();
            expect(userModel.findById).toHaveBeenCalledWith(id);
        });
    });
});
