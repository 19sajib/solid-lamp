import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@ApiTags("Auth Related APIs")
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get('google/login')
    @UseGuards(AuthGuard('google'))
    async googleLogin() {
        return "Google Login Processing..."
    }

    @Get('google/redirect')
    @UseGuards(AuthGuard('google'))
    async googleRedirect(@Req() req, @Res() res) {
        const {accessToken} = await this.authService.GoogleAuth(req.user)
        res.redirect(`http://localhost:3000/auth?accessToken=${accessToken}`)
    }

    @Post('login')
    async login(@Body() body: LoginDTO): Promise<any> {
        return await this.authService.login(body)
    }

    @Post('register')
    async register(@Body() body: RegisterDTO): Promise <any> {
        return await this.authService.Register(body)
    }
}
