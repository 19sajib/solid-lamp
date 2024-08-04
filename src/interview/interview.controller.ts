import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InterviewService } from './interview.service';
import { AuthGuard } from 'src/utils/guard/auth.guard';
import { InterviewDTO } from './dto/interview.dto';
import { AdminGuard } from 'src/utils/guard/admin.guard';

@ApiTags('Interview Related APIs')
@Controller('interview')
@ApiBearerAuth()
export class InterviewController {
    constructor(
        private readonly interviewService: InterviewService
    ) {}

    @UseGuards(AuthGuard)
    @Get('summary/:companyId')
    async getInterviewSummary(@Param('companyId') companyId: string) {
        return this.interviewService.getInterviewSummary(companyId)
    }

    @UseGuards(AuthGuard)
    @Get(':companyId')
    async getInterviewList(
        @Param('companyId') companyId: string,
        @Query('page', ParseIntPipe) page: number,
        @Query('experience') experience?: string,
        @Query('position') position?: string,
        @Query('offer') offer?: string
    ) {
        return await this.interviewService.getInterviewList(companyId, page, experience, position, offer)
    }

    @UseGuards(AuthGuard)
    @Post(':companyId')
    async addInterview(@Body() body: InterviewDTO, @Req() req, @Param('companyId') companyId: string) {
        body.reviewer = req.user
        body.companyId = companyId
        return await this.interviewService.addInterview(body)
    }

    @UseGuards(AdminGuard)
    @Patch(':interviewId')
    async archiveInterview(@Param('interviewId') interviewId: string) {
        return await this.interviewService.archiveInterview(interviewId)
    }
}
