import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDTO } from './dto/company.dto';
import { AuthGuard } from 'src/utils/guard/auth.guard';
import { InterviewDTO } from './dto/interview.dto';

@ApiTags("Company Related APIs")
@Controller('company')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ) {}

    @Post('create')
    async createCompany(@Body() body: CreateCompanyDTO, @Req() req){
        body.addedBy = req.user
        return await this.companyService.createCompany(body)
    }

    @Post('interview')
    async addInterview(@Body() body: InterviewDTO, @Req() req) {
        body.reviewer = req.user
        console.log({body})
        return await this.companyService.addInterview(body)
    }

}
