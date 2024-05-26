import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
        private configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if(!token) throw new UnauthorizedException()
        
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.get('JWT_SECRET_KEY')
                }
            )

            const user = await this.authService.getUserById(payload.id)
            if (!user) throw new UnauthorizedException()
            if ((user.userRole != payload.userRole) || (user.userRole != ('Admin' || 'Super Admin')) ) throw new UnauthorizedException()

            request['user'] = user.id
            
        } catch {
            throw new UnauthorizedException()
        }
        
        return true
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}