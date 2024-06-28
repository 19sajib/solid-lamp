import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { JobDTO } from './dto/job.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/utils/guard/auth.guard';
import { AdminGuard } from 'src/utils/guard/admin.guard';

@ApiTags('Job Related APIs')
@ApiBearerAuth()
@Controller('job')
export class JobController {
    constructor(
        private readonly jobService: JobService
    ) {}

    @UseGuards(AuthGuard)
    @Get('paginated')
    async getPaginatedJobList(
        @Query('page', ParseIntPipe) page: number, 
        @Query('position') position?: string,
        @Query('workType') workType?: string,
        @Query('techStack') techStack?: string,
        @Query('location') location?: string
    ) {
        return await this.jobService.getPaginatedJobList(page, position, workType, techStack, location)
    }

    @UseGuards(AuthGuard)
    @Get(':companyId')
    async getJobByCompanyId(@Param('companyId') companyId: string) {
        return await this.jobService.getJobByCompanyId(companyId)
    }

    @UseGuards(AuthGuard)
    @Post(':companyId')
    async addJob(@Body() body: JobDTO, @Req() req, @Param('companyId') companyId: string) {
        body.addedBy = req.user;
        body.companyId = companyId;
        return await this.jobService.addJob(body)
    }

    @UseGuards(AdminGuard)
    @Patch(':jobId')
    async archiveJob(@Param('jobId') jobId: string) {
        return await this.jobService.archiveJob(jobId)
    }
}
