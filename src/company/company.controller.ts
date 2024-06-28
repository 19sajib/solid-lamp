import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCompanyDTO, UpdateCompanyDTO } from './dto/company.dto';
import { AuthGuard } from 'src/utils/guard/auth.guard';


@ApiTags("Company Related APIs")
@Controller('company')
@ApiBearerAuth()
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

    @UseGuards(AuthGuard)
    @Get(':companyId')
    async getSingleCompany(@Param('companyId') companyId: string) {
        return await this.companyService.getSingleCompanyDetail(companyId)
    }
    
    @UseGuards(AuthGuard)
    @Post('create')
    async createCompany(@Body() body: CreateCompanyDTO, @Req() req){
        body.addedBy = req.user
        return await this.companyService.createCompany(body)
    }

    @UseGuards(AuthGuard)
    @Patch(':companyId')
    async updateCompanyInfo(@Param('companyId') companyId: string, @Body() body: UpdateCompanyDTO) {
        return await this.companyService.updateCompanyInfo(companyId, body)
    }

}
