import { INestApplication } from "@nestjs/common"
import { mongoose } from "@typegoose/typegoose";
import request from "supertest"
import { User } from "../../src/auth/entity/user.entity";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { getModelToken } from "nestjs-typegoose";
import { RegisterDTO } from "../../src/auth/dto/register.dto";
import { LoginDTO } from "../../src/auth/dto/login.dto";

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let userModel: mongoose.Model<User>

    beforeAll( async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication()
        await app.init()

        userModel = moduleFixture.get<mongoose.Model<User>>(getModelToken(User.name))
        await userModel.deleteMany({})
    })

    afterAll(async () => {
        await app.close()
    })

    describe('/user (GET)', () => {
        it('should get user info', async () => {
            // registering user
            const registerDto: RegisterDTO = {
                email: 'user@test.com',
                password: 'Hx123456$7',
                fullName: 'John Doe',
            };
        
            await request(app.getHttpServer())
                .post('/auth/register')
                .send(registerDto)
                .expect(201);
    
            // logging in user
            const loginDto: LoginDTO = {
                email: 'user@test.com',
                password: 'Hx123456$7',
            };
        
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send(loginDto)
                .expect(201); 
            
            // getting user info using token
            let accessToken = `Bearer ${response.body['accessToken']}`
            const user = await request(app.getHttpServer())
                                .get('/user')
                                .set({'Content-Type':  'application/json', 'Authorization': accessToken})
                                .send()
                                .expect(200)
            
            expect(response.body.user).toMatchObject({
                email: loginDto.email,
                fullName: 'John Doe',
                userRole: 'User',
            });
        })
        
        it('should return 401 for invalid token', async () => {
            // sending fake token
            let accessToken = `Bearer {response.body['accessToken']}`
            const user = await request(app.getHttpServer())
                                .get('/user')
                                .set({'Content-Type':  'application/json', 'Authorization': accessToken})
                                .send()
                                .expect(401)
            
        })
    })


})