import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDTO, UpdateCompanyDTO } from './dto/company.dto';
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

    @Get('paginated')
    async getAllCompany(
        @Query('page', ParseIntPipe) page: number, 
        @Query('name') name?: string,
        @Query('workType') workType?: string,
        @Query('hireType') hireType?: string, 
        @Query('techStack') techStack?: string,
        @Query('locations') locations?: string
    ) {
        return await this.companyService.getPaginatedCompanyList(page, hireType, workType, name, techStack, locations)
    }
    // @Get('paginated')
    // async getAllCompany(@Query('page', ParseIntPipe) page: number) {
    //     return await this.companyService.getPaginatedCompanyList(page)
    // }

    @Get(':companyId')
    async getSingleCompany(@Param('companyId') companyId: string) {
        return await this.companyService.getSingleCompanyDetail(companyId)
    }
    
    @Post('create')
    async createCompany(@Body() body: CreateCompanyDTO, @Req() req){
        body.addedBy = req.user
        return await this.companyService.createCompany(body)
    }

    @Patch(':companyId')
    async updateCompanyInfo(@Param('companyId') companyId: string, @Body() body: UpdateCompanyDTO) {
        return await this.companyService.updateCompanyInfo(companyId, body)
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
