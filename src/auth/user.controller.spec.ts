import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { AuthService } from './auth.service'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from 'src/utils/guard/auth.guard'
import { JwtService } from '@nestjs/jwt'

const mockUser = {
                fullName: 'John Doe',
                email: 'test@test.com',
                userRole: 'User',
                createdAt: new Date(),
                updatedAt: new Date(),
}

describe('UserController', () => {
    let controller: UserController
    let authService: AuthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                AuthService,
                {
                    provide: AuthService,
                    useValue: {
                        getUserById: jest.fn()
                                        .mockImplementation((id: string) => {
                                            return Promise.resolve({
                                                id: id,
                                                ...mockUser
                                            })
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
                },
                {
                    provide: AuthGuard,
                    useValue: {
                        canActivate: jest.fn().mockReturnValue(true),
                    },
                },
            ]
        }).compile()
        controller =  module.get<UserController>(UserController)
        authService = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })

    describe('getUserByToken', () => {
        it('get user by id', async () => {
            const mockRequest = {
                user: 'a uuid',
            };
    
            const result = await controller.getUserByToken(mockRequest);

            expect(result.id).toBe('a uuid')
            expect(result).toEqual({
                id: 'a uuid',
                ...mockUser
            });
    
            // Verify that the service method was called with the correct parameters
            expect(authService.getUserById).toHaveBeenCalledWith(mockRequest.user);
        })
    })
})