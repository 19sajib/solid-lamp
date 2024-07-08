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
import { SalaryService } from './salary.service';
import { SalaryDTO } from './dto/salary.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/utils/guard/auth.guard';
import { AdminGuard } from 'src/utils/guard/admin.guard';

@ApiTags('Salary Related APIs')
@ApiBearerAuth()
@Controller('salary')
export class SalaryController {
  constructor(private readonly salaryService: SalaryService) {}

  @UseGuards(AuthGuard)
  @Post(':companyId')
  async addSalary(
    @Body() body: SalaryDTO,
    @Req() req,
    @Param('companyId') companyId: string,
  ) {
    body.reviewer = req.user;
    body.companyId = companyId;
    return await this.salaryService.addSalary(body);
  }

  @UseGuards(AuthGuard)
  @Get(':companyId')
  async getSalariesByCompanyId(@Param('companyId') companyId: string) {
    return await this.salaryService.getSalariesByCompanyId(companyId);
  }

  @UseGuards(AuthGuard)
  @Get('average/:companyId')
  async getAverageSalaryByCompanyId(@Param('companyId') companyId: string) {
    return await this.salaryService.getAverageSalaryByCompanyId(companyId);
  }

  @UseGuards(AdminGuard)
  @Patch(':salaryId')
  async archiveSalary(@Param('salaryId') salaryId: string) {
    return await this.salaryService.archiveSalary(salaryId)
  }
}
