import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { InjectModel } from 'nestjs-typegoose';
import { User } from './entity/user.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { JwtService } from '@nestjs/jwt';
import { GoogleLoginDTO, LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
        private jwtService: JwtService
    ){ }


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
