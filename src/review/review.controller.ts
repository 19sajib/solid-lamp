import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { ReviewDTO } from './dto/review.dto';
import { AuthGuard } from 'src/utils/guard/auth.guard';
import { AdminGuard } from 'src/utils/guard/admin.guard';

@ApiTags('Review Related APIs')
@ApiBearerAuth()
@Controller('review')
export class ReviewController {
    constructor( private readonly reviewService: ReviewService ) {}

    @UseGuards(AuthGuard)
    @Post(':companyId')
    async addReview(@Body() body: ReviewDTO, @Req() req, @Param('companyId') companyId: string) {
        body.reviewer = req.user
        body.companyId = companyId
        return await this.reviewService.addReview(body)
    }

    @UseGuards(AuthGuard)
    @Get(':companyId')
    async getReviewByCompanyId(@Param('companyId') companyId: string) {
        return await this.reviewService.getReviewByCompanyId(companyId)
    }

    @UseGuards(AuthGuard)
    @Get('rating/:companyId')
    async getReviewRatingByCompanyId(@Param('companyId') companyId: string) {
        return await this.reviewService.getReviewRatingByCompanyId(companyId)
    }

    @UseGuards(AuthGuard)
    @Get('summary/:companyId')
    async getReviewSummaryByCompanyId(@Param('companyId') companyId: string) {
        return await this.reviewService.getReviewSummaryByCompanyId(companyId)
    }

    @UseGuards(AuthGuard)
    @Get('helpful/:reviewId')
    async helpfulReview(@Param('reviewId') reviewId: string, @Req() req) {
        return await this.reviewService.helpfulReview(reviewId, req.user)
    }

    @UseGuards(AdminGuard)
    @Patch(':reviewId')
    async archiveReview(@Param('reviewId') reviewId: string) {
        return await this.reviewService.archiveReview(reviewId)
    }
}
