import { Module } from '@nestjs/common';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Salary } from './entity/salary.entity';
import { Company } from 'src/company/entity/company.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/auth/entity/user.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([Salary, Company, User])
  ],
  controllers: [SalaryController],
  providers: [SalaryService, JwtService, AuthService]
})
export class SalaryModule {}
