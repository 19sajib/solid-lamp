import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/utils/guard/auth.guard";

@ApiTags("User Related APIs")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Get('/')
    async getUserByToken(@Req() req): Promise<any> {
        return await this.authService.getUserById(req.user)
    }

}