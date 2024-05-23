import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { InjectModel } from 'nestjs-typegoose';
import { User } from './entity/user.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { JwtService } from '@nestjs/jwt';
import { GoogleLoginDTO, LoginDTO } from './dto/login.dto';
import { GoogleRegisterDTO, RegisterDTO } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
        private jwtService: JwtService,
        private configService: ConfigService
    ){ }

    // Normal Registration by email, password and name property
    async Register(body: RegisterDTO): Promise<any> {
        let { email, password, fullName } = body

        const existingUser = await this.getUser(email)
        if(existingUser) throw new HttpException("There is a register user with that email try login", HttpStatus.FORBIDDEN)
        
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)

        const user = await this.userModel.create({email, password, fullName})
        
        return "Congratulations! Your account is Successfully created..."
    }

    // Google Registration by email, password, photo and name property
    async GoogleRegister(body: GoogleRegisterDTO): Promise<any> {
        let { email, fullName, avatar } = body

        const existingUser = await this.getUser(email)
        if(existingUser) throw new HttpException("There is a register user with that email try login", HttpStatus.FORBIDDEN)
        
        let password = email + this.configService.get('JWT_PASSWORD_KEY')
        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt)

        const user = await this.userModel.create({email, password, fullName, avatar})
        
        const token = await this.jwtService.signAsync({ id: user.id, email: user.email, userRole: user.userRole })

        return {
            accessToken : token,
            user
        }
    }


    // Normal login by email and password
    async login(body: LoginDTO): Promise<any> {
        const { email, password } = body

        const user = await this.getUser(email)

        if(!user) throw new HttpException("No user found", HttpStatus.NOT_FOUND)
        
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) throw new HttpException("Email or Password is incorrect", HttpStatus.FORBIDDEN)
        
        const token = await this.jwtService.signAsync({ id: user.id, email: user.email, userRole: user.userRole })

        return {
            accessToken : token,
            user
        }
    }

    // Google Login
    async Googlelogin(body: GoogleLoginDTO): Promise<any> {
        const { email } = body

        const user = await this.getUser(email)

        if(!user) throw new HttpException("No user found", HttpStatus.NOT_FOUND)
        
        const token = await this.jwtService.signAsync({ id: user.id, email: user.email, userRole: user.userRole })

        return {
            accessToken : token,
            user
        }
    }

    // Find user by email
    async getUser(email: string) :Promise<any>{
        const user = await this.userModel.findOne({email})
        return user
    }
}
