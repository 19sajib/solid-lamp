import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BenefitService } from './benefit.service';
import { AuthGuard } from 'src/utils/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BenefitReviewDTO } from './dto/benefit.dto';
import { AdminGuard } from 'src/utils/guard/admin.guard';

@ApiTags('Benefit Related APIs')
@ApiBearerAuth()
@Controller('benefit')
export class BenefitController {
  constructor(private readonly benefitService: BenefitService) {}

  @UseGuards(AuthGuard)
  @Get(':companyId')
  async getBenefitByCompanyId(@Param('companyId') companyId: string) {
    return await this.benefitService.getBenefitByCompanyId(companyId);
  }

  @UseGuards(AuthGuard)
  @Get('review/:companyId')
  async getBenefitReviewByCompanyId(@Param('companyId') companyId: string) {
    return await this.benefitService.getBenefitReviewByCompanyId(companyId);
  }

  @UseGuards(AuthGuard)
  @Post(':companyId')
  async addBenefit(
    @Body() body: BenefitReviewDTO,
    @Req() req,
    @Param('companyId') companyId: string,
  ) {
    body.reviewer = req.user;
    body.companyId = companyId;
    return await this.benefitService.addBenefit(body);
  }

  @UseGuards(AdminGuard)
  @Patch('review/:benefitReviewId')
  async archiveBenefitReview(@Param('benefitReviewId') benefitReviewId: string) {
    return await this.benefitService.archiveBenefitReview(benefitReviewId)
  }
}
