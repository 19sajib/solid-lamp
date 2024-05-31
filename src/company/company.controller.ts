import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDTO } from './dto/company.dto';
import { AuthGuard } from 'src/utils/guard/auth.guard';
import { InterviewDTO } from './dto/interview.dto';
import { ReviewDTO } from './dto/review.dto';
import { SalaryDTO } from './dto/salary.dto';
import { JobDTO } from './dto/job.dto';


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
        return await this.companyService.addInterview(body)
    }

    @Post('review')
    async addReview(@Body() body: ReviewDTO, @Req() req) {
        body.reviewer = req.user
        return await this.companyService.addReview(body)
    }

    @Post('salary')
    async addSalary(@Body() body: SalaryDTO, @Req() req) {
        body.reviewer = req.user
        return await this.companyService.addSalary(body)
    }

    @Post('job')
    async addJob(@Body() body: JobDTO, @Req() req) {
        body.addedBy = req.user
        return await this.companyService.addJob(body)
    }

}
